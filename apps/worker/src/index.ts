import db from "@repo/db/client";
import { Kafka } from "kafkajs";
import { sendEmail } from "./mail";
import { JsonObject } from "mailgun.js";
import { parse } from "./parser";
import { sendSMS } from "./sms";

const kafka = new Kafka({
  clientId: "outbox-processor",
  brokers: ["localhost:9092"],
});

const TOPIC_NAME = "zap-events";

const main = async () => {
  const producer = kafka.producer();
  await producer.connect();
  const consumer = kafka.consumer({
    groupId: "main-worker",
  });
  await consumer.connect();
  await consumer.subscribe({ topic: TOPIC_NAME, fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        partition,
        offset: message.offset,
        value: message?.value?.toString(),
      });
      if (!message?.value?.toString()) {
        console.log("No ZapRun ID found!");
        return;
      }
      const parsedMessage = JSON.parse(message?.value?.toString());
      const zapRunId = parsedMessage.zapRunId;
      const stage = parsedMessage.stage;

      const zapRunDetails = await db.zapRun.findFirst({
        where: {
          id: zapRunId,
        },
        include: {
          zap: {
            include: {
              actions: {
                include: {
                  type: true,
                },
              },
            },
          },
        },
      });

      const currAction = zapRunDetails?.zap.actions.find(
        (x) => x.sortingOrder === stage
      );

      if (!currAction) {
        console.log("No action found!");
      }

      await new Promise((resolve) => setTimeout(resolve, 4000));
      switch (currAction?.type.name) {
        case "Email":
          const body = parse(
            (currAction?.metadata as JsonObject).body as string,
            zapRunDetails?.metadata
          );
          const email = parse(
            (currAction?.metadata as JsonObject).email as string,
            zapRunDetails?.metadata
          );

          console.log(`Email sent! ${email} & message is ${body}`);
          // await sendEmail(email, body);
         
          // const body = (currAction?.metadata as JsonObject).body; //You just recieved {comment.amount}
          // const to = (currAction?.metadata as JsonObject).to; //{comment.email}
          // const zapRunMetadata = zapRunDetails?.metadata; //{comment : {amount : 45} {email : "test@gmail.com"}}
          // Regular expression to extract metadata
          // const metadataRegex = /\{([^}]+)\}/;
          // const metadataMatch = (zapRunDetails?.metadata as string).match(
          //   metadataRegex
          // );
          // const metadata = metadataMatch ? metadataMatch[1] : null;

          // Regular expression to extract body
          const bodyRegex = /body\s*:\s*([^,}]+)/;
          const bodyMatch = (zapRunDetails?.metadata as string).match(
            bodyRegex
          );
          const body = bodyMatch ? bodyMatch[1].trim() : null;

          // Regular expression to extract amount
          const amountRegex = /amount\s*:\s*([^,}]+)/;
          const amountMatch = (zapRunDetails?.metadata as string).match(
            amountRegex
          );
          const amount = amountMatch ? amountMatch[1].trim() : null;

          // Regular expression to extract email
          const emailRegex = /email\s*:\s*"([^"]+)"/;
          const emailMatch = (zapRunDetails?.metadata as string).match(
            emailRegex
          );
          const email = emailMatch ? emailMatch[1].trim() : null;

          // console.log("Metadata:", metadata);
          console.log("Body:", body);
          console.log("Amount:", amount);
          console.log("Email:", email);
          console.log("Email sent");
          break;
        case "SMS":
          const contact = parse(
            (currAction?.metadata as JsonObject).contact as string,
            zapRunDetails?.metadata
          );
          const message = parse(
            (currAction?.metadata as JsonObject).message as string,
            zapRunDetails?.metadata
          );
          console.log(`SMS sent! ${contact} & message is ${message}`);
          // await sendSMS(contact, message);
         
          console.log("SMS sent!");
          break;
        case "Whatsapp":
          // await sendWhatsAppMessage("mynumber", "Hello from zapier")
    
          console.log("Whatsapp Message sent!");
          break;
        default:
          console.log("Unknown action type!");
      }

      const lastStage = (zapRunDetails?.zap?.actions?.length || 1) - 1;

      if (stage !== lastStage) {
        console.log("pushing back to the queue");
        await producer.send({
          topic: TOPIC_NAME,
          messages: [
            {
              value: JSON.stringify({
                zapRunId,
                stage: stage + 1,
              }),
            },
          ],
        });
      }

      console.log("processing done");

      await consumer.commitOffsets([
        {
          topic: TOPIC_NAME,
          partition,
          offset: (parseInt(message.offset) + 1).toString(),
        },
      ]);
    },
  });
};

main();

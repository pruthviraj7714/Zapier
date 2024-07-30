import db from "@repo/db/client";
import { Kafka } from "kafkajs";
import { sendEmail } from "./sendEmail";

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
      switch (currAction?.type.name) {
        case "Email":
          await sendEmail("marganepruthviraj@gmail.com", "Hi there")
          break;
        case "SMS":
          console.log("SMS sent!");
          break;
        case "Whatsapp":
          console.log("Whatsapp Message sent!");
          break;
        default:
          console.log("Unknown action type!");
      }

      await new Promise((resolve) => setTimeout(resolve, 4000));

      const lastStage = (zapRunDetails?.zap?.actions?.length || 1) - 1;

      if (stage !== lastStage) {
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

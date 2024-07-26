import db from "@repo/db/client";
import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "outbox-processor",
  brokers: ["localhost:9092"],
});

const TOPIC_NAME = "zap-events";

const main = async () => {
  const producer = kafka.producer();
  await producer.connect();

  while (1) {
    const pendingRows = await db.zapRunOutbox.findMany({
      where: {},
      take: 10,
    });

    await producer.send({
      topic: TOPIC_NAME,
      messages: pendingRows.map((r) => {
        return {
          value: r.zapRunId,
        };
      }),
    });

    await db.zapRunOutbox.deleteMany({
      where: {
        id: {
          in: pendingRows.map((r) => r.id),
        },
      },
    });

    await new Promise((res) => setTimeout(res, 3000));
  }
};

main();

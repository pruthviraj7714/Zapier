import express from "express";
import db from "@repo/db/client";

const app = express();

app.use(express.json());

app.post("/hooks/catch/:userId/:zapId", async (req, res) => {
  const { userId, zapId } = req.params;
  const body = req.body;

  try {
    await db.$transaction(async (tx) => {
      const run = await tx.zapRun.create({
        data: {
          zapId,
          metadata: body,
        },
      });

      await tx.zapRunOutbox.create({
        data: {
          zapRunId: run.id,
        },
      });
    });

    return res.status(200).json({
      message: "Webhook received!",
    });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

app.listen(3002, () => {
  console.log("Server is running on port 3002");
});

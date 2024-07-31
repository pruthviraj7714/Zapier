import { config } from 'dotenv';
import twilio from 'twilio';

config();

export const sendSMS = async (to : string, body : string) => {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = twilio(accountSid, authToken);

  try {
    const message = await client.messages.create({
      body,
      from: process.env.TWILIO_PHONE_NUMBER,
      to,
    });
    console.log(`SMS sent: ${message.sid}`);
  } catch (error) {
    console.error('Failed to send SMS:', error);
  }
};



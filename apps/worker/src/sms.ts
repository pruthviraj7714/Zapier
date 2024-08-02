import { config } from 'dotenv';
import twilio from 'twilio';

config();

export const sendSMS = async (to: string, body: string): Promise<void> => {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_PHONE_NUMBER;

  if (!accountSid || !authToken || !from) {
    console.error('Twilio credentials or phone number are not defined in environment variables');
    return;
  }

  const client = twilio(accountSid, authToken);

  try {
    const message = await client.messages.create({
      body,
      from,
      to,
    });
    console.log(`SMS sent: ${message.sid}`);
  } catch (error : any) {
    console.error('Failed to send SMS:', error.message);
  }
};

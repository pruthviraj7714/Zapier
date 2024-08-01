import nodemailer from "nodemailer";
import { config } from "dotenv";

config();

export async function sendEmail(to: string, body: string) {
    const { SMTP_USERNAME, SMTP_PASSWORD } = process.env;

    if (!SMTP_USERNAME || !SMTP_PASSWORD) {
        console.error("Missing SMTP credentials in environment variables.");
        return;
    }

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: SMTP_USERNAME,
            pass: SMTP_PASSWORD,
        },
    });

    const mailOptions = {
        from: SMTP_USERNAME,
        to: to,
        subject: "Hello from zapier",
        text: body,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent: " + info.response);
    } catch (error) {
        console.error("Error sending email: " + error);
    }
}

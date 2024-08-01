import nodemailer from "nodemailer"
import { config } from "dotenv"

config();

export async function sendEmail(to : string, body : string)  {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.SMTP_USERNAME,
            pass: process.env.SMTP_PASSWORD
        }
    });

    let mailOptions = {
        from: process.env.SMTP_USERNAME,
        to: to,
        subject: "Hello from zapier",
        text: body
    };

    try {
        let info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
    } catch (error) {
        console.error('Error sending email: ' + error);
    }
}
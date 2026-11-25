
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: Number(process.env.SMTP_PORT || 587) === 465,
    auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD,
    },
});

type MailOption = {
    to: string;
    subject: string;
    html: string;
};

const sendEmail = async (options: MailOption): Promise<string> => {
    try {
        const info = await transporter.sendMail({
            from: process.env.SMTP_MAIL,
            to: options.to,
            subject: options.subject,
            html: options.html,
        });

        console.log("[EMAIL] Sent successfully");
        console.log("[EMAIL] Message ID:", info.messageId);

        return "OK";
    } catch (error) {
        console.error("[EMAIL] SMTP error:", error);

        return "Failed to send mail";
    }
};

export async function verifySMTP() {
    try {
        await transporter.verify();
        console.log("[EMAIL] SMTP connection successful");
    } catch (error) {
        console.error("[EMAIL] SMTP connection failed:", error);
    }
}

export default sendEmail;

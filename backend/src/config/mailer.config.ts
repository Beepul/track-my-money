import nodeMailer from 'nodemailer'


const transporter = nodeMailer.createTransport({
    service: process.env.SMTP_SERVICE,
    host: process.env.SMTP_HOST,
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD,
    },
});

type MailOption = {
    to: string,
    subject: string,
    html: string 
}

const sendEmail = async (options: MailOption) => {
    try {
        await transporter.sendMail({
            from: process.env.SMTP_MAIL,
            to: options.to,
            subject: options.subject,
            html: options.html
        })

        return 'OK'
    } catch (error: any) {
        return error.message || 'Failed to send mail'
    }
}


export default sendEmail

import nodeMailer from 'nodemailer'


const transporter = nodeMailer.createTransport({
    service: 'Gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: "bipultestmail@gmail.com",
        pass: "plex bxen euoj mlsu",
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
            from: "bipultestmail@gmail.com",
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

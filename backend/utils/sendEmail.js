const nodemailer = require("nodemailer");


const sendEmail = async (options) => {

    const transporter = nodemailer.createTransport({
        service: process.env.SMPT_SERVICE,
        host: process.env.SMPT_HOST,

        port: process.env.SMPT_PORT,
        secure: false,
        requireTLS: true,
        // service: "gmail",

        auth: {
            // user:"",
            user: process.env.SMPT_MAIL, //SMPT simple mail transfer protocol
            // password:"",
            pass: process.env.SMPT_PASSWORD,
        }
    })

    const mailOptions = {
        from: process.env.SMPT_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.message,
    };

    await transporter.sendMail(mailOptions); // our mail sent from here


};

module.exports = sendEmail;
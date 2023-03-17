const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: process.env.userMail,
        pass: process.env.passwordMail,
    },
});

module.exports = transporter;
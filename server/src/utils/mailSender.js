/* ---------------------------------------------------------------------------------------
mailSender.js
This utility connects to the SMTP server (Gmail) and sends the email.
------------------------------------------------------------------------------------------ */
import nodemailer from "nodemailer";

const mailSender = async (email, title, body) => {
  try {
    // Creating a Transporter (The Bridge)
    // This connects our Node server to the Gmail server
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    // Send this email to the user
    let info = await transporter.sendMail({
      from: `Learning Management System: <${process.env.MAIL_USER}>`,
      to: `${email}`,
      subject: `${title}`,
      html: `${body}`,
    });

    console.log("Email sent successfully:", info.messageId);
    return info;
  } catch (error) {
    console.log("Error inside mailSender utility:", error.message);
    throw error; // Let the caller know it failed
  }
};

export default mailSender;

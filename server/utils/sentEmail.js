import nodemailer from "nodemailer"

export const sendEmail = async (to, subject, content) => {
    try {
      let transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });
  
      let info = await transporter.sendMail({
        from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_FROM_ADDRESS}>`,
        to: to,
        subject: subject,
        text: content,
        html: `<div>${content.replace(/\n/g, '<br>')}</div>`,
      });
  
      console.log('Message sent: %s', info.messageId);
      return info;
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  };
import nodemailer from "nodemailer";
import { readFile } from "fs/promises"; 
import { fileURLToPath } from "url";
import path from "path";

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const sendEmail = async (to, subject, content,type = "", extraAttachments = []) => {
  try {
    let transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Use the promise-based readFile to read images
    const vavLogo = await readFile(path.join(__dirname, "/email_assets/vavLogo.png"), { encoding: "base64" });
    const instaLogo = await readFile(path.join(__dirname, "/email_assets/instaLogo.png"), { encoding: "base64" });
    const ytLogo = await readFile(path.join(__dirname, "/email_assets/ytLogo.png"), { encoding: "base64" });
    const linkedinLogo = await readFile(path.join(__dirname, "/email_assets/linkedinLogo.png"), { encoding: "base64" });

    let attachmentsArray = [
      {
        filename: "vavlogo.png",
        content: vavLogo,
        encoding: "base64",
        cid: "vavLogo",
      },
      {
        filename: "instaLogo.png",
        content: instaLogo,
        encoding: "base64",
        cid: "instaLogo",
      },
      {
        filename: "ytLogo.png",
        content: ytLogo,
        encoding: "base64",
        cid: "ytLogo",
      },
      {
        filename: "linkedinLogo.png",
        content: linkedinLogo,
        encoding: "base64",
        cid: "linkedinLogo",
      },
    ]

    if(type === "Design Task"){
      // const bgGradient = await readFile(path.join(__dirname, "/email_assets/bgGradient.png"), { encoding: "base64" });
      // attachmentsArray.push({
      //   filename: "bgGradient.png",
      //   content: bgGradient,
      //   encoding: "base64",
      //   cid: "bgGradient",
      // })
   }

    if(extraAttachments?.length > 0){
      attachmentsArray.push(...extraAttachments)
    }

    let info = await transporter.sendMail({
      from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_FROM_ADDRESS}>`,
      to: to,
      subject: subject,
      html: content,
      attachments: attachmentsArray,
    });

    console.log("Message sent: %s", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
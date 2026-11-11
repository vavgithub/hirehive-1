import { captureError } from "./errorHandler.js";
import { assets, createTransporter } from "./emailer.js";


export const sendEmail = async (to, subject, content,type = "", extraAttachments = []) => {
  try {

    let attachmentsArray = [
      {
        filename: "vavlogo.png",
        content: assets.vavLogo,
        encoding: "base64",
        cid: "vavLogo",
      },
      {
        filename: "instaLogo.png",
        content: assets.instaLogo,
        encoding: "base64",
        cid: "instaLogo",
      },
      {
        filename: "ytLogo.png",
        content: assets.ytLogo,
        encoding: "base64",
        cid: "ytLogo",
      },
      {
        filename: "linkedinLogo.png",
        content: assets.linkedinLogo,
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

    const transporter = await createTransporter();
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
    captureError(error, { file: "sentEmail.js", action: "sendEmail" });
    console.error("Error sending email:", error);
    throw error;
  }
};

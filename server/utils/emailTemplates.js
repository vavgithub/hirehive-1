export const getSignupEmailContent = (candidateName,otp) =>{
    return `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HireHive - Signup OTP</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet');
        * {
            padding: 0;
            margin: 0;
            box-sizing: border-box;
            max-width: 600px;
        }
        #text{
            display: none;
        }
    </style>
</head>

<body>
    <div style="background-color: #ffffff !important;
    padding: 64px;
    width: 600px;
    font-family: Open Sans, sans-serif;">
        <div style="margin-bottom: 30px; width:125px; height: 50px;">
            <img style="object-fit: cover; width:100%; " src="cid:vavLogo" alt="">
        </div>
        <div style="font-size: 14px;">
            <p style="margin-bottom: 16px;">Hi ${candidateName},</p>
            <p style="margin-bottom: 16px;">Welcome! <br>
                To complete your signup, please use the <b>verification</b> code below:
            </p>
            <table style="border-spacing: 20px; transform: translateX(-20px);">
                <tr >
                 ${Array.from(typeof otp === 'string' ? otp : otp.toString()).map(otpValue=>{
                    return `<td style=" text-align:center; padding: 16px;
            background-color: rgba(242, 242, 242, 1);
            border-radius: 3px;
            width: 45px;
            height: 45px;
            font-size: 20px;
            font-weight: 600;
            font-family: Open Sans, sans-serif;">${otpValue}</td>`}).join("")} 
                </tr>
            </table>
            <p style="margin-top: 16px; margin-bottom: 16px;">If you didn’t request this, you can ignore this email.</p>
            <p style="margin-bottom: 16px;">Thank you,<br>The VAV Team</p>
            <hr>
            <div style=" width: 100%;">
                <table style="margin:auto; width:50%; border-spacing:22px 0px;margin-top:40px;margin-bottom:20px">
                    <!-- Instagram icon -->
                    <td style="text-align:right;">
                        <a href="https://www.instagram.com/valueatvoid/">
                            <img style="width: 28px; height: 28px;" src="cid:instaLogo" alt="">
                        </a>
                    </td>
                    <!-- Youtube Icon -->
                    <td style="padding-top: 5px; text-align:center;">
                        <a href="https://www.youtube.com/c/ValueatVoid">
                            <img style="width: 28px; height: 28px;" src="cid:ytLogo" alt="">
                        </a>
                    </td>
                    <!-- Linkedin icon -->
                   <td>
                    <a href="https://www.linkedin.com/company/atvoid/">
                        <img style="width: 28px; height: 28px;" src="cid:linkedinLogo" alt="">
                    </a>
                   </td>
                </table>
                <a style="text-align: center; display: block; font-size:16px;  color: rgba(99, 115, 129, 1); width: 100%;" href="www.atvoid.com">www.atvoid.com</a>
            </div>
        </div>
    </div>
</body>

</html>`
}

export const getRejectionEmailContent = (candidateName,jobTitle) =>{
    return `
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>HireHive - Signup</title>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&display=swap" rel="stylesheet');
            @import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet');
            * {
                padding: 0;
                margin: 0;
                box-sizing: border-box;
                max-width: 600px;
            }
            #text{
                display: none;
            }
        </style>
    </head>

    <body>
        <div style="background-color: #ffffff;
        padding: 64px;
        width: 600px;
        font-family: Open Sans, sans-serif;">
            <div style="margin-bottom: 30px; width:125px; height: 50px;">
                <img style="object-fit: cover; width:100%; " src="cid:vavLogo" alt="">
            </div>
            <div style="font-size: 14px;">
                <p style="margin-bottom: 16px;">Hi ${candidateName},</p>
                <p style="margin-bottom: 16px;">Thank you for taking time out of your busy day to apply to the ${jobTitle} at VAV. We truly appreciate your patience. It was not our intention to keep you waiting, but we had an overwhelming response to our adverts.
                </p>
                <p style="margin-top: 16px; margin-bottom: 16px;">
                    At this stage, we have decided not to proceed with your candidacy for the current opening and we have chosen to continue the selection process with other applicants whose profile more closely meets our requirements at this time. We know job hunting can be stressful and daunting. So, please don't give up, keep going, believe in yourself and we hope you find your dream role soon. 
                </p>
                <p style="margin-top: 16px; margin-bottom: 16px;">
                    We sincerely value your time and effort into this process, and we will make sure to keep your application on file. More roles will open in the future and we will re-visit this application. We are honoured you showed interest in us - and we hope to work together in the future. 
                </p>
                <p style="margin-top: 16px; margin-bottom: 16px;">
                    Feel free to check out all our live roles:
                </p>
                <a style="margin-top: 16px; margin-bottom: 16px; padding: 12px; width: 280px; display: block; background-color: rgba(4, 95, 253, 1); color: #ffffff; border-radius: 12px; text-decoration: underline; text-align: center;">
                    Visit Website
                </a>
                <p style="margin-top: 16px; margin-bottom: 24px;">
                    Finally, here are our VAV Recruiter's top 7 tips to securing your dream job: 
                </p>
                <p style="margin-top: 16px; ">
                    1. Know your strengths and skills - take some time to identify these
                </p>
                <p style="margin-top: 12px; ">
                    2. Polish your resume and cover letter
                </p>
                <p style="margin-top: 12px; ">
                    3. Leverage your network
                </p>
                <p style="margin-top: 12px; ">
                    4. Be proactive - reach out to companies and recruiters
                </p>
                <p style="margin-top: 12px; ">
                    5. Research companies
                </p>
                <p style="margin-top: 12px; ">
                    6. Practice interviewing
                </p>
                <p style="margin-top: 12px; ">
                    7. Stay positive and persistent</p>
                    <p style="margin-top: 16px; margin-bottom: 16px;">
                        From all of us at VAV, we thank you for your time and effort.
                    </p>
                <p style="margin-bottom: 16px;">Regards,<br>VAV Hiring Team</p>

                <hr>
                <div style=" width: 100%;">
                    <table style="margin:auto; width:50%; border-spacing:22px 0px;margin-top:40px;margin-bottom:20px">
                        <!-- Instagram icon -->
                        <td style="text-align:right;">
                            <a href="https://www.instagram.com/valueatvoid/">
                                <img style="width: 28px; height: 28px;" src="cid:instaLogo" alt="">
                            </a>
                        </td>
                        <!-- Youtube Icon -->
                        <td style="padding-top: 5px; text-align:center;">
                            <a href="https://www.youtube.com/c/ValueatVoid">
                                <img style="width: 28px; height: 28px;" src="cid:ytLogo" alt="">
                            </a>
                        </td>
                        <!-- Linkedin icon -->
                    <td>
                        <a href="https://www.linkedin.com/company/atvoid/">
                            <img style="width: 28px; height: 28px;" src="cid:linkedinLogo" alt="">
                        </a>
                    </td>
                    </table>
                    <a style="text-align: center; display: block; font-size:16px;  color: rgba(99, 115, 129, 1); width: 100%;" href="www.atvoid.com">www.atvoid.com</a>
                </div>
            </div>
        </div>
    </body>

    </html>`
}

const formattedDueDateWithTime = (dueDate,dueTime) => {
    const [hour,minute] = dueTime.split(":");
    const date= new Date(dueDate);
    date.setHours(parseInt(hour),parseInt(minute),0,0)
    return date.toLocaleString()
}

export const getDesignTaskContent = (candidateName,taskDescription,dueDate,dueTime) =>{
    return `<!DOCTYPE html>
        <html lang="en">

        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>HireHive - Signup</title>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&display=swap" rel="stylesheet');
                @import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet');
                * {
                    padding: 0;
                    margin: 0;
                    box-sizing: border-box;
                    width: 600px;
                }
                #text{
                    display: none;
                }
            </style>
        </head>

        <body>
            <div style="background-color: #ffffff;
            padding: 64px;
            width: 600px;
            font-family: Open Sans, sans-serif;">
                <div style="margin-bottom: 30px; width:125px; height: 50px;">
                    <img style="object-fit: cover; width:100%; " src="cid:vavLogo" alt="">
                </div>
                <div style="font-size: 14px;">
                    <div style="width: 472px; margin-bottom: 16px; margin: auto;">
                        <img style="width: 100%; object-fit: cover;" src="cid:bgGradient" alt="">
                    </div>
                    <p style="margin-bottom: 16px;">Hi ${candidateName},</p>
                    <p style="margin-bottom: 16px;">
                        We are excited to let you know that we are moving forward with the next step: the Design Task Assessment. This is a chance to showcase your design  thinking, creativity and problem-solving skills in action.
                    </p>
                    <p style="margin-top: 16px; margin-bottom: 16px;">
                        We believe in you potential an how you tackle the situation. 
                    </p>

                    <h4 style="margin-top: 16px; margin-bottom: 16px;">Your Mission</h4>
                    <pre style="margin-top: 16px; margin-bottom: 16px; width:600px; white-space:break-spaces; font-family: Open Sans, sans-serif;">${taskDescription.trim()}</pre>
                    <p style="margin-top: 16px; margin-bottom: 16px;">
                        Think about clarity, hierarchy, and accessibility. How can you turn data into a story that feels seamless and empowering for users?
                    </p>

                    <h4 style="margin-top: 16px; margin-bottom: 16px;">Deliverables</h4>
                    <ul style="margin-top: 16px; margin-bottom: 16px; padding:0;">
                        <li style="transform: translateX(20px);"> Wireframes – Low or high fidelity.</li>
                        <li style="transform: translateX(20px);"> UI Screens – Figma, Sketch, or XD.</li>
                        <li style="transform: translateX(20px);"> Design Rationale – A brief note explaining your design choices.</li>
                    </ul>

                    <h4 style="margin-top: 16px; margin-bottom: 16px;">Timeline</h4>
                    <ul style="margin-top: 16px; margin-bottom: 16px; padding:0;">
                        <li style="transform: translateX(20px);"> Start : ${new Date().toLocaleDateString()} </li>
                        <li style="transform: translateX(20px);"> Due : ${formattedDueDateWithTime(dueDate,dueTime)}</li>
                    </ul>

                    <p style="margin-top: 16px; margin-bottom: 16px;">
                        We value thoughtfulness and creativity as much as speed. If you need clarity or want to bounce ideas, feel free to reach out.
                    </p>
                    <p style="margin-top: 16px; margin-bottom: 16px;">
                        Let’s design something that’s simple, useful, and maybe… a little delightful.
                    </p>
                    
                    <p style="margin-top: 16px; margin-bottom: 24px;">Best Regards,<br>San Hazare <br>Design Director, <br>Value at Void</p>

                    <hr>
                    <div style=" width: 100%;">
                        <table style="margin:auto; width:50%; border-spacing:22px 0px;margin-top:40px;margin-bottom:20px">
                            <!-- Instagram icon -->
                            <td style="text-align:right;">
                                <a href="https://www.instagram.com/valueatvoid/">
                                    <img style="width: 28px; height: 28px;" src="cid:instaLogo" alt="">
                                </a>
                            </td>
                            <!-- Youtube Icon -->
                            <td style="padding-top: 5px; text-align:center;">
                                <a href="https://www.youtube.com/c/ValueatVoid">
                                    <img style="width: 28px; height: 28px;" src="cid:ytLogo" alt="">
                                </a>
                            </td>
                            <!-- Linkedin icon -->
                        <td>
                            <a href="https://www.linkedin.com/company/atvoid/">
                                <img style="width: 28px; height: 28px;" src="cid:linkedinLogo" alt="">
                            </a>
                        </td>
                        </table>
                        <a style="text-align: center; display: block; font-size:16px; color: rgba(99, 115, 129, 1); width: 100%;" href="www.atvoid.com">www.atvoid.com</a>
                    </div>
                </div>
            </div>
        </body>

        </html>`
}

export const getPasswordResetContent = (candidateName,otp) =>{
    return `
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>HireHive - Signup OTP</title>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet');
            * {
                padding: 0;
                margin: 0;
                box-sizing: border-box;
                max-width: 600px;
            }
            #text{
                display: none;
            }
        </style>
    </head>

    <body>
        <div style="background-color: #ffffff !important;
        padding: 64px;
        width: 600px;
        font-family: Open Sans, sans-serif;">
            <div style="margin-bottom: 30px; width:125px; height: 50px;">
                <img style="object-fit: cover; width:100%; " src="cid:vavLogo" alt="">
            </div>
            <div style="font-size: 14px;">
                <p style="margin-bottom: 16px;">Hi ${candidateName},</p>
                <p style="margin-bottom: 16px;">Welcome! <br>
                    To reset your password, please use the <b>verification</b> code below:
                </p>
                <table style="border-spacing: 20px; transform: translateX(-20px);">
                    <tr >
                    ${Array.from(typeof otp === 'string' ? otp : otp.toString()).map(otpValue=>{
                        return `<td style=" text-align:center; padding: 16px;
                background-color: rgba(242, 242, 242, 1);
                border-radius: 3px;
                width: 45px;
                height: 45px;
                font-size: 20px;
                font-weight: 600;
                font-family: Open Sans, sans-serif;">${otpValue}</td>`}).join("")} 
                    </tr>
                </table>
                <p style="margin-top: 16px; margin-bottom: 16px;">If you didn’t request this, you can ignore this email.</p>
                <p style="margin-bottom: 16px;">Thank you,<br>The VAV Team</p>
                <hr>
                <div style=" width: 100%;">
                    <table style="margin:auto; width:50%; border-spacing:22px 0px;margin-top:40px;margin-bottom:20px">
                        <!-- Instagram icon -->
                        <td style="text-align:right;">
                            <a href="https://www.instagram.com/valueatvoid/">
                                <img style="width: 28px; height: 28px;" src="cid:instaLogo" alt="">
                            </a>
                        </td>
                        <!-- Youtube Icon -->
                        <td style="padding-top: 5px; text-align:center;">
                            <a href="https://www.youtube.com/c/ValueatVoid">
                                <img style="width: 28px; height: 28px;" src="cid:ytLogo" alt="">
                            </a>
                        </td>
                        <!-- Linkedin icon -->
                    <td>
                        <a href="https://www.linkedin.com/company/atvoid/">
                            <img style="width: 28px; height: 28px;" src="cid:linkedinLogo" alt="">
                        </a>
                    </td>
                    </table>
                    <a style="text-align: center; display: block; font-size:16px;  color: rgba(99, 115, 129, 1); width: 100%;" href="www.atvoid.com">www.atvoid.com</a>
                </div>
            </div>
        </div>
    </body>

    </html>`
}

export const getResetSuccessfulContent = (candidateName) =>{
    return `
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>HireHive - Signup OTP</title>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet');
            * {
                padding: 0;
                margin: 0;
                box-sizing: border-box;
                max-width: 600px;
            }
            #text{
                display: none;
            }
        </style>
    </head>

    <body>
        <div style="background-color: #ffffff !important;
        padding: 64px;
        width: 600px;
        font-family: Open Sans, sans-serif;">
            <div style="margin-bottom: 30px; width:125px; height: 50px;">
                <img style="object-fit: cover; width:100%; " src="cid:vavLogo" alt="">
            </div>
            <div style="font-size: 14px;">
                <p style="margin-bottom: 16px;">Hi ${candidateName},</p>
                <p style="margin-bottom: 16px;"><b>Congratulations!</b><br>
                        Your password has been successfully reset.
                </p>
                <p style="margin-top: 16px; margin-bottom: 16px;">If you didn't make this change, please contact support immediately.</p>
                <p style="margin-bottom: 16px;">Thank you,<br>The VAV Team</p>
                <hr>
                <div style=" width: 100%;">
                    <table style="margin:auto; width:50%; border-spacing:22px 0px;margin-top:40px;margin-bottom:20px">
                        <!-- Instagram icon -->
                        <td style="text-align:right;">
                            <a href="https://www.instagram.com/valueatvoid/">
                                <img style="width: 28px; height: 28px;" src="cid:instaLogo" alt="">
                            </a>
                        </td>
                        <!-- Youtube Icon -->
                        <td style="padding-top: 5px; text-align:center;">
                            <a href="https://www.youtube.com/c/ValueatVoid">
                                <img style="width: 28px; height: 28px;" src="cid:ytLogo" alt="">
                            </a>
                        </td>
                        <!-- Linkedin icon -->
                    <td>
                        <a href="https://www.linkedin.com/company/atvoid/">
                            <img style="width: 28px; height: 28px;" src="cid:linkedinLogo" alt="">
                        </a>
                    </td>
                    </table>
                    <a style="text-align: center; display: block; font-size:16px;  color: rgba(99, 115, 129, 1); width: 100%;" href="www.atvoid.com">www.atvoid.com</a>
                </div>
            </div>
        </div>
    </body>

    </html>
    `
}
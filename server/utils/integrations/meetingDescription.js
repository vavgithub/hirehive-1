import { LocationOptions } from "../locationOptions.js"

export const formattedMeetingDescription = (companyName,aboutUs,companyWebsite , jobLocation , jobType, basicExperience , jobDescription ) =>{
    return `<p dir="ltr" style="text-align: start;">
    <b><strong style="white-space: pre-wrap;">Company Name : ${companyName}</strong></b><br>
    ${companyWebsite ? `<b><strong style="white-space: pre-wrap;">Website </strong></b><span style="white-space: pre-wrap;">: ${companyWebsite}</span></p>` : ''}
    <p dir="ltr" style="text-align: start;"><b><strong style="white-space: pre-wrap;">Location </strong></b><span style="white-space: pre-wrap;">: ${LocationOptions?.find(location => location.value === jobLocation)?.label ?? jobLocation}</span></p>
    <p style="text-align: start;"></p><p dir="ltr" style="text-align: start;"><b><strong style="white-space: pre-wrap;">Job Type</strong></b><span style="white-space: pre-wrap;"> : ${jobType}</span></p>
    ${basicExperience > 0 ? '<p style="text-align: start;"></p><p dir="ltr" style="text-align: start;"><b><strong style="white-space: pre-wrap;">Experience </strong></b><span style="white-space: pre-wrap;">: ' + basicExperience + '+ years</span></p>' : ''}
    ${aboutUs ? `<p style="text-align: start;"></p><p dir="ltr" style="text-align: start;"><b><strong style="white-space: pre-wrap;">About Us</strong></b></p><p dir="ltr" style="text-align: start;"><span style="white-space: pre-wrap;">${aboutUs}</span></p>` : ''}
    <p dir="ltr" style="text-align: start;"><b><strong style="white-space: pre-wrap;">Job Description</strong></b><span style="white-space: pre-wrap;"> </span>
    ${jobDescription}
    </p>`
}
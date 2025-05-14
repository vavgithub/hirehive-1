//History of the DB queries ran in prod 

// async function addPhPrefix(){
//       console.time("Execution Time"); // Start measuring time

//   await candidates.updateMany(
//     { phone: { $type: "string", $regex: /^\d{10}$/ } },
//     [
//       {
//         $set: {
//           phone: { $concat: ["91", "$phone"] }
//         }
//       }
//     ]
//   );  
  
//   await User.updateMany(
//     { phone: { $type: "string", $regex: /^\d{10}$/ } },
//     [
//       {
//         $set: {
//           phone: { $concat: ["91", "$phone"] }
//         }
//       }
//     ]
//   );  
//       console.timeEnd("Execution Time"); // End measuring time and log it
// }

// async function makeJobPublic(){
//   console.time("Execution Time"); // Start measuring time

//   await jobs.updateMany(
//     {isPublic : { $exists : false }},
//     {$set : {isPublic : true}}
//   )
//   console.timeEnd("Execution Time"); // End measuring time and log it
// }

// async function updateScheduledDatesToUTC() {
//   console.time("Execution Time"); // Start measuring time

//   const allCandidates = await candidates.find({});
//   let countOfCallHistory = 0;
//   let updatedCallHistoryCount = 0; // Counter for updated scheduledDates in callHistory

//   for (const candidate of allCandidates) {
//     for (const app of candidate.jobApplications) {
//       for (const [stage, status] of app.stageStatuses.entries()) {
//         if (
//           status.currentCall.scheduledDate &&
//           status.currentCall.scheduledTime &&
//           typeof status.currentCall.scheduledTime === 'string'
//         ) {
//           // Split scheduledTime like "13:30"
//           const [hours, minutes] = status.currentCall.scheduledTime.split(':').map(Number);

//           if (!isNaN(hours) && !isNaN(minutes)) {
//             // Create a new Date using the scheduledDate's date
//             const localDate = new Date(status.currentCall.scheduledDate);

//             localDate.setUTCHours(0, 0, 0, 0); // Reset time to midnight UTC

//             // Add IST time (hours/minutes)
//             localDate.setHours(hours);
//             localDate.setMinutes(minutes);

//             // Convert IST datetime to UTC
//             const utcDate = new Date(localDate);

//             // Save back
//             status.currentCall.scheduledDate = utcDate;
//           }
//         }

//         if (status.callHistory?.length > 0) {
//           countOfCallHistory++; // Increment count for non-empty callHistory arrays

//           // Split scheduledTime like "13:30"
//           let newCallHistory = [];

//           for (let call of status.callHistory) {
//             if (call.scheduledTime) {
//               const [hours, minutes] = call?.scheduledTime.split(':').map(Number);

//               if (!isNaN(hours) && !isNaN(minutes)) {
//                 // Create a new Date using the scheduledDate's date
//                 const localDate = new Date(call.scheduledDate);

//                 localDate.setUTCHours(0, 0, 0, 0); // Reset time to midnight UTC

//                 // Add IST time (hours/minutes)
//                 localDate.setHours(hours);
//                 localDate.setMinutes(minutes);

//                 // Convert IST datetime to UTC
//                 const utcDate = new Date(localDate);

//                 // Save back
//                 call.scheduledDate = utcDate;

//               }
//               newCallHistory.push(call);
//             } else {
//               newCallHistory.push(call);
//             }
//           }
//           status.callHistory = newCallHistory;
//         }
//       }
//     }
//     candidate.jobApplications.map(app => {
//       Array.from(app.stageStatuses.entries()).map(statusObj => {
//         if(statusObj[1]?.callHistory?.length > 0){
//           console.log(statusObj[1]?.callHistory)
//           updatedCallHistoryCount++; // Increment for updated scheduledDate
//         }
//       })
//     })
//     // console.log(
//     //   JSON.stringify(
//     //     candidate.jobApplications.map(app => ({
//     //       stageStatuses: Array.from(app.stageStatuses.entries()).map(([stage, status]) => ({
//     //         stage,
//     //         ...status.toObject()
//     //       })),
//     //     })),
//     //     null,
//     //     2
//     //   )
//     // );
//     await candidate.save()
//   }

//   console.log("Count of non-empty callHistories:", countOfCallHistory);
//   console.log("Count of updated scheduledDates in callHistories:", updatedCallHistoryCount);

//   console.log("✅ scheduledDate updated in UTC for all candidates");
//   console.timeEnd("Execution Time"); // End measuring time and log it
// }



// async function updationForCompany(){

//     let jobsArr = await jobs.find()
//     jobsArr.forEach(async(job) => {
//       // Find the user associated with the job
//       const user = await User.findOne({ _id: job.createdBy });

//       // If user exists, update the job with company_id from user
//       if (user && user.company_id) {
//         await jobs.updateOne(
//           { _id: job._id }, // Find the specific job document
//           { $set: { company_id: user.company_id } } // Only update company_id
//         );
//       }
//     });

//     console.time("Execution Time"); // Start measuring time
//     const users = await candidates.find();
//     for(let user of users){
//       for(let app of user?.jobApplications){
//         const job = await jobs.findById({_id : app.jobId}).populate('company_id');

//         const companyDetails = {
//           _id : job?.company_id?._id,
//           name :job?.company_id?.name
//         }

//         if(job?.company_id?._id && job?.company_id?.name && app?.jobId){
//           const userWithApplication = await candidates.findOneAndUpdate({
//             _id: user?._id,
//             "jobApplications.jobId" : app.jobId
//           },{
//             $set : {
//               "jobApplications.$.companyDetails" : companyDetails
//             }
//           })
//         }
//       }
//     }
//     console.timeEnd("Execution Time"); // End measuring time and log it
// }

// const userFirstLast = async () => {
//     console.time("Execution Time"); // Start measuring time
//   await User.updateMany(
//     {
//       name: { $exists: true },
//       firstName: { $exists: false },
//       lastName: { $exists: false }
//     },
//     [
//       {
//         $set: {
//           firstName: { $arrayElemAt: [{ $split: ["$name", " "] }, 0] },
//           lastName: {
//             $cond: [
//               { $gt: [{ $size: { $split: ["$name", " "] } }, 1] },
//               {
//                 $trim: {
//                   input: {
//                     $reduce: {
//                       input: { $slice: [{ $split: ["$name", " "] }, 1, 10] },
//                       initialValue: "",
//                       in: { $concat: ["$$value", " ", "$$this"] }
//                     }
//                   }
//                 }
//               },
//               ""
//             ]
//           }
//         }
//       }
//     ]
//   );  
//     console.timeEnd("Execution Time"); // End measuring time and log it
//     //207.44ms
// }

// const companyMembersFirstLast = async () => {
//     console.time("Execution Time"); // Start measuring time
//   await Company.updateMany(
//     {
//       "invited_team_members.name": { $exists: true },
//       "invited_team_members.firstName": { $exists: false },
//       "invited_team_members.lastName": { $exists: false },
//     },
//     [
//       {
//         $set: {
//           invited_team_members: {
//             $map: {
//               input: "$invited_team_members",
//               as: "member",
//               in: {
//                 $mergeObjects: [
//                   "$$member",
//                   {
//                     firstName: {
//                       $arrayElemAt: [
//                         { $split: ["$$member.name", " "] },
//                         0
//                       ]
//                     },
//                     lastName: {
//                       $cond: [
//                         {
//                           $gt: [
//                             { $size: { $split: ["$$member.name", " "] } },
//                             1
//                           ]
//                         },
//                         {
//                           $trim: {
//                             input: {
//                               $reduce: {
//                                 input: {
//                                   $slice: [
//                                     { $split: ["$$member.name", " "] },
//                                     1,
//                                     10 // again, arbitrary max
//                                   ]
//                                 },
//                                 initialValue: "",
//                                 in: { $concat: ["$$value", " ", "$$this"] }
//                               }
//                             }
//                           }
//                         },
//                         ""
//                       ]
//                     }
//                   }
//                 ]
//               }
//             }
//           }
//         }
//       }
//     ]
//   );  
//     console.timeEnd("Execution Time"); // End measuring time and log it
// }

// //For JobType based filters
// const dbUpdater = async () =>{
//   const candidatesData = await candidates.find();
//   for (const candidate of candidatesData) {
//     for (const jobApp of candidate.jobApplications) {
//       const job = await jobs.findById(jobApp.jobId);
//       jobApp.jobType = job ? job.employmentType : "NA";
//     }
//     await candidate.save();
//   }

// }

// const inviteToRequestUpdater = async () => {
//   try {
//     // Fetch all company documents
//     const companies = await Company.find();

//     let updatedCount = 0;

//     for (const company of companies) {
//       let modified = false;

//       // Update each invited_team_member based on `invited` flag
//       company.invited_team_members = company.invited_team_members.map(member => {
//         const wasInvited = member.invited === true;
//         const newStatus = wasInvited ? "INVITED" : "ADDED";

//         if (member.status !== newStatus) {
//           member.status = newStatus;
//           modified = true;
//         }

//         return member;
//       });

//       if (modified) {
//         await company.save();
//         updatedCount++;
//       }
//     }

//     console.log(`✅ Updated ${updatedCount} company documents.`);
//   } catch (error) {
//     console.error("❌ Error during status update:", error);
//   }
// };


// const inviteToRequestUpdaterMember = async () => {
//   try {
//     // 1. Find all companies
//     const companies = await Company.find();

//     let updatedCount = 0;

//     for (const company of companies) {
//       let modified = false;

//       // 2. Loop through invited_team_members
//       company.invited_team_members = company.invited_team_members.map(member => {
//         if (member.member_id) {
//           member.status = "JOINED";
//           modified = true;
//         }
//         return member;
//       });

//       // 3. Save only if modified
//       if (modified) {
//         await company.save();
//         updatedCount++;
//       }
//     }

//     console.log(`✅ Updated ${updatedCount} documents.`);
//   } catch (error) {
//     console.error("❌ Error updating members:", error);
//   }
// };


// const removeInvitedKey = async () => {
//   await Company.updateMany(
//     { "invited_team_members.invited": { $exists: true } },
//     {
//       $unset: {
//         "invited_team_members.$[elem].invited": ""
//       }
//     },
//     {
//       arrayFilters: [
//         { "elem.invited": { $exists: true } }
//       ]
//     }
//   );
  
  
// }
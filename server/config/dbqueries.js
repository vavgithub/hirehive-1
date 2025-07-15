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


// async function renameTechToHTML() {
//   try {
//     const applied = await candidates.find({
//       jobApplications: {
//         $elemMatch: {
//           jobProfile: "UI UX",
//           "stageStatuses.Screening.score": { $exists: true }
//         }
//       }
//     });

//     let updatedCount = 0;

//     for (let candidate of applied) {
//       let modified = false;

//       for (let app of candidate.jobApplications) {
//         let stageStatuses = app.stageStatuses;

//         // Convert Map to plain object if it's a Map
//         if (stageStatuses instanceof Map) {
//           stageStatuses = Object.fromEntries(stageStatuses);
//         }

//         if (
//           app.jobProfile === "UI UX" &&
//           stageStatuses.Screening &&
//           stageStatuses.Screening.score &&
//           stageStatuses.Screening.score.Tech !== undefined
//         ) {
//           // Modify the score
//           const score = stageStatuses.Screening.score;
//           score.HTML = score.Tech;
//           delete score.Tech;

//           // Assign the modified score back
//           stageStatuses.Screening.score = score;

//           // Convert back to Map and assign
//           app.stageStatuses = new Map(Object.entries(stageStatuses));
//           console.log(app.stageStatuses)
//           modified = true;
//         }
//       }

//       if (modified) {
//         candidate.markModified("jobApplications");
//         await candidate.save();
//         updatedCount++;
//       }
//     }

//     console.log(`✅ Updated ${updatedCount} candidate documents.`);
//     return updatedCount;
//   } catch (error) {
//     console.error("❌ Error updating records:", error);
//     throw error;
//   }
// }



// const migrateProfilePicture = async (url) => {
//   try {
//     const response = await axios.get(url, { responseType: 'arraybuffer' });
//     const contentType = response.headers['content-type'];
//     const fileName = getFileNameFromUrl(url);
//     const buffer = response.data;

//     const s3Url = await uploadBufferToS3(buffer, fileName, contentType, 'candidate-profile-pictures');
//     return s3Url;
//   } catch (error) {
//     console.error(`❌ Failed to migrate profile picture: ${url}`, error.message);
//     return null;
//   }
// };

// export const migrateBatchProfilePictures = async () => {
//   const users = await candidates
//     .find({
//       profilePictureUrl: {
//         $exists: true,
//         $ne: '',
//         $regex: /^https:\/\/res\.cloudinary\.com\//,
//       },
//     })
//     .sort({ createdAt: 1 })
//     .limit(50);

//   console.log(`📦 Migrating ${users.length} candidate profile pictures`);

//   for (const user of users) {
//     try {
//         let oldUrl = user.profilePictureUrl
//       const s3Url = await migrateProfilePicture(user.profilePictureUrl);
//       if (s3Url) {
//         user.profilePictureUrl = s3Url;
//         await user.save();
//         await deleteFromCloudinary(oldUrl);
//         console.log(`✅ Updated: ${user.email}`);
//       }
//       await sleep(2000); // 2s pause
//     } catch (err) {
//       console.error(`❌ Error for ${user.email}:`, err.message);
//     }
//   }

//   console.log('🎉 Batch migration complete');
// };


// //USERS
// const migrateProfilePictureUsers = async (url) => {
//   try {
//     const response = await axios.get(url, { responseType: 'arraybuffer' });
//     const contentType = response.headers['content-type'];
//     const fileName = getFileNameFromUrl(url);
//     const buffer = response.data;

//     const s3Url = await uploadBufferToS3(buffer, fileName, contentType, 'profile-pictures');
//     return s3Url;
//   } catch (error) {
//     console.error(`❌ Failed to migrate profile picture: ${url}`, error.message);
//     return null;
//   }
// };

// export const migrateBatchProfilePicturesUsers = async () => {
//   const users = await User
//     .find({
//       profilePicture: {
//         $exists: true,
//         $ne: '',
//         $regex: /^https:\/\/res\.cloudinary\.com\//,
//       },
//     })
//     .sort({ createdAt: 1 })
//     // .limit(2);

//   console.log(`📦 Migrating ${users.length} profile pictures`);

//   for (const user of users) {
//     try {
//         let oldUrl = user.profilePicture
//       const s3Url = await migrateProfilePictureUsers(user.profilePicture);
//       if (s3Url) {
//         user.profilePicture = s3Url;
//         await user.save();
//         await deleteFromCloudinary(oldUrl);
//         console.log(`✅ Updated: ${user.email}`);
//       }
//       await sleep(2000); // 2s pause
//     } catch (err) {
//       console.error(`❌ Error for ${user.email}:`, err.message);
//     }
//   }

//   console.log('🎉 Batch migration complete');
// };


// const migrateResumeFile = async (url) => {
//   try {
//     const response = await axios.get(url, { responseType: 'arraybuffer' });
//     const contentType = response.headers['content-type'];
//     const fileName = getFileNameFromUrl(url); // .pdf or .docx supported
//     const buffer = response.data;

//     const s3Url = await uploadBufferToS3(buffer, fileName, contentType, 'resumes');
//     return s3Url;
//   } catch (error) {
//     console.error(`❌ Failed to migrate resume: ${url}`, error.message);
//     return null;
//   }
// };

// export const migrateCandidateResumes = async () => {
//   const candidatesToMigrate = await candidates
//     .find({
//       $or: [
//         { resumeUrl: { $regex: /^https:\/\/res\.cloudinary\.com\// } },
//         { 'jobApplications.resumeUrl': { $regex: /^https:\/\/res\.cloudinary\.com\// } },
//       ],
//     })
//     .sort({ createdAt: 1 })
//     .limit(10);

//   console.log(`📦 Processing ${candidatesToMigrate.length} candidates...`);

//   for (const candidate of candidatesToMigrate) {
//     try {
//       const uploadedUrlsMap = new Map(); // key: cloudinary url, value: s3 url
//       const cloudinaryUrls = new Set();

//       // 1️⃣ Check and prepare resume URLs (global + jobApplications)
//       if (isCloudinaryUrl(candidate.resumeUrl)) {
//         cloudinaryUrls.add(candidate.resumeUrl);
//       }

//       for (const app of candidate.jobApplications || []) {
//         if (isCloudinaryUrl(app.resumeUrl)) {
//           cloudinaryUrls.add(app.resumeUrl);
//         }
//       }

//       // 2️⃣ Upload all unique resume URLs to S3
//       for (const url of cloudinaryUrls) {
//         const s3Url = await migrateResumeFile(url);
//         if (s3Url) {
//           uploadedUrlsMap.set(url, s3Url);
//         } else {
//             console.error(`❌ Failed to migrate resume for ${candidate.email}: ${url}`);
//         }
//       }

//       if (uploadedUrlsMap.size === 0) continue; // nothing to update

//       // 3️⃣ Replace resume URLs in candidate doc
//       if (uploadedUrlsMap.has(candidate.resumeUrl)) {
//         candidate.resumeUrl = uploadedUrlsMap.get(candidate.resumeUrl);
//       }

//       for (const app of candidate.jobApplications || []) {
//         if (uploadedUrlsMap.has(app.resumeUrl)) {
//           app.resumeUrl = uploadedUrlsMap.get(app.resumeUrl);
//         }
//       }

//       // 4️⃣ Save and delete from Cloudinary
//       await candidate.save();
//       console.log(`✅ Updated resumes for: ${candidate.email}`);

//       for (const oldUrl of uploadedUrlsMap.keys()) {
//         await deleteFromCloudinary(oldUrl);
//       }

//       await sleep(2000); // wait before next candidate
//     } catch (err) {
//       console.error(`❌ Error for ${candidate.email}:`, err.message);
//     }
//   }

//   console.log('🎉 Resume migration complete.');
// };

// 🟡 Upload one video and return both S3 URL and original Cloudinary URL
// const migrateRecordingUrl = async (url,email) => {
//   try {
//     const response = await axios.get(url, { responseType: 'arraybuffer' });
//     const contentType = response.headers['content-type'];
//     const fileName = getFileNameFromUrl(url);
//     const buffer = response.data;

//     const s3Url = await uploadBufferToS3(buffer, fileName, contentType, 'assessments');
//     return { s3Url, originalUrl: url };
//   } catch (error) {
//     console.error(`❌ Failed to migrate video: ${url}`, error.message,email);
//     return null;
//   }
// };

// // 🟢 Batch migration for 100 candidates by earliest attemptDate
// export const migrateRecordingUrlsBatch = async () => {
//   const candidatesToProcess = await candidates
//     .find({
//       questionnaireAttempts: {
//         $elemMatch: {
//           recordingUrl: {
//             $exists: true,
//             $ne: null,
//             $regex: /^https:\/\/res\.cloudinary\.com\//,
//           },
//         },
//       },
//     })
//     .sort({ 'questionnaireAttempts.attemptDate': 1 })
//     .limit(54);

//   console.log(`📦 Processing ${candidatesToProcess.length} candidates...`);

//   for (const candidate of candidatesToProcess) {
//     let hasChanges = false;
//     const urlsToDelete = [];
//     for (const attempt of candidate.questionnaireAttempts) {
//       if (isCloudinaryUrl(attempt.recordingUrl)) {
//         const result = await migrateRecordingUrl(attempt.recordingUrl,candidate.email);
//         if (result?.s3Url) {
//           attempt.recordingUrl = result.s3Url;
//           urlsToDelete.push(result.originalUrl);
//           hasChanges = true;
//         }
//       }
//     }

//     if (hasChanges) {
//       await candidate.save();
//       console.log(`✅ Migrated recordings for: ${candidate.email}`);

//       // Safe deletion after save
//       for (const url of urlsToDelete) {
//         try {
//           const res = await deleteFromCloudinary(url);
//           console.log(`🗑️ Deleted from Cloudinary: `, res);
//         } catch (err) {
//           console.error(`❌ Failed to delete ${publicId}`, err.message);
//         }
//       }

//       await sleep(2000); // 2-second pause
//     }
//   }

//   console.log('🎉 Batch migration complete.');
// };


// export const migrateRecordingUrl = async (url) => {
//   try {
//     const response = await axios.get(url, { responseType: 'arraybuffer' });

//     const buffer = response.data;
//     const contentType = response.headers['content-type'];
//     const fileName = getFileNameFromUrl(url); // e.g. video-1234567890_abcd.webm

//     const s3Url = await uploadBufferToS3(buffer, fileName, contentType, 'assessments');

//     return s3Url;
//   } catch (error) {
//     if (error.response?.status === 404) {
//       console.warn(`⚠️ Cloudinary URL not found (404): ${url}`);
//     } else {
//       console.error(`❌ Failed to migrate recording: ${url}`, error.message);
//     }
//     return null;
//   }
// };


// export const migrateJobApplicationRecordings = async () => {
//   const candidatesToMigrate = await candidates
//     .find({
//       'jobApplications.assessmentResponse.recordingUrl': {
//         $regex: /^https:\/\/res\.cloudinary\.com\//,
//       },
//     })
//     .sort({ createdAt: 1 })
//     .limit(50);

//   console.log(`📦 Processing ${candidatesToMigrate.length} candidates with job app recordings...`);

//   // To avoid duplicate uploads/deletions
//   const uploadCache = new Map(); // cloudinaryUrl => s3Url
//   const urlsToDelete = new Set();

//   for (const candidate of candidatesToMigrate) {
//     let hasChanges = false;

//     for (const app of candidate.jobApplications || []) {
//       const url = app?.assessmentResponse?.recordingUrl;

//       if (url && /^https:\/\/res\.cloudinary\.com\//.test(url)) {
//         if (uploadCache.has(url)) {
//           // Already uploaded — reuse S3 URL
//           app.assessmentResponse.recordingUrl = uploadCache.get(url);
//           hasChanges = true;
//         } else {
//           try {
//             const s3Url = await migrateRecordingUrl(url); // upload + get S3 URL
//             if (s3Url) {
//               app.assessmentResponse.recordingUrl = s3Url;
//               uploadCache.set(url, s3Url);
//               urlsToDelete.add(url);
//               hasChanges = true;
//             }
//           } catch (err) {
//             console.error(`❌ Failed to migrate URL for ${candidate.email}:`, err.message);
//           }
//         }
//       }
//     }

//     if (hasChanges) {
//       try {
//         await candidate.save();
//         console.log(`✅ Updated: ${candidate.email}`);
//         await sleep(2000);
//       } catch (err) {
//         console.error(`❌ Save failed for ${candidate.email}:`, err.message);
//       }
//     }
//   }

//   // Delete all unique Cloudinary URLs used
//   for (const url of urlsToDelete) {
//     try {
//       const res = await deleteFromCloudinary(url, 'video');
//       console.log(`🗑️ Deleted: ${url}`, res);
//     } catch (err) {
//       console.error(`❌ Deletion failed for ${url}:`, err.message);
//     }
//   }

//   console.log('🎉 Job application recording migration complete.');
// };

// export const migrateAssessmentImageUrl = async (url) => {
//   try {
//     const response = await axios.get(url, { responseType: 'arraybuffer' });
//     const contentType = response.headers['content-type'];
//     const fileName = getFileNameFromUrl(url);
//     const buffer = response.data;

//     const s3Url = await uploadBufferToS3(buffer, fileName, contentType, 'assessment-question-images');
//     return s3Url;
//   } catch (error) {
//     console.error(`❌ Failed to migrate image: ${url}`, error.message);
//     return null;
//   }
// };

// export const migrateAssessmentImages = async () => {
//   const assessments = await Assessment
//     .find({
//       $or: [
//         { 'questions.imageUrl': { $regex: '^https://res\\.cloudinary\\.com/' } },
//         { 'questions.options.imageUrl': { $regex: '^https://res\\.cloudinary\\.com/' } }
//       ]
//     })
//     .sort({ createdAt: 1 })
//   .limit(30);

//   console.log(`📦 Processing ${assessments.length} assessments...`);

//   const urlsToDelete = new Set(); // to avoid duplicate deletions
//   const uploadCache = new Map();  // avoid re-uploading same image

//   for (const assessment of assessments) {
//     let hasChanges = false;

//     for (const question of assessment.questions) {
//       // Migrate question.imageUrl
//       const qUrl = question.imageUrl;
//       if (isCloudinaryUrl(qUrl)) {
//         if (uploadCache.has(qUrl)) {
//           question.imageUrl = uploadCache.get(qUrl);
//           hasChanges = true;
//         } else {
//           const newUrl = await migrateAssessmentImageUrl(qUrl);
//           if (newUrl) {
//             question.imageUrl = newUrl;
//             uploadCache.set(qUrl, newUrl);
//             urlsToDelete.add(qUrl);
//             hasChanges = true;
//           }
//         }
//       }

//       // Migrate each option.imageUrl
//       for (const option of question.options || []) {
//         const oUrl = option.imageUrl;
//         if (isCloudinaryUrl(oUrl)) {
//           if (uploadCache.has(oUrl)) {
//             option.imageUrl = uploadCache.get(oUrl);
//             hasChanges = true;
//           } else {
//             const newUrl = await migrateAssessmentImageUrl(oUrl);
//             if (newUrl) {
//               option.imageUrl = newUrl;
//               uploadCache.set(oUrl, newUrl);
//               urlsToDelete.add(oUrl);
//               hasChanges = true;
//             }
//           }
//         }
//       }
//     }

//     if (hasChanges) {
//       await assessment.save();
//       console.log(`✅ Updated: ${assessment.title} - ${assessment.category}`);
//       await sleep(2000);
//     }
//   }

//   // // ✅ After saving all, delete from Cloudinary
//   // for (const url of urlsToDelete) {
//   //   try {
//   //     const res = await deleteFromCloudinary(url, 'image');
//   //     console.log(`🗑️ Deleted from Cloudinary: ${url}`, res);
//   //   } catch (err) {
//   //     console.error(`❌ Failed to delete ${url}`, err.message);
//   //   }
//   // }

//   console.log('🎉 Assessment image migration complete.');
// };


// const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

// const getFileNameFromUrl = (url) => {
//   const parts = url.split('/');
//   return parts[parts.length - 1].split('?')[0];
// };

// export const isCloudinaryUrl = (url) => {
//   if (!url || typeof url !== 'string') return false;
//   return /^https:\/\/res\.cloudinary\.com\//.test(url);
// };


// const migrateQuestionImageUrl = async (url) => {
//   try {
//     const response = await axios.get(url, { responseType: 'arraybuffer' });
//     const contentType = response.headers['content-type'];
//     const buffer = response.data;
//     const fileName = getFileNameFromUrl(url);

//     const s3Url = await uploadBufferToS3(buffer, fileName, contentType, 'assessment-question-images');
//     return s3Url;
//   } catch (error) {
//     console.error(`❌ Failed to migrate image: ${url}`, error.message);
//     return null;
//   }
// };

// export const migrateQuestionModelImages = async () => {
//   const questions = await Question
//     .find({
//       $or: [
//         { imageUrl: { $regex: '^https://res\\.cloudinary\\.com/' } },
//         { 'options.imageUrl': { $regex: '^https://res\\.cloudinary\\.com/' } }
//       ]
//     })
//     .sort({ createdAt: 1 })
//     .limit(5); // Adjust as needed

//   console.log(`📦 Found ${questions.length} questions to migrate...`);

//   for (const question of questions) {
//     let hasChanges = false;
//     const urlsToDelete = [];

//     // Migrate main question image
//     if (isCloudinaryUrl(question.imageUrl)) {
//       const s3Url = await migrateQuestionImageUrl(question.imageUrl);
//       if (s3Url) {
//         urlsToDelete.push(question.imageUrl);
//         question.imageUrl = s3Url;
//         hasChanges = true;
//       }
//     }

//     // Migrate options imageUrls
//     for (const option of question.options || []) {
//       if (isCloudinaryUrl(option.imageUrl)) {
//         const s3Url = await migrateQuestionImageUrl(option.imageUrl);
//         if (s3Url) {
//           urlsToDelete.push(option.imageUrl);
//           option.imageUrl = s3Url;
//           hasChanges = true;
//         }
//       }
//     }

//     if (hasChanges) {
//       await question.save();
//       console.log(`✅ Migrated question ID: ${question._id}`);

//       // // Optional: Delete Cloudinary files
//       // for (const url of urlsToDelete) {
//       //   try {
//       //     const res = await deleteFromCloudinary(url, 'image');
//       //     console.log(`🗑️ Deleted: ${url}`, res);
//       //   } catch (err) {
//       //     console.error(`❌ Deletion failed for ${url}:`, err.message);
//       //   }
//       // }

//       await sleep(2000); // Delay between updates
//     }
//   }

//   console.log('🎉 Question image migration complete.');
// };




// export const uploadBufferToS3 = async (fileBuffer, fileName, contentType, folder) => {
//   try {
//     const envFolder = process.env.AWS_ENV_FOLDER;
//     const s3Key = `uploads/${envFolder}/${folder}/${Date.now()}-${fileName}`;

//     const command = new PutObjectCommand({
//       Bucket: process.env.AWS_S3_BUCKET_NAME,
//       Key: s3Key,
//       Body: fileBuffer,
//       ContentType: contentType,
//       ACL: 'private',
//     });

//     await s3Client.send(command);

//     const cloudfrontDomain = process.env.AWS_CLOUDFRONT_DOMAIN;
//     return `${cloudfrontDomain}/${s3Key}`;
//   } catch (error) {
//     console.error('❌ Error uploading to S3:', error.message);
//     throw error;
//   }
// };


// export const extractPublicId = (url) => {
//   const match = url.match(/\/upload\/(?:v\d+\/)?([^?#]+)/);
//   if (!match || !match[1]) {
//     throw new Error(`Invalid Cloudinary URL: ${url}`);
//   }

//   const fullPath = match[1];
//   return fullPath.replace(/\.[^/.]+$/, ''); // remove extension (e.g., .mp4, .webm)
// };




// // export const deleteFromCloudinary = async (url) => {
// //   const publicId = extractPublicId(url);
// //   await cloudinary.uploader.destroy(publicId, { resource_type: 'image' });
// // };

// //For RESUMES
// export const deleteFromCloudinary = async (url) => {
//   const publicId = extractPublicId(url);
//   const result = await cloudinary.uploader.destroy(publicId, {
//     resource_type: 'video',
//   });
//   return result;
// };


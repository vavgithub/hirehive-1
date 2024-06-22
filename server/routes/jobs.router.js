import express from 'express';
import {activeJobsFilterCount, archiveJob, closedJobsFilterCount, createJob, deleteJob, draftJob, draftJobsFilterCount, editJob, filterJobs, getJobById, getJobs, getTotalJobCount , jobsStats, searchJobs, unarchiveJob, updateJob } from '../controllers/jobs.controller.js';
import { verifyJWT } from '../middlewares/verifyJWT.middleware.js';

const router = express.Router();

// router.use();


// Route to create a new job
router.route('/jobs').get(verifyJWT,getJobs);
router.route('/createJobs').post(verifyJWT,createJob);
router.route('/filterJobs',).post(filterJobs);
router.route('/jobs').get(verifyJWT,getJobs);
router.route('/jobsStats').get(verifyJWT, jobsStats);
router.get('/activeJobsFilterCount',activeJobsFilterCount)
router.get('/draftJobsFilterCount',draftJobsFilterCount)
router.get('/closedJobsFilterCount', closedJobsFilterCount);

router.get('/jobsCount', getTotalJobCount);
router.get('/searchJobs', searchJobs);
router.get('/getJobById/:id', getJobById);

router.delete('/deleteJob/:id', deleteJob);
router.put('/archiveJob/:id/', archiveJob);
router.put('/updateJob/:id', updateJob);
router.put('/unarchiveJob/:id/', unarchiveJob);

// router.put('/draftJob/:id',draftJob);

// router.put('/editJob/:id', editJob);

export default router;

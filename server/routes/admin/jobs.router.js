import express from 'express';
import {activeJobsFilterCount, archiveJob, closedJobsFilterCount, closeJob, createJob, deleteJob, draftJob, draftJobsFilterCount, editJob, filterJobs, getCandidatesForJob, getJobById, getJobs, getTotalJobCount , jobsStats, reOpenJob, searchJobs, unarchiveJob, updateJob } from '../../controllers/admin/jobs.controller.js';
import { protect } from '../../middlewares/authMiddleware.js';

const router = express.Router();


router.get('/candidates/:jobId', getCandidatesForJob);
router.get('/jobsStats',protect, jobsStats);
router.get('/activeJobsFilterCount',protect, activeJobsFilterCount);
router.get('/draftJobsFilterCount',protect, draftJobsFilterCount);
router.get('/closedJobsFilterCount',protect, closedJobsFilterCount);
router.get('/jobsCount',protect, getTotalJobCount);
router.get('/searchJobs',protect, searchJobs);
router.get('/jobs',protect, getJobs);

router.post('/createJobs',protect, createJob);
router.post('/filterJobs', protect,filterJobs);




router.put('/updateJob/:id', updateJob);
router.put('/archiveJob/:id', archiveJob);
router.delete('/deleteJob/:id', deleteJob);
router.put('/updateJob/:id', updateJob);
router.put('/archiveJob/:id/', archiveJob);
router.put('/closeJob/:id/', closeJob);

router.put('/unarchiveJob/:id/', unarchiveJob);
router.put('/reOpen/:id/', reOpenJob);
router.put('/draftJob/:id',draftJob);

router.put('/editJob/:id', editJob);
router.get('/getJobById/:id' , getJobById);




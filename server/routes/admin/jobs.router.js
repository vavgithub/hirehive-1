import express from 'express';
import { archiveJob , closeJob, createJob, deleteJob, draftJob, editJob, filterJobs, filterSearchJobs, 
     getAssessmentTemplates, 
     getJobById, getJobs, getTotalJobCount , reOpenJob, searchJobs, StatisticsController, unarchiveJob, updateJob } from '../../controllers/admin/jobs.controller.js';
import { protect, roleProtect } from '../../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/jobsCount',protect, getTotalJobCount);
router.get('/searchJobs',protect, searchJobs);

router.get('/jobs',protect, getJobs);
router.get('/stats/overall',protect, StatisticsController.getOverallStats);
router.get('/stats/job/:jobId',protect, StatisticsController.getJobStats);
router.get('/get-assessment-templates',protect,roleProtect(['Admin','Hiring Manager']), getAssessmentTemplates);
router.get('/getJobById/:id' , getJobById);

router.post('/filterJobs', protect,filterJobs);

router.post('/createJobs',protect, createJob);
router.post('/filterSearchJobs', protect,filterSearchJobs);

router.delete('/deleteJob/:id',protect,roleProtect(['Admin','Hiring Manager']), deleteJob);

router.put('/updateJob/:id',protect,roleProtect(['Admin','Hiring Manager']), updateJob);
router.put('/archiveJob/:id',protect,roleProtect(['Admin','Hiring Manager']), archiveJob);

router.put('/closeJob/:id/',protect,roleProtect(['Admin','Hiring Manager']), closeJob);
router.put('/unarchiveJob/:id/',protect,roleProtect(['Admin','Hiring Manager']), unarchiveJob);
router.put('/reOpen/:id/',protect,roleProtect(['Admin','Hiring Manager']), reOpenJob);
router.put('/draftJob/:id',protect,roleProtect(['Admin','Hiring Manager']),draftJob);
router.put('/editJob/:id',protect,roleProtect(['Admin','Hiring Manager']), editJob);

export default router;




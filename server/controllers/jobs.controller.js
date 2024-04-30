// import Job from ''; // Import your Mongoose model
import { MongooseError } from "mongoose";
import { jobs } from "../models/admin/jobs.model.js";
// Controller function to create a new job

const getJobs = async (req, res) => {
    try {
        // Fetch all jobs from the database
        const jobArray = await jobs.find();
        // Respond with the list of jobs
        res.status(200).json(jobArray);
    } catch (error) {
        // Handle error if fetching jobs fails
        res.status(500).json({ message: error.message });
    }
};

const createJob = async (req, res) => {
    try {
        // Destructure job details from request body
        const { title , location , category , description , overview  , requirements , jobType , experienceLevel , jobFunction} = req.body;

        // Create a new job instance using the Job model
        const newJob = new jobs({
            title,
            location,
            category,
            description,
            overview,
            requirements,
            jobFunction,
            jobType,
            experienceLevel             
        });

        // Save the job to the database
        const savedJob = await newJob.save();

        // Respond with the saved job object
        res.status(201).json(savedJob);
    } catch (error) {
        if (error instanceof MongooseError && error.code === 11000) {
            // Handle duplicate key error (E11000)
            res.status(400).json({ message: `Job with title '${req.body.title}' already exists.` });
        } else {
            // Handle other errors
            res.status(500).json({ message: error.message });
        }
    }
};

const getTotalJobCount = async (req, res) => {
    try {

        // Count the total number of jobs in the database
        const totalCount = await jobs.countDocuments();
        // Respond with the total count
        res.status(200).json({ totalCount });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const searchJobs = async (req, res) => {
    const searchTerm = req.query.title;
    if (!searchTerm) {
        return res.status(400).json({ error: 'Search term (title) is required' });
      }
    try {
        // Fetch all jobs from the database
        const jobArray = await jobs.find({ title: { $regex: searchTerm, $options: 'i' } });
        // Respond with the list of jobs
        res.status(200).json(jobArray);
    } catch (error) {
        // Handle error if fetching jobs fails
        res.status(500).json({ message: error.message });
    }
}




// Export the controller function
export { createJob , getJobs , getTotalJobCount , searchJobs };

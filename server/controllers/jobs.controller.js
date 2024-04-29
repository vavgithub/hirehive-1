// import Job from ''; // Import your Mongoose model
import { MongooseError } from "mongoose";
import { jobs } from "../models/admin/jobs.model.js";
// Controller function to create a new job
const createJob = async (req, res) => {
    try {
        // Destructure job details from request body
        const { title , location , category , description , overview  , requirements } = req.body;

        // Create a new job instance using the Job model
        const newJob = new jobs({
            title,
            location,
            category,
            description,
            overview,
            requirements,             
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



// Export the controller function
export { createJob };

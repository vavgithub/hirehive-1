import { candidates } from "../../models/candidate/candidate.model.js";

const getCandidate = async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const jobCandidates = await candidates.find({ jobId });
    res.send(jobCandidates);
  } catch (error) {
    res.status(500).send(error);
  }
};

const createCandidate = async (req, res) => {
  try {
    const candidate = new candidates(req.body);
    await candidate.save();
    res.status(201).send(candidate);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getCandidateById = async (req, res) => {
  try {
    const candidate = await candidates.findById(req.params.id);
    res.send(candidate);
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateStatusAndStage = async (req, res) => {
  try {
    const candidateId = req.params.id;
    const updates = req.body;
    const updatedCandidate = await candidates.findByIdAndUpdate(candidateId, updates, { new: true });
    res.send(updatedCandidate);
  } catch (error) {
    res.status(400).send(error);
  }
}

const updateAssignee = async (req, res) => {
  try {
    const { candidatesData } = req.body;

    if (!candidatesData || !Array.isArray(candidatesData) || candidatesData.length === 0) {
      return res.status(400).json({ message: 'Invalid input. Expected an array of candidates.' });
    }

    const updateOperations = candidatesData.map(candidate => ({
      updateOne: {
        filter: { _id: candidate.id },
        update: { $set: { assignee: candidate.assignee } }
      }
    }));

    const result = await candidates.bulkWrite(updateOperations);

    if (result.modifiedCount > 0) {
      res.status(200).json({
        message: 'Assignees updated successfully',
        modifiedCount: result.modifiedCount
      });
    } else {
      res.status(404).json({ message: 'No candidates were updated' });
    }
  } catch (error) {
    console.error('Error updating assignees:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

export { getCandidate, createCandidate , getCandidateById , updateStatusAndStage , updateAssignee};

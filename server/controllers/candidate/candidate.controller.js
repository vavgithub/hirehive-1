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


export { getCandidate, createCandidate , getCandidateById , updateStatusAndStage};

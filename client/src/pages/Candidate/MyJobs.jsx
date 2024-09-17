import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { useEffect, useState } from "react";

const MyJobs = () => {
    const [candidateData, setCandidateData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCandidateData = async () => {
            try {
                const response = await axios.get('/auth/candidate/dashboard');
                setCandidateData(response.data.candidate);
            } catch (error) {
                console.error('Error fetching candidate data:', error);
                navigate('/candidate/login'); // Redirect to login if not authorized
            }
        };

        fetchCandidateData();
    }, [navigate]);

    if (!candidateData) {
        return <div>Loading...</div>;
    }
    console.log(candidateData);

    return (
        <div className="candidate-dashboard">
            <div className="bg-background-90 p-2 m-2 rounded-xl">
                <div className="flex justify-between">
                    {candidateData.jobApplied}
                    <div className="bg-background-60 p-1 rounded-xl">

                        {candidateData.jobId.jobProfile}
                    </div>
                </div>
                <div className="flex  gap-4">
                    {candidateData.jobId.employmentType}
                    <div>
                        {candidateData.jobId.experienceFrom} -  {candidateData.jobId.experienceTo}

                    </div>

                </div>
                <p className="text-font-gray typography-large-p">
                    {candidateData.jobId.jobDescription}

                </p>
                {candidateData.jobId.createdAt}
            </div>

        </div>
    );
};
export default MyJobs;
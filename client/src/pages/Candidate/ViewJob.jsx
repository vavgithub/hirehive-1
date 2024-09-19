import { useNavigate, useParams } from 'react-router-dom';
import axios from '../../api/axios';
import { useQuery } from '@tanstack/react-query';
import { Button } from '../../components/ui/Button';
import { formatDescription } from '../../utility/formatDescription';
import SideCard from '../../components/SideCard';
import useAuthCandidate from '../../hooks/useAuthCandidate'; // Import the authentication hook

// Function to fetch the job data by ID
const getJobById = async (id) => {
    const response = await axios.get(`/getJobById/${id}`);
    return response.data;
};

const ViewJob = () => {
    const { id: mainId } = useParams(); // Extract the job ID from the URL params
    const navigate = useNavigate();

    // Get authentication state and candidate data
    const { isAuthenticated, isLoading: isAuthLoading, candidateData } = useAuthCandidate();

    // Using React Query to fetch the job data by ID
    const {
        data: formData,
        error,
        isLoading,
        isError
    } = useQuery({
        queryKey: ['viewJob', mainId], // Unique query key with job ID
        queryFn: () => getJobById(mainId), // Function to fetch job by ID
        enabled: !!mainId, // Only run the query if the ID exists
    });

    // Show loading indicator while fetching data
    if (isLoading || isAuthLoading) {
        return <div>Loading...</div>;
    }

    // Handle error case
    if (isError) {
        return <div>Error fetching job: {error.message}</div>;
    }

    // Determine if the candidate has already applied to this job
    let hasApplied = false;
    if (isAuthenticated && candidateData && candidateData.jobApplications) {
        hasApplied = candidateData.jobApplications.some((application) => {
            if (application.jobId) {
                // Ensure both IDs are strings for comparison
                const applicationJobId = typeof application.jobId === 'object' ? application.jobId._id : application.jobId;
                return applicationJobId === mainId;
            }
            return false;
        });
    }

    const handleApplyClick = () => {
        console.log("Clicked on apply");
        navigate(`/apply-job/${mainId}`);
    };

    return (
        <div className='h-screen bg-main-bg bg-cover pt-28 mb-6'>
            <div className='mx-16 bg-background-30 rounded-xl p-6'>
                <div className='flex justify-between'>
                    <h1 className='typography-h1 '>{formData.jobTitle}</h1>
                    <div className='w-44'>
                        {hasApplied ? (
                            <Button variant="secondary" disabled>
                                Already Applied
                            </Button>
                        ) : (
                            <Button onClick={handleApplyClick} variant="primary">
                                Apply Job
                            </Button>
                        )}
                    </div>
                </div>
                <div className='flex justify-between'>
                    <div className='w-3/4'>
                        <div
                            className='text-font-gray'
                            dangerouslySetInnerHTML={{ __html: formatDescription(formData.jobDescription) }}
                        ></div>
                        <div>
                            <h4 className='typography-h4 mt-6 mb-3'>Skills</h4>
                            <div className='grid grid-cols-6 gap-3'>
                                {formData.skills && formData.skills.map((skill, index) => (
                                    <span key={index} className="flex justify-center bg-background-70 m px-6 py-2 rounded-full">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div>
                        <SideCard formData={formData} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewJob;

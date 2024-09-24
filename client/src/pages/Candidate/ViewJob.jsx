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
    const { id: mainId } = useParams();
    const navigate = useNavigate();
    const { isAuthenticated, isLoading: isAuthLoading, candidateData } = useAuthCandidate();

    const {
        data: formData,
        error,
        isLoading,
        isError
    } = useQuery({
        queryKey: ['viewJob', mainId],
        queryFn: () => getJobById(mainId),
        enabled: !!mainId,
    });

    if (isLoading || isAuthLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error fetching job: {error.message}</div>;
    }

    // Determine if the candidate has already applied to this job
    const hasApplied = isAuthenticated && candidateData && candidateData.jobApplications
        ? candidateData.jobApplications.some(application => application.jobId.toString() === mainId)
        : false;

    console.log('hasApplied:', hasApplied);

    const handleApplyClick = async () => {
        try {
            await axios.post(`/candidates/${mainId}/increment-apply-click`);
            navigate(`/apply-job/${mainId}`);
        } catch (error) {
            console.error('Error incrementing apply click count:', error);
        }
    };

    console.log('candidateData:', candidateData);
    console.log('mainId:', mainId);
    console.log('jobApplications:', candidateData?.jobApplications);
    console.log('hasApplied:', hasApplied);

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
                            className='text-font-gray font-outfit'
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

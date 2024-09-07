import { useNavigate, useParams } from 'react-router-dom';
import axios from '../../api/axios';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Button } from '../../components/ui/Button';
import { formatDescription } from '../../utility/formatDescription';
import SideCard from '../../components/SideCard';

// Function to fetch the job data by ID
const getJobById = async (id) => {
    const response = await axios.get(`/getJobById/${id}`);
    return response.data;
};

const ViewJob = () => {
    const { id: mainId } = useParams(); // Extract the job ID from the URL params
    const navigate = useNavigate();

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

    if (isLoading) {
        return <div>Loading...</div>; // Show loading indicator while fetching data
    }

    if (isError) {
        return <div>Error fetching job: {error.message}</div>; // Handle error case
    }


    const handleApplyClick = () => {
        console.log("Clicked  on apply");
        navigate(`/apply-job/${mainId}`);
    };

    console.log(formData);
    return (
        <div className='h-screen bg-main-bg bg-cover'>
            <div className='p-4 mx-4 bg-background-30'>
                <div className='flex justify-between'>
                    <h1 className='typography-h1 '>{formData.jobTitle}</h1>
                    <div className='w-44'>
                        <Button onClick={handleApplyClick} variant="primary">Apply Job</Button>
                    </div>
                </div>
                <div className='flex justify-between'>
                    <div className='w-3/4'>

                        <div className='text-font-gray' dangerouslySetInnerHTML={{ __html: formatDescription(formData.jobDescription) }}></div>
                        <div>
                            <h4 className='typography-h4'>Skills</h4>
                            {formData.skills && formData.skills.map((skill, index) => (
                                <span key={index} className="bg-background-70 mr-2 px-6 py-2 rounded-full">{skill}</span>
                            ))}
                        </div>
                    </div>
                    <div>
                        <SideCard formData={formData} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewJob


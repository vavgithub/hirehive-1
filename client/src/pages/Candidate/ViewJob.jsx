import { useNavigate, useParams } from 'react-router-dom';
import axios from '../../api/axios';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { Button } from '../../components/ui/Button';
import { formatDescription } from '../../utility/formatDescription';
import SideCard from '../../components/ui/SideCard';
import useAuthCandidate, { useCandidateAuth } from '../../hooks/useCandidateAuth'; // Import the authentication hook
import Header from '../../components/utility/Header';
import Loader from '../../components/ui/Loader';
import ArrowIcon from '../../svg/ArrowIcon';
import Logo from '../../svg/Logo/lightLogo.svg'
// Function to fetch the job data by ID
const getJobById = async (id) => {
    const response = await axios.get(`jobs/getJobById/${id}`);
    return response.data;
};

const ViewJob = () => {
    const { id: mainId } = useParams();
    const navigate = useNavigate();
    
    const { isAuthenticated, isLoading, candidateData } = useCandidateAuth()
  
    const {
      data: formData,
      error,
      isLoading : isApiLoading,
      isError
    } = useQuery({
      queryKey: ['viewJob', mainId],
      queryFn: () => getJobById(mainId),
      enabled: !!mainId,
    });
  
    if (isApiLoading || isLoading) {
      return (
        <div className="flex justify-center items-center min-h-screen">
          <Loader />
        </div>
      );
    }
  
    const hasApplied = isAuthenticated && candidateData && candidateData.jobApplications
      ? candidateData.jobApplications.some(application => 
          application.jobId.toString() === mainId
        )
      : false;

    const handleApplyClick = async () => {
        try {
            await axios.post(`/candidates/${mainId}/increment-apply-click`);
            navigate(`/apply-job/${mainId}`);
        } catch (error) {
            console.error('Error incrementing apply click count:', error);
        }
    };

    return (
        <div className='min-h-screen flex justify-center bg-main-bg bg-cover'>

            <div className=" flex container flex-col items-center  p-6">
                <div className='flex  w-full mb-4 '>


                    <img className='h-12' src={Logo} />

                </div>
                <div className=" bg-background-30 rounded-xl p-6">
                    {/* Flex container for both desktop and mobile */}
                    <div className="flex flex-col lg:flex-row justify-between">
                        {/* Job Title */}
                        <Header HeaderText={formData.jobTitle} withBack="true" />
                        {/* <h1 className="typography-h1"></h1> */}
                        {/* Button only visible on large screens */}
                        <div className="hidden lg:block w-44">
                            {hasApplied ? (
                                <Button variant="secondary" disabled>
                                    Already Applied
                                </Button>
                            ) : (
                                <Button variant="primary" onClick={handleApplyClick} iconPosition="right" icon={ArrowIcon}  >
                                    Apply Job
                                </Button>
                            )}
                        </div>
                    </div>
            
                    {/* Job Description and Skills */}
                    <div className="flex flex-col md:flex md:flex-row md:justify-between mt-4">
                        {/* Left section: Job description and skills */}
                        <div className="md:w-3/4">
                        <h3 className='typography-h3'>Job Description</h3>
                            <div
                                className="text-font-gray font-outfit"
                                dangerouslySetInnerHTML={{ __html: formatDescription(formData.jobDescription) }}
                            ></div>

                            {/* Skills section */}
                            <div>
                                <h4 className="typography-h4 font-bold font-outfit mt-6 mb-3">Skills</h4>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                                    {formData.skills && formData.skills.map((skill, index) => (
                                        <span key={index} className="flex font-outfit justify-center bg-background-70 px-6 py-2 rounded-full">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right section: SideCard */}
                        <div className="mt-6 lg:mt-0">
                            <SideCard formData={formData} />
                        </div>
                    </div>

                    {/* Apply Button on mobile version (appears at the bottom of the page) */}
                    <div className="lg:hidden mt-8">
                        {hasApplied ? (
                            <Button variant="secondary" disabled>
                                Already Applied
                            </Button>
                        ) : (
                            <Button variant="primary" onClick={handleApplyClick} iconPosition="right" icon={ArrowIcon} >
                                Apply Job
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewJob;

import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../../api/axios';

const CandidateViewJob = () => {
    const [formData, setFormData] = useState(null);
    const { id: mainId } = useParams();
    const navigate = useNavigate();


    useEffect(() => {
        const fetchJob = async () => {
            try {
                const response = await axios.get(`http://localhost:8008/api/getJobById/${mainId}`);
                console.log(response.data)
                setFormData(response.data);
            } catch (error) {
                console.error('Error fetching job:', error);
            }
        };
        fetchJob();
    }, [mainId]);

    if (!formData) {
        return <div>Loading...</div>;  // Show a loading message or spinner until the data is loaded
    }

    const handleApplyClick = () => {
        console.log("Clicked on apply");
        navigate(`/apply-job/${mainId}`);
    };

    console.log(formData);
    return (
        <div className='bg-white'>

            <div className="px-24 pt-4 h-[216px] bg-gray-200 flex flex-col justify-between">
                <div className="flex flex-col ">

                    <div className='flex justify-between mt-[60px]'>
                        <h1 className="text-2xl font-bold">{formData.title}</h1>
                        <button onClick={handleApplyClick} className="bg-black text-white px-4 py-2 rounded">Apply Job</button>
                    </div>
                    <div className='flex gap-2'>
                        <span className='bg-gray-300 rounded capitalize'>{formData.category}</span>
                        <span className='bg-gray-300 rounded capitalize'>{formData.experienceLevel}</span>
                        <span className='bg-gray-300 rounded capitalize'>{formData.jobType}</span>
                    </div>
                </div>
            </div>

            <div className='px-24 grid grid-cols-2 ' >


                <div className=" bg-white p-4 border border-gray-500 m-4 ">
                    <h2 className="text-lg font-bold mb-2">Overview</h2>
                    <div className="mb-4">
                        <p className="text-gray-600">{formData.description}</p>
                    </div>

                    <div className="mb-4">
                        <h2 className="text-lg font-bold mb-2">Skills</h2>
                        <div className="flex flex-wrap">
                            {formData.skills.map((skill, index) => (
                                <span
                                    key={index}
                                    className="bg-gray-200 text-gray-800 px-2 py-1 rounded-md mr-2 mb-2"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="mb-4">
                        <h2 className="text-lg font-bold mb-2">Responsibility</h2>
                        <div className="mb-4">
                            <p className="text-gray-600">{formData.requirements}</p>
                        </div>

                    </div>
                    <div>
                        <h2 className="text-lg font-bold mb-2">Qualification</h2>
                        <div className="mb-4">
                            <p className="text-gray-600">{formData.qualifications}</p>
                        </div>

                    </div>
                </div>

                <div>


                    <div className='p-4'>
                        <div className='flex flex-col justify-center px-4 w-[275px]  border border-gray-500'>
                            <div className='flex items-center ' ><ArchiveIcon/>
                                <div className='flex flex-col justify-normal   px-2'>
                                    <h1>156</h1>
                                    <p>applied</p>
                                </div>
                            </div>

                            <div className='flex items-center ' ><ArchiveIcon/>
                                <div className='flex flex-col justify-normal  px-2'>
                                    <h1>156</h1>
                                    <p>applied</p>
                                </div>
                            </div>

                            <div className='flex items-center ' ><ArchiveIcon/>
                                <div className='flex flex-col justify-normal px-2' >
                                    <h1>156</h1>
                                    <p>applied</p>
                                </div>
                            </div>

                            <div className='flex items-center ' ><ArchiveIcon/>
                                <div className='flex flex-col justify-normal px-2'>
                                    <h1>156</h1>
                                    <p>applied</p>
                                </div>
                            </div>

                        </div>

                    </div>

                    <div className='p-2 m-2' >
                        <div className='w-[275px] h-[500px] border border-gray-500'>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CandidateViewJob

const ArchiveIcon = () => {
    return (

        <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.333 5.66667C18.333 5.20643 17.9599 4.83333 17.4997 4.83333C17.0394 4.83333 16.6663 5.20643 16.6663 5.66667H18.333ZM17.4997 16.5V17.3333C17.9599 17.3333 18.333 16.9602 18.333 16.5H17.4997ZM2.49967 16.5H1.66634C1.66634 16.9602 2.03944 17.3333 2.49967 17.3333V16.5ZM3.33301 5.66667C3.33301 5.20643 2.95991 4.83333 2.49967 4.83333C2.03944 4.83333 1.66634 5.20643 1.66634 5.66667H3.33301ZM0.833008 1.5V0.666667C0.372771 0.666667 -0.000325501 1.03976 -0.000325501 1.5L0.833008 1.5ZM19.1663 1.5H19.9997C19.9997 1.03976 19.6266 0.666667 19.1663 0.666667V1.5ZM19.1663 5.66667V6.5C19.6266 6.5 19.9997 6.1269 19.9997 5.66667H19.1663ZM0.833008 5.66667H-0.000325501C-0.000325501 6.1269 0.372771 6.5 0.833008 6.5L0.833008 5.66667ZM8.33301 8.16667C7.87277 8.16667 7.49967 8.53976 7.49967 9C7.49967 9.46024 7.87277 9.83333 8.33301 9.83333V8.16667ZM11.6663 9.83333C12.1266 9.83333 12.4997 9.46024 12.4997 9C12.4997 8.53976 12.1266 8.16667 11.6663 8.16667V9.83333ZM16.6663 5.66667V16.5H18.333V5.66667H16.6663ZM17.4997 15.6667H2.49967V17.3333H17.4997V15.6667ZM3.33301 16.5V5.66667H1.66634V16.5H3.33301ZM0.833008 2.33333H19.1663V0.666667H0.833008V2.33333ZM18.333 1.5V5.66667H19.9997V1.5H18.333ZM19.1663 4.83333H0.833008V6.5H19.1663V4.83333ZM1.66634 5.66667V1.5H-0.000325501V5.66667H1.66634ZM8.33301 9.83333H11.6663V8.16667H8.33301V9.83333Z" fill="#2A2D3C" />
        </svg>


    )
}
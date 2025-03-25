import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from '../../api/axios';
import Header from '../../components/utility/Header';
import StyledCard from '../../components/ui/StyledCard';
import Loader from '../../components/ui/Loader';
import { ensureAbsoluteUrl } from '../../utility/ensureAbsoluteUrl';
import { BookmarkFilledIcon } from '../../svg/Checkboxes/BookmarkIcons';
import StageBadge from '../../components/ui/StageBadge';

// API function to fetch shortlisted candidates
const fetchShortlistedCandidates = async () => {
    const { data } = await axios.get('admin/candidate/shortlisted');
    return data;
};

const Shortlisted = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    // Fetch shortlisted candidates
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['shortlistedCandidates'],
        queryFn: fetchShortlistedCandidates,
    });

    // Filter candidates based on search term
    const filteredCandidates = data?.candidates?.filter(candidate => {
        const fullName = `${candidate.firstName} ${candidate.lastName}`.toLowerCase();
        const jobs = candidate.applications.map(app => app.jobApplied.toLowerCase()).join(' ');
        const searchTermLower = searchTerm.toLowerCase();
        return fullName.includes(searchTermLower) || jobs.includes(searchTermLower);
    });

    // Handle navigation to candidate profile
    const handleViewCandidate = (candidateId, jobId) => {
        navigate(`/admin/candidates/view-candidate/${candidateId}/${jobId}`);
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Loader />
            </div>
        );
    }

    if (isError) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className='w-full p-4'>
            <div className="container mx-auto">
                <Header HeaderText={"Shortlisted Candidates"} />



                {/* Search box */}


                <StyledCard padding={2} backgroundColor={"bg-background-100 "}>

                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Search by name or job title..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-[300px]"
                        />
                    </div>
                    {filteredCandidates && filteredCandidates.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filteredCandidates.map((candidate) => (
                                candidate.applications.map((application) => (
                                    <StyledCard
                                        key={`${candidate._id}-${application.jobId}`}
                                        padding={2}
                                        backgroundColor={"bg-background-80 hover:bg-background-60"}
                                        extraStyles="cursor-pointer hover:shadow-md transition-all"
                                        onClick={() => handleViewCandidate(candidate._id, application.jobId)}
                                    >
                                        <div className="flex">
                                            {/* Profile picture */}
                                            <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                                                <img
                                                    src={candidate.profilePictureUrl || "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/694px-Unknown_person.jpg"}
                                                    alt=""
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>

                                            {/* Candidate details */}
                                            <div className="flex-1">
                                                <div className="flex justify-between">
                                                    <h3 className="typography-h3 mb-1">{candidate.firstName} {candidate.lastName}</h3>
                                                    <BookmarkFilledIcon />
                                                </div>

                                                <p className="typography-small-p text-font-gray">{application.jobApplied}</p>

                                                <div className="flex items-center mt-2 text-xs text-font-gray">
                                                    <span className="mr-2">{candidate.location || 'N/A'}</span>
                                                    <span className="mr-2">•</span>
                                                    <span>{candidate.experience || 0} Years Exp.</span>
                                                </div>


                                                <div className="mt-2 flex justify-between items-center">
                                                    <StageBadge stage={application.currentStage} />

                                                    {application.rating !== 'N/A' && (
                                                        <div className={`px-2 py-1 rounded text-xs ${application.rating === 'Good Fit' ? 'bg-green-100 text-green-700' :
                                                                application.rating === 'May Be' ? 'bg-yellow-100 text-yellow-700' :
                                                                    'bg-red-100 text-red-700'
                                                            }`}>
                                                            {application.rating}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </StyledCard>
                                ))
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <p className="typography-h4 text-font-gray">No shortlisted candidates found.</p>
                            <p className="typography-large-p mt-2">
                                Start shortlisting candidates to see them here.
                            </p>
                        </div>
                    )}
                </StyledCard>
            </div>
        </div>
    );
};

export default Shortlisted;
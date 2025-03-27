import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from '../../api/axios';
import Header from '../../components/utility/Header';
import StyledCard from '../../components/ui/StyledCard';
import Loader from '../../components/ui/Loader';
import { ensureAbsoluteUrl } from '../../utility/ensureAbsoluteUrl';
import { BookmarkFilledIcon, BookmarkWhiteFilledIcon } from '../../svg/Checkboxes/BookmarkIcons';
import StageBadge from '../../components/ui/StageBadge';
import { getRatingIcon } from '../../components/utility/RatingSelector';

// API function to fetch shortlisted candidates
const fetchShortlistedCandidates = async () => {
    const { data } = await axios.get('admin/candidate/shortlisted');
    return data;
};

const toggleShortlistStatus = async ({ candidateId, jobId, shortlisted }) => {
    const response = await axios.post(`/admin/candidate/${candidateId}/job/${jobId}/shortlist`, { shortlisted });
    return response?.data;
};

const Shortlisted = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const queryClient = useQueryClient();

    // Fetch shortlisted candidates
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['shortlistedCandidates'],
        queryFn: fetchShortlistedCandidates,
    });

    const shortlistMutation = useMutation({
        mutationFn: toggleShortlistStatus,
        onSuccess: () => {
            // Invalidate and refetch the shortlisted candidates query
            queryClient.invalidateQueries(['shortlistedCandidates']);
        },
        onError: (error) => {
            console.error("Error updating shortlist status:", error);
        }
    });

    // Updated handler function with the correct parameters
    const handleToggleShortlist = (e, candidateId, jobId) => {
        e.stopPropagation();
        // Since these are already shortlisted candidates, we want to unshortlist them
        shortlistMutation.mutate({
            candidateId,
            jobId,
            shortlisted: false // Set to false to remove from shortlist
        });
    };

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
                                                    <div
                                                        className="cursor-pointer hover:scale-110 transition-transform"
                                                        onClick={(e) => handleToggleShortlist(e, candidate._id, application.jobId)}
                                                    >
                                                        <BookmarkWhiteFilledIcon />
                                                    </div>
                                                </div>

                                                <p className="typography-small-p text-font-gray">{application.jobApplied}</p>

                                                <div className="flex items-center mt-2 text-xs text-font-gray">
                                                    {/* <span className="mr-2">{candidate.location || 'N/A'}</span> */}
                                                    {/* <span className="mr-2">•</span> */}
                                                    <span>{candidate.experience || 0} Years Exp.</span>
                                                </div>

                                                <div className="mt-2 flex justify-between items-center">
                                                    <StageBadge stage={application.currentStage} />
                                                    {(
                                                        <div>

                                                            <span className='cursor-pointer bg-[#2d2d2eae] min-w-10 min-h-10 top-2 right-2 rounded-full flex justify-center items-center'>
                                                                {getRatingIcon(application.rating)}
                                                            </span>

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
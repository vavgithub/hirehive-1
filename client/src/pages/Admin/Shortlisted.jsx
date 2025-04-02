import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from '../../api/axios';
import Header from '../../components/utility/Header';
import Table from '../../components/Table';
import { BookmarkWhiteFilledIcon } from '../../svg/Checkboxes/BookmarkIcons';
import Loader from '../../components/ui/Loader';
import StyledCard from '../../components/ui/StyledCard';
import { MoveActive } from '../../svg/Buttons/Move';
import { RejectActive } from '../../svg/Buttons/Reject';

const Shortlisted = () => {
    const queryClient = useQueryClient();

    // Fetch shortlisted candidates
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['shortlistedCandidates'],
        queryFn: () => axios.get('admin/candidate/shortlisted').then(res => res.data),
    });

    const shortlistMutation = useMutation({
        mutationFn: ({ candidateId, jobId, shortlisted }) =>
            axios.post(`/admin/candidate/${candidateId}/job/${jobId}/shortlist`, { shortlisted }),
        onSuccess: () => {
            queryClient.invalidateQueries(['shortlistedCandidates']);
        },
        onError: (error) => {
            console.error("Error updating shortlist status:", error);
        }
    });

    // Format data for the table
    const formatCandidatesForTable = () => {
        if (!data?.candidates) return [];
        
        return data.candidates.flatMap(candidate => 
          candidate.applications.map(application => ({
            _id: candidate._id,
            jobId: application.jobId,
            firstName: candidate.firstName,
            lastName: candidate.lastName,
            email: candidate.email,
            phone: candidate.phone,
            profilePictureUrl: candidate.profilePictureUrl,
            location: candidate.location,
            portfolio: candidate.portfolio,
            website: candidate.website,
            resumeUrl: candidate.resumeUrl,
            experience: candidate.experience,
            // Professional info
            currentCTC: application.currentCTC,
            expectedCTC: application.expectedCTC,
            hourlyRate: application.hourlyRate,
            // Stage info
            currentStage: application.currentStage,
            status: application.status,
            // Rating
            rating: application.rating,
            // Job details
            jobApplied: application.jobApplied,
            jobTitle: application.jobApplied, // Add jobTitle mapped from jobApplied for the table
            // Add stageStatuses for components that need them
            stageStatuses: application.stageStatuses || {},
            // Add any other needed fields
            hasGivenAssessment: candidate.hasGivenAssessment || false
          }))
        );
    };

    // Custom shortlist column
    const getShortlistColumn = () => [
        {
            field: 'shortlistAction',
            headerName: 'Action',
            
            align: 'left',
            headerAlign: 'left',
            disableColumnMenu: true,

            
            renderCell: (params) => (
                <div
                className='h-full flex items-center justify-start cursor-pointer'
                    onClick={(e) => {
                        e.stopPropagation();
                        shortlistMutation.mutate({
                            candidateId: params.row._id,
                            jobId: params.row.jobId,
                            shortlisted: false // Remove from shortlist
                        });
                    }}
                >
                    <RejectActive/> 
                </div>
            ),
        }
    ];

    if (isLoading) return <div className="flex justify-center items-center min-h-screen"><Loader /></div>;
    if (isError) return <div>Error: {error.message}</div>;

    const tableData = formatCandidatesForTable();
    
    // Debug: Log the formatted data to check structure
    console.log("Formatted table data:", tableData);

    return (
        <div className='w-full p-4'>
            <div className="container mx-auto">
                <Header HeaderText={"Future Gems"} />
                <StyledCard padding={2} backgroundColor={"bg-background-100"}>
                    {tableData.length > 0 ? (
                        <Table
                            readOnly={true}
                            readOnlyData={tableData}
                            additionalColumns={getShortlistColumn()}
                        />
                    ) : (
                        <div className="text-center py-8 bg-background-80 rounded-xl p-6">
                            <p className="typography-h2 text-font-gray">No star candidates found.</p>
                            <p className="typography-large-p mt-2">
                                Star candidates to see them here.
                            </p>
                        </div>
                    )}
                </StyledCard>
            </div>
        </div>
    );
};

export default Shortlisted;
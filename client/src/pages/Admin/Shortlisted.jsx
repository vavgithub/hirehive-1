import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from '../../api/axios';
import { showSuccessToast, showErrorToast } from '../../components/ui/Toast';
import Table from '../../components/tableUtilities/Table';
import Header from '../../components/utility/Header';
import StyledCard from '../../components/Cards/StyledCard';
import Loader from '../../components/Loaders/Loader';
import IconWrapper from '../../components/Cards/IconWrapper';
import { CircleX } from 'lucide-react';
import Container from '../../components/Cards/Container';

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
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries(['shortlistedCandidates']);

            // Show different toast messages based on action performed
            if (variables.shortlisted) {
                showSuccessToast("Added to Future Gems", "Candidate has been added to Future Gems");
            } else {
                showErrorToast("Removed", "Candidate has been removed from Future Gems");
            }
        },
        onError: (error) => {
            console.error("Error updating shortlist status:", error);
            showErrorToast("Error", "Failed to update Future Gems status");
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
                // Contractor filter support
                jobType: application.jobType || (application.hourlyRate > 0 ? "Contract" : "Full Time"),
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
            width: 120,
            align: 'center',
            headerAlign: 'center',
            disableColumnMenu: true,
            renderCell: (params) => (
                <div
                    className="flex cursor-pointer h-full items-center justify-center"
                    onClick={(e) => {
                        e.stopPropagation();
                        shortlistMutation.mutate({
                            candidateId: params.row._id,
                            jobId: params.row.jobId,
                            shortlisted: false // Remove from shortlist
                        });
                    }}
                >
                    <IconWrapper icon={CircleX} isErrorIcon size={0} customIconSize={5} />
                </div>
            ),
        }
    ];

    if (isLoading) return <div className="flex justify-center items-center min-h-screen"><Loader /></div>;
    if (isError) return <div>Error: {error.message}</div>;

    const tableData = formatCandidatesForTable();

    // Create dummy jobData to help with budget filtering for contractors
    const jobData = {
        employmentType: "Mixed" // This will allow both contract and full-time filtering
    };

    return (
        <Container>
            <Header HeaderText={"Future Gems"} />
            <StyledCard padding={2} backgroundColor={"bg-background-100"}>
                {tableData.length > 0 ? (
                    <Table
                        readOnly={true}
                        readOnlyData={tableData}
                        additionalColumns={getShortlistColumn()}
                        jobData={jobData} // Pass job data for employment type filtering
                        customNavigationPath="/admin/shortlisted/view-candidate" // Custom navigation path for shortlisted view
                    />
                ) : (
                    <div className="text-center py-8 bg-background-80 rounded-xl p-6">
                        <p className="typography-h2 text-font-gray">No shortlisted candidates found.</p>
                        <p className="typography-large-p mt-2">
                            Start shortlisting candidates to see them here.
                        </p>
                    </div>
                )}
            </StyledCard>
        </Container>
    );
};

export default Shortlisted;
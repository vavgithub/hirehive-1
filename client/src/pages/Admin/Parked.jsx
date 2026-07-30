import React, { useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { showSuccessToast, showErrorToast } from '../../components/ui/Toast';
import Table from '../../components/tableUtilities/Table';
import Header from '../../components/utility/Header';
import StyledCard from '../../components/Cards/StyledCard';
import IconWrapper from '../../components/Cards/IconWrapper';
import { RotateCcw } from 'lucide-react';
import Container from '../../components/Cards/Container';
import { useAuthContext } from '../../context/AuthProvider';
import { getRoute, ROUTE_KEY } from '../../config/permissions.config';
import LoaderModal from '../../components/Loaders/LoaderModal';
import { getParkedCandidates, unparkCandidateStatus } from '../../services/admin.candidate.service';
import useDebounce from '../../hooks/useDebounce';
import * as Sentry from '@sentry/react';

const Parked = () => {
    const { user , isLoading } = useAuthContext();
    const [location,setLocation] = useState(null);
    const [filters,setFilters] = useState({});
    const [page,setPage] = useState(1);
    const [pageSize,setPageSize] = useState(10);
    const [filterObj,setFilterObj] = useState({});
    const [sortFilterObj,setSortFilterObj] = useState({});
    const [sortModel,setSortModel] = useState([])
    const [search,setSearch] = useState("");
    const [showContractors, setShowContractors] = useState(false);

    const [debouncedQuery] = useDebounce(search,400);

    const [isFiltered, setIsFiltered] = useState(false);

    useEffect(() => {
    const cleanedFilters = Object.fromEntries(
        Object.entries(filters).filter(([key, value]) =>
        Array.isArray(value) ? value.length > 0 : !!value
        )
    );

    setFilterObj({ ...cleanedFilters, showContractors });

    const hasFiltersApplied = Object.values(cleanedFilters).some(value =>
        Array.isArray(value) ? value.length > 0 : !!value
    );

    setIsFiltered(hasFiltersApplied || showContractors);
    }, [filters, showContractors]);

    useEffect(()=>{
        setIsFiltered(prev => prev ? prev : debouncedQuery)
    },[debouncedQuery])

    useEffect(() => {
        const selectedSort = {}
        sortModel.map(model => {
            selectedSort[model.field] = model.sort
        })
        setSortFilterObj(selectedSort);
    }, [sortModel]);
    
    const queryClient = useQueryClient();

    const { data, isLoading : isCandidatesLoading , isError, error } = useQuery({
        queryKey: ['parkedCandidates',location,,page,pageSize,filterObj,debouncedQuery,sortFilterObj],
        queryFn: () => getParkedCandidates({companyId : user?.companyDetails?._id,...(location ? location : {}),page : page + 1 ,pageLimit : pageSize ,filter : filterObj ,search : debouncedQuery, sortFilters : sortFilterObj}),
        enabled : !!user?.companyDetails
    });

    const unparkMutation = useMutation({
        mutationFn: ({ candidateId, jobId }) =>
            unparkCandidateStatus({ candidateId, jobId }),
        onSuccess: () => {
            queryClient.invalidateQueries(['parkedCandidates']);
            queryClient.invalidateQueries(['candidates']);
            showSuccessToast("Returned to queue", "Candidate has been returned to the review queue");
        },
        onError: (error) => {
            console.error("Error returning candidate to queue:", error);
            showErrorToast("Error", "Failed to return candidate to queue");
        }
    });

    const formatCandidatesForTable = (candidates) => {
        if (!candidates) return [];

        return candidates.flatMap(candidate =>
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
                currentCTC: application.currentCTC,
                expectedCTC: application.expectedCTC,
                hourlyRate: application.hourlyRate,
                currentStage: application.currentStage,
                status: application.status,
                rating: application.rating,
                jobApplied: application.jobApplied,
                jobTitle: application.jobApplied,
                jobType: application.jobType || (application.hourlyRate > 0 ? "Contract" : "Full Time"),
                stageStatuses: application.stageStatuses || {},
                hasGivenAssessment: candidate.hasGivenAssessment || false,
                parkedReason: application.parkedReason,
                parkedNote: application.parkedNote,
                parkedAt: application.parkedAt,
                parkedBy: application.parkedBy,
                parkedByName: application.parkedByName,
            }))
        );
    };

    const handleReturnToQueueClick = (candidate) => {
        unparkMutation.mutate({
            candidateId: candidate._id,
            jobId: candidate.jobId,
        });
    };

    const getParkedColumn = () => [
        {
            field: 'parkedReason',
            headerName: 'Reason',
            width: 220,
            sortable: false,
            align: 'center',
            headerAlign: 'center',
            disableColumnMenu: true,
            renderCell: (params) => (
                <p className='w-full overflow-hidden whitespace-nowrap text-ellipsis'>{params.value}</p>
            ),
        },
        {
            field: 'parkedAction',
            headerName: 'Action',
            width: 120,
            sortable: false,
            align: 'center',
            headerAlign: 'center',
            disableColumnMenu: true,
            renderCell: (params) => (
                <div
                    className="flex cursor-pointer h-full items-center justify-center"
                    onClick={(e) => {
                        e.stopPropagation();
                        handleReturnToQueueClick(params.row);
                    }}
                    title="Return to queue"
                >
                    <IconWrapper icon={RotateCcw} size={0} customIconSize={5} />
                </div>
            ),
        }
    ];

    if (isError) return <div>Error: {error.message}</div>;

    const tableData = formatCandidatesForTable(data?.candidates);

    const getParkedCandidatesExportData = async () => {
        try {
            const response = await getParkedCandidates({companyId : user?.companyDetails?._id,...(location ? location : {}),filter : filterObj ,search : debouncedQuery, sortFilters : sortFilterObj});
            return formatCandidatesForTable(response?.candidates)
        } catch (error) {
            Sentry.captureException(error, {
              tags: { file: "Parked.jsx", action: "getParkedCandidatesExportData", role: "admin" },
              extra: { response: error?.response?.data, message: error?.message },
            });
            console.log("Export data error :",error)
        }
    }

    const jobData = {
        employmentType: "Mixed"
    };

    return (
        <Container>
            {(isLoading || isCandidatesLoading) && <LoaderModal />}
            <Header HeaderText={"Parked Candidates"} />
            <StyledCard padding={2} >
                {((data?.totalCount || 0) === 0 && !isFiltered) ? 
                (
                    <div className="text-center py-8 bg-background-100 rounded-xl p-6">
                        <h2 className="text-font-gray cursor-default">No parked candidates found.</h2>
                        <p className="typography-large-p mt-2 cursor-default">
                            Parked candidates will appear here.
                        </p>
                    </div>
                )
                : (
                    <Table
                        hasCheckBox={false}
                        readOnly={true}
                        addLocationFilter={setLocation}
                        currentPage={page} 
                        setCurrentPage={setPage}
                        pageSize={pageSize} 
                        setPageSize={setPageSize}
                        filters={filters}
                        setFilters={setFilters}
                        sortModel={sortModel}
                        setSortModel={setSortModel}
                        searchTerm={search}
                        setSearchTerm={setSearch}
                        showContractors={showContractors}
                        setShowContractors={setShowContractors}
                        readOnlyData={tableData}
                        getDataWithoutPagination={getParkedCandidatesExportData}
                        additionalColumns={getParkedColumn()}
                        totalCount={data?.totalCount}
                        jobData={jobData}
                        customNavigationPath={getRoute(user?.role,ROUTE_KEY.PARKED_VIEW_CANDIDATE)}
                    />
                )}
            </StyledCard>
        </Container>
    );
};

export default Parked;

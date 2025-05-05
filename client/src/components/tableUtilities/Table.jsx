import React, { useEffect, useLayoutEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';

import { useLocation, useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import AutoAssignModal from '../Modals/AutoAssignModal';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Modal from '../Modals/Modal';
import { ACTION_TYPES } from '../../utility/ActionTypes';
import ResumeViewer from '../utility/ResumeViewer';
import FilterForDataTable from '../Filters/FilterForDataTable';
import { exportToExcel } from '../../utility/exportToExcel';
import { showErrorToast, showSuccessToast } from '../ui/Toast';
import { useAuthContext } from '../../context/AuthProvider';
import { getCandidateScore } from '../Staging/StageAction';
import { getMaxScoreForStage } from '../../pages/Admin/ViewCandidateProfile';
import { usePreserver } from '../../context/StatePreserver';
import LoaderModal from '../Loaders/LoaderModal';
import MultiSelectBar from '../utility/MultiSelectBar';
import RatingSelector from '../MUIUtilities/RatingSelector';
import { getDefaultColumns, getReadOnlyColumns } from './GetColumns'
import AutoAssignWithBudget from './AutoAssignWithBudget';
import BudgetMenu from './BudgetMenu';
import { BudgetField } from '../FormUtilities/BudgetField';
import MuiCustomStylesForDataGrid from './MuiCustomStylesForDataGrid';
import IconWrapper from '../Cards/IconWrapper';
import { Download } from 'lucide-react';
import TickCheckbox from '../Checkboxes/TickCheckbox';

const Table = ({
  jobId, jobData,
  readOnly = false,
  readOnlyData = [],
  additionalColumns = [], // New prop for custom columns
  customNavigationPath = null // New prop for custom navigation path
}) => {

  //For getting routes
  const location = useLocation();

  //this is for setting up the context
  const { user } = useAuthContext();
  const role = user?.role
  const queryClient = useQueryClient();
  const [isAutoAssignModalOpen, setIsAutoAssignModalOpen] = useState(false);
  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false);
  const [budgetFilter, setBudgetFilter] = useState(() => {
    const savedFilter = localStorage.getItem(`budgetFilter_${jobId}`);
    return savedFilter ? JSON.parse(savedFilter) : { from: '', to: '' };
  });
  const [tempBudgetFilter, setTempBudgetFilter] = useState(budgetFilter);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isMoveModalOpen, setIsMoveModalOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  // ... other state declarations
  // ... other state declarations
  const [isDocumentViewerOpen, setIsDocumentViewerOpen] = useState(false);
  const [selectedDocumentUrl, setSelectedDocumentUrl] = useState('');

  // ..this are the table filters 
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const [budgetMenuAnchorEl, setBudgetMenuAnchorEl] = useState(null);

  const [showContractors, setShowContractors] = useState(false);

  const {
    query,
    setQuery,
    filters: preservedFilters,
    setFilters: setPreservedFilters,
    currentPage: preservedCurrentPage,
    setCurrentPage: setPreservedCurrentPage,
    pageSize: preservedPageSize,
    setPageSize: setPreservedPageSize,
  } = usePreserver(jobId || 'Candidates');

  useLayoutEffect(() => {
    setSearchTerm(query)
    setFilters(preservedFilters)
    setCurrentPage(preservedCurrentPage)
    setPageSize(preservedPageSize)
  }, [query, preservedFilters, preservedCurrentPage, preservedPageSize])


  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setQuery(event.target.value)
  };

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
    setPreservedFilters(newFilters)
  };

  const handleDocumentClick = (documentUrl) => {
    setSelectedDocumentUrl(documentUrl);
    setIsDocumentViewerOpen(true);
  };

  const { data: apiResponse, isLoading, isError, refetch } = useQuery({
    queryKey: ['candidates', jobId],
    queryFn: () => axios.get(`/admin/candidate/${jobId}`).then(res => res.data),
    enabled: !readOnly, // Only fetch data if not in readOnly mode
  });

  // Use readOnlyData if in readOnly mode, otherwise use data from API
  const rowsData = readOnly ? readOnlyData : (apiResponse?.candidates || []);

  // Apply budget filter
  const filteredRowsData = React.useMemo(() => {
    if (!rowsData) return [];
    if (budgetFilter.from === '' || budgetFilter.to === '') return rowsData;
    return rowsData?.filter(row => {
      const budgetValue = parseFloat((jobData?.employmentType === "Contract") ? (row.hourlyRate ?? 0) : row.expectedCTC);
      return budgetValue >= parseFloat(budgetFilter.from) && budgetValue <= parseFloat(budgetFilter.to);
    });
  }, [rowsData, budgetFilter]);

  const filteredAndSearchedRowsData = React.useMemo(() => {
    let result = filteredRowsData;

    // Apply search
    if (searchTerm) {
      result = result.filter(row =>
        `${row.firstName} ${row.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply filters
    if (filters.stage && filters.stage.length > 0) {
      result = result.filter(row => filters.stage.includes(row.currentStage));
    }
    if (filters.status && filters.status.length > 0) {
      result = result.filter(row => filters.status.includes(readOnly ? row?.status : row.stageStatuses[row.currentStage]?.status));
    }
    if (filters.experience) {
      const [min, max] = filters.experience.split('-').map(num => parseInt(num));
      result = result.filter(row => {
        const exp = parseInt(row.experience);
        return exp >= min && exp <= max;
      });
    }
    if (filters.rating && filters.rating.length > 0) {
      result = result.filter(row => filters.rating.includes(row.rating));
    }
    if (!readOnly && filters.assignee && filters.assignee.length > 0) {
      result = result.filter(row => filters.assignee.find(each => each._id === row.stageStatuses[row.currentStage]?.assignedTo));
    }
    if (filters?.assessment && filters.assessment?.length > 0) {
      let isCompleted = false;
      let isNotCompleted = false;
      filters.assessment.map(state => {
        state === "Completed" && (isCompleted = true)
        state === "Not Completed" && (isNotCompleted = true)
      })
      if (isCompleted && isNotCompleted) {
        result = result
      } else if (isCompleted) {
        result = result.filter(row => row.hasGivenAssessment === true && row.assessmentResponse );
      } else if (isNotCompleted) {
        result = result.filter(row => row.hasGivenAssessment === false && !row.assessmentResponse );
      }

      // Ensure unique results by _id
      const uniqueResults = new Map();
      result.forEach(row => uniqueResults.set(row._id, row));
      result = Array.from(uniqueResults.values());
    }
    if (filters?.score) {
      const [min, max] = filters?.score?.split(" - ");
      result = result?.filter((row, i) => {
        let totalScore = 0;
        Object.entries(row?.stageStatuses).forEach(([stage, stageData]) => {
          if (stage === "Screening") {
            totalScore += !stageData?.score ? 0 : ((stageData?.score?.Attitude ?? 0) +
              (stageData?.score?.Tech ?? 0) +
              (stageData?.score?.Communication ?? 0) +
              (stageData?.score?.UI ?? 0) +
              (stageData?.score?.UX ?? 0) +
              (stageData?.score?.Budget ?? 0)
            )
          } else {
            totalScore += stageData?.score ?? 0
          }
        })
        return (totalScore < parseInt(max) && totalScore > parseInt(min))
      })
    }

    if (filters?.["job Type"]?.length > 0) {
      result = result.filter(row => filters?.["job Type"].includes(row.jobType));
    }

    if (showContractors) {
      result = result?.filter(row => row.jobType === "Contract")
    }

    return result;
  }, [filteredRowsData, searchTerm, filters, showContractors]);

  const autoAssignMutation = useMutation({
    mutationFn: ({ jobId, reviewerIds, budgetMin, budgetMax }) =>
      axios.post('dr/auto-assign-portfolios', { jobId, reviewerIds, budgetMin, budgetMax }),
    onSuccess: async (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries(['candidates', jobId]);
      await refetch();
      // You might want to show a success message to the user here
      showSuccessToast("Auto Assign Portfolio Done")
    },
    onError: (error) => {
      // console.error('Auto-assign error:', error);
      // You might want to show an error message to the user here
      showErrorToast("Error", `${error.response?.data?.message}`)
    }
  });

  // Update assignee mutation
  const updateAssigneeMutation = useMutation({
    mutationFn: ({ candidateId, jobId, stage, assigneeId }) =>
      axios.put('dr/update-assignee', { candidateId, jobId, stage, assigneeId }),
    onSuccess: () => {
      queryClient.invalidateQueries(['candidates', jobId]);
    },
  });

  // Reject candidate mutation
  const rejectCandidateMutation = useMutation({
    mutationFn: ({ candidateId, jobId, rejectionReason, scheduledDate, scheduledTime }) =>
      axios.post('/hr/reject-candidate', { candidateId, jobId, rejectionReason, scheduledDate, scheduledTime }),
    onSuccess: () => {
      queryClient.invalidateQueries(['candidates', jobId]);
      setIsRejectModalOpen(false);
      setSelectedCandidate(null);
    },
  });

  // Move candidate mutation
  const moveCandidateMutation = useMutation({
    mutationFn: ({ candidateId, jobId, currentStage }) =>
      axios.post('/hr/move-candidate', { candidateId, jobId, currentStage }),
    onSuccess: () => {
      queryClient.invalidateQueries(['candidates', jobId]);
      setIsMoveModalOpen(false);
      setSelectedCandidate(null);
    },
  });

  // Update candidate rating mutation
  const updateCandidateRatingMutation = useMutation({
    mutationFn: ({ candidateId, jobId, rating }) =>
      axios.post('/hr/update-candidate-rating', { candidateId, jobId, rating }),
    onSuccess: () => {
      queryClient.invalidateQueries(['candidates', jobId]);
      handleRatingClose();
    },
  });

  const handleAutoAssign = async (selectedReviewers) => {
    await autoAssignMutation.mutateAsync({
      jobId,
      reviewerIds: selectedReviewers.map(reviewer => reviewer._id),
      budgetMin: parseFloat(budgetFilter.from) || 0,
      budgetMax: parseFloat(budgetFilter.to) || Infinity
    })
    setIsAutoAssignModalOpen(false);
  };

  const handleAssigneeChange = (candidateId, stage, newAssignee) => {
    updateAssigneeMutation.mutate({
      candidateId,
      jobId,
      stage,
      assigneeId: newAssignee._id
    });
  };

  const handleRejectConfirm = (candidate, rejectionReason, scheduledDate, scheduledTime) => {
    rejectCandidateMutation.mutate({
      candidateId: candidate._id,
      jobId,
      rejectionReason,
      scheduledDate,
      scheduledTime
    });
  };

  const handleMoveConfirm = () => {
    moveCandidateMutation.mutate({
      candidateId: selectedCandidate._id,
      jobId,
      currentStage: selectedCandidate.currentStage
    });
  };

  const handleRatingSelect = (rating) => {
    if (!selectedRow) return;
    updateCandidateRatingMutation.mutate({
      candidateId: selectedRow._id,
      jobId,
      rating
    });
  };

  const handleBudgetChange = (newBudget) => {
    setTempBudgetFilter(newBudget);
  };

  const handleApplyBudgetFilter = () => {
    if (!tempBudgetFilter?.from && !tempBudgetFilter?.to) {
      showErrorToast("Error", "Invalid budget values for Screen with Budget");
      return
    }
    setBudgetFilter(tempBudgetFilter);
    localStorage.setItem(`budgetFilter_${jobId}`, JSON.stringify(tempBudgetFilter));
    setIsBudgetModalOpen(false);
    showSuccessToast("Screened with budget", `Candidates successfully screened within the budget ${tempBudgetFilter.from}${jobData?.employmentType === "Contract" ? " INR/hr" : " LPA"} - ${tempBudgetFilter.to}${jobData?.employmentType === "Contract" ? " INR/hr" : " LPA"}`)
  };

  const clearBudgetFilter = () => {
    const clearedFilter = { from: '', to: '' };
    setBudgetFilter(clearedFilter);
    setTempBudgetFilter(clearedFilter);
    localStorage.removeItem(`budgetFilter_${jobId}`);
    showErrorToast("Budget Has Been Cleared")
  };


  //this are the handlers for rejecting candidates
  const canReject = (candidate) => {
    return Object.values(candidate.stageStatuses).some(stage => stage.status === "Reviewed");
  };

  const handleRejectClick = (candidate) => {
    if (canReject(candidate)) {
      setSelectedCandidate(candidate);
      setIsRejectModalOpen(true);
    }
  };


  //this are the handles for Moving to next stage
  const canMove = (candidate) => {
    return candidate.stageStatuses[candidate.currentStage]?.status === "Reviewed";
  };

  const handleMoveClick = (candidate) => {
    if (canMove(candidate)) {
      setSelectedCandidate(candidate);
      setIsMoveModalOpen(true);
    }
  };

  const handleRatingClick = (event, row) => {

    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handleRatingClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  //getting column configurations
  // Update the columns generation
  const columns = (() => {
    let baseColumns = readOnly ?
      getReadOnlyColumns(role, handleDocumentClick) :
      getDefaultColumns(role, canMove, canReject, handleAssigneeChange,
        handleMoveClick, handleRejectClick, handleRatingClick, handleDocumentClick , jobData?.status === "closed");

    // Insert additional columns after the first column
    if (additionalColumns.length > 0) {
      return [
        ...baseColumns.slice(0, 1), // Keep the first column (fullName)
        ...baseColumns.slice(1, 5),     // Add the rest of the columns
        ...additionalColumns,       // Add custom columns
        ...baseColumns.slice(6, 10),     // Add the rest of the columns
      ];
    }

    return baseColumns;
  })();

  const navigate = useNavigate();


  const handleRowClick = (params) => {
    // Save the current window scroll position before navigation
    if (location.pathname === '/admin/candidates' || location.pathname === '/hiring-manager/candidates') {
      sessionStorage.setItem('candidates_scroll_position', window.scrollY);
    } else {
      sessionStorage.setItem('job_candidates_scroll_position', document.getElementById('adminContainer')?.scrollTop || 0);
    }

    // Use custom navigation path if provided
    if (customNavigationPath) {
      const targetJobId = readOnly ? params.row.jobId : jobId;
      navigate(`${customNavigationPath}/${params.row._id}/${targetJobId}`, { replace: true });
      return;
    }

    // Default navigation logic
    if (role === "Hiring Manager") {

      const baseUrl = readOnly
        ? "/hiring-manager/candidates/view-candidate"
        : "/hiring-manager/jobs/view-candidate";
      navigate(`${baseUrl}/${params?.row?._id}/${readOnly ? params.row.jobId : jobId}`);
    } else if (role === "Admin") {
      const baseUrl = readOnly
        ? "/admin/candidates/view-candidate"
        : "/admin/jobs/view-candidate";
      navigate(`${baseUrl}/${params?.row?._id}/${readOnly ? params.row.jobId : jobId}`);
    } else {
      navigate(`view-candidate/${params.row._id}/${readOnly ? params.row.jobId : jobId}`, { replace: true });
    }
  };

  const handleExport = () => {
    // Get today's date in DD-MM-YYYY format
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const today = `${day}-${month}-${year}`;

    // Create filename: JobName_Date_data.xlsx
    const fileName = `${today}_datasheet`;

    exportToExcel(filteredAndSearchedRowsData, fileName);
  };
  const handleBudgetButtonClick = (event) => {
    if (budgetFilter.from || budgetFilter.to) {
      setBudgetMenuAnchorEl(event.currentTarget);
    } else {
      setTempBudgetFilter(budgetFilter);
      setIsBudgetModalOpen(true);
    }
  };

  const [selectedRows, setSelectedRows] = useState([]);
  const [rowSelectionModel, setRowSelectionModel] = useState([]);

  const handleSelectionChange = (selectionModel) => {

    const candidateIds = [];
    const jobIds = [];
    setRowSelectionModel(selectionModel)
    selectionModel?.map(selectionData => {
      const [candidateId, jobId] = selectionData.split("_");
      candidateIds.push(candidateId);
      jobIds.push(jobId);
    })
    const selectedData = filteredAndSearchedRowsData.filter((row) => candidateIds.includes(row._id) && (row.jobId ? jobIds.includes(row.jobId) : true));
    setSelectedRows(selectedData)
  }

  const handleBudgetMenuClose = () => {
    setBudgetMenuAnchorEl(null);
  };

  const handleBudgetEdit = () => {
    handleBudgetMenuClose();
    setTempBudgetFilter(budgetFilter);
    setIsBudgetModalOpen(true);
  };

  const handleBudgetClear = () => {
    clearBudgetFilter();
    handleBudgetMenuClose();
  };



  return (
    <div className='w-full'>

      {autoAssignMutation.isPending ||
        rejectCandidateMutation.isPending ||
        moveCandidateMutation.isPending || isLoading && <LoaderModal />}

      <MuiCustomStylesForDataGrid />

      <div className='flex justify-between pb-4 gap-2'>

        {/* {here is the place to add the search bar ,  filter , export button } */}

        <div className='flex gap-4 items-center'>
          <input
            type="text"
            placeholder="Search by name or email"
            className='min-w-[300px]'
            value={searchTerm}
            onChange={handleSearch}
          />
          <FilterForDataTable onApplyFilters={handleApplyFilters} readOnly={readOnly} preservedFilters={preservedFilters} />
          <div className="cursor-pointer gap-2 flex  items-center typography-body hover:bg-background-60 hover:text-accent-100 rounded-xl p-2 text-font-gray" onClick={() => handleExport()}>
            <IconWrapper inheritColor={true} icon={Download} size={0} customIconSize={4} customStrokeWidth={5} />
            Export
          </div>

          {/* { readOnly && <div className="flex items-center gap-2 hover:bg-background-60 hover:text-accent-100 p-2 rounded-xl">
            <div className="relative">
              <input 
                type="checkbox" 
                id="typeCheck" 
                value={showContractors}
                onChange={(e)=>setShowContractors(e.target.checked)}
                className="appearance-none border border-background-80 mr-2 h-4 w-4  rounded-md bg-background-80 hover:border-grey-100 checked:bg-accent-100 checked:border-accent-100 peer"
              />
              
              <span className="absolute hidden  h-4 w-4 text-black-100 items-center justify-center text-black peer-checked:flex ">✔</span>
            </div>
            <label htmlFor="typeCheck" className="typography-body hover:text-accent-100 whitespace-nowrap text-font-gray cursor-pointer">
              Show Contractors Only
            </label>
          </div>} */}

          {readOnly && (
            <TickCheckbox
              id="typeCheck"
              checked={showContractors}
              onChange={(e) => setShowContractors(e.target.checked)}
              label="Show Contractors Only"
              className="flex items-center gap-2 hover:bg-background-60 hover:text-accent-100 p-2 rounded-xl"
            />
          )}

        </div>

        {!readOnly && (
          <AutoAssignWithBudget
            autoAssignMutation={autoAssignMutation}
            budgetFilter={budgetFilter}
            handleBudgetButtonClick={handleBudgetButtonClick}
            setIsAutoAssignModalOpen={setIsAutoAssignModalOpen}
          />)}
      </div>

      {(!readOnly && selectedRows?.length > 0 && jobData?.status !== "closed" ) && <MultiSelectBar selectedData={selectedRows} clearSelection={() => { setSelectedRows([]); setRowSelectionModel([]) }} jobId={jobId} />}

      <DataGrid
        rows={filteredAndSearchedRowsData}
        columns={columns}
        getRowId={(row) => `${row._id}_${row.jobId ?? jobId}`} // Create a unique ID for each row
        paginationModel={{ page: currentPage, pageSize: pageSize }}
        onPaginationModelChange={(paginationModel) => {
          const { page, pageSize } = paginationModel;
          setCurrentPage(page); // Update your state or perform actions for page change
          setPreservedCurrentPage(page)
          setPageSize(pageSize); // Update your state or perform actions for page size change
          setPreservedPageSize(pageSize)
        }}

        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? 'first-row' : 'second-row'
        }
        localeText={{ noRowsLabel: <p className='typography-body'>No Candidates</p> }}

        pageSizeOptions={[10, 20, 30, 40, 50]}
        checkboxSelection
        onRowSelectionModelChange={(newSelection) => handleSelectionChange(newSelection)} // Updates on selection change
        rowSelectionModel={rowSelectionModel}
        onRowClick={(params) => handleRowClick(params)}
      />

      {isDocumentViewerOpen && (
        <ResumeViewer
          documentUrl={selectedDocumentUrl}
          onClose={() => setIsDocumentViewerOpen(false)}
        />
      )}

      <AutoAssignModal
        open={isAutoAssignModalOpen}
        onClose={() => setIsAutoAssignModalOpen(false)}
        onAssign={handleAutoAssign}
        jobId={jobId}
        budgetFilter={budgetFilter}
      />

      <RatingSelector
        anchorEl={anchorEl}
        onSelectRating={handleRatingSelect}
        setAnchorEl={handleRatingClose}
      />

      <BudgetMenu
        budgetMenuAnchorEl={budgetMenuAnchorEl}
        handleBudgetMenuClose={handleBudgetMenuClose}
        handleBudgetEdit={handleBudgetEdit}
        handleBudgetClear={handleBudgetClear}
      />


      <Modal
        open={isBudgetModalOpen}
        onClose={() => setIsBudgetModalOpen(false)}
        actionType="BUDGET"
        customTitle="Screen with budget"
        customMessage="Enter the minimum and maximum budget. Only candidates within this budget range will be displayed."
        customConfirmLabel="Apply"
        onConfirm={handleApplyBudgetFilter}
      >
        <div className='mt-4 my-8'>
          <BudgetField
            value={tempBudgetFilter}
            onChange={handleBudgetChange}
            required
            employmentType={jobData?.employmentType}
          />
        </div>
      </Modal>

      <Modal
        open={isRejectModalOpen}
        onClose={() => setIsRejectModalOpen(false)}
        actionType={ACTION_TYPES.REJECT}
        onConfirm={handleRejectConfirm}
        item={selectedCandidate}
        candidateName={`${selectedCandidate?.firstName} ${selectedCandidate?.lastName}`}
        candidateScore={getCandidateScore(selectedCandidate?.stageStatuses)}
        maxScoreOfStage={getMaxScoreForStage(selectedCandidate?.currentStage)}
        jobTitle={"jobTitle"}
        companyName={"companyName"}
      />

      <Modal
        open={isMoveModalOpen}
        onClose={() => setIsMoveModalOpen(false)}
        actionType={ACTION_TYPES.MOVE}
        onConfirm={handleMoveConfirm}
        candidateName={`${selectedCandidate?.firstName} ${selectedCandidate?.lastName}`}
        currentStage={selectedCandidate?.currentStage}
      />
    </div>

  )

}

export default Table
import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { FaEdit, FaFile, FaFileAlt, FaGlobe, FaUser } from 'react-icons/fa';
import { Avatar, Menu, MenuItem } from '@mui/material';

import { Link, useNavigate } from 'react-router-dom';
import AssigneeSelector from './utility/AssigneeSelector';
import axios from '../api/axios';
import { Button } from './ui/Button';
import AutoAssignModal from './utility/AutoAssignModal';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import StatusBadge from './ui/StatusBadge';
import StageBadge from './ui/StageBadge';
import { Move, MoveActive } from '../svg/Buttons/Move';
import { Reject, RejectActive } from '../svg/Buttons/Reject';
import { GoodFit, MayBe, NotAGoodFit, Rating } from '../svg/Buttons/Rating';
import Budget from '../svg/Buttons/Budget';
import Modal from './Modal';
import { BudgetField } from './Form/FormFields';
import AutoAssign from '../svg/Buttons/AutoAssign';
import { ACTION_TYPES } from '../utility/ActionTypes';
import ResumeViewer from './utility/ResumeViewer';
import FilterForDataTable from './Filters/FilterForDataTable';
import { exportToExcel } from '../utility/exportToExcel';
import Export from '../svg/Buttons/Export';
import EditIcon from '../svg/KebabList/EditIcon';
import DeleteIcon from '../svg/KebabList/DeleteIcon';
import { showErrorToast, showSuccessToast } from './ui/Toast';
import { useAuthContext } from '../context/AuthProvider';
import WebsiteMainIcon from '../svg/WebsiteMainIcon';
import FileMainIcon from '../svg/FileMainIcon';
import ResumeIcon from '../svg/ResumeIcon';
import CustomToolTip from './utility/CustomToolTip';
import  { AssignmentIconStroke } from '../svg/AssignmentIcon';


const Table = ({ jobId, readOnly = false, readOnlyData = [] }) => {
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

  const [budgetMenuAnchorEl, setBudgetMenuAnchorEl] = useState(null);



  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
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

  // Extract candidates from the API response
  // const rowsData = apiResponse?.candidates || [];


  // Use readOnlyData if in readOnly mode, otherwise use data from API
  const rowsData = readOnly ? readOnlyData : (apiResponse?.candidates || []);



  // Apply budget filter
  const filteredRowsData = React.useMemo(() => {
    if (!rowsData) return [];
    if (budgetFilter.from === '' || budgetFilter.to === '') return rowsData;
    return rowsData?.filter(row => {
      const expectedCTC = parseFloat(row.expectedCTC);
      return expectedCTC >= parseFloat(budgetFilter.from) && expectedCTC <= parseFloat(budgetFilter.to);
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
      result = result.filter(row => filters.assignee.find(each=>each._id === row.stageStatuses[row.currentStage]?.assignedTo));
    }

    return result;
  }, [filteredRowsData, searchTerm, filters]);

  const autoAssignMutation = useMutation({
    mutationFn: ({ jobId, reviewerIds }) =>
      axios.post('dr/auto-assign-portfolios', { jobId, reviewerIds }),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries(['candidates', jobId]);
      refetch();
      // You might want to show a success message to the user here
    },
    onError: (error) => {
      console.error('Auto-assign error:', error);
      // You might want to show an error message to the user here
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
    mutationFn: ({ candidateId, jobId, rejectionReason }) =>
      axios.post('/hr/reject-candidate', { candidateId, jobId, rejectionReason }),
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
    try {
      const response = await axios.post('/dr/auto-assign-portfolios', {
        jobId,
        reviewerIds: selectedReviewers.map(reviewer => reviewer._id),
        budgetMin: parseFloat(budgetFilter.from) || 0,
        budgetMax: parseFloat(budgetFilter.to) || Infinity
      });

      if (response.status === 200) {
        await refetch();
        showSuccessToast("Auto Assign Portfolio Done")
      } else {
        console.error('Failed to assign portfolios');
      }
    } catch (error) {
      console.error('Error in auto-assigning portfolios:', error);
      showErrorToast(`${error.message}`)
    }
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

  const handleRejectConfirm = (candidate, rejectionReason) => {
    rejectCandidateMutation.mutate({
      candidateId: candidate._id,
      jobId,
      rejectionReason
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
    setBudgetFilter(tempBudgetFilter);
    localStorage.setItem(`budgetFilter_${jobId}`, JSON.stringify(tempBudgetFilter));
    setIsBudgetModalOpen(false);
    showSuccessToast("Screened with budget", `Candidates successfully screened within the budget ${tempBudgetFilter.from}LPA - ${tempBudgetFilter.to}LPA`)
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

  const getRatingIcon = (rating) => {
    switch (rating) {
      case 'Good Fit':
        return <GoodFit />;
      case 'Not A Good Fit':
        return <NotAGoodFit />;
      case 'May Be':
        return <MayBe />;
      default:
        return <Rating />;
    }
  };


  //this is for opening the portfolios in different tab
  const ensureAbsoluteUrl = (url) => {
    if (url && !url.startsWith('http://') && !url.startsWith('https://')) {
      return `https://${url}`;
    }
    return url;
  };


  const commonColumns = [
    {
      field: 'fullName',
      headerName: 'Full Name',
      width: 250,
      sortable: true,
      disableColumnMenu: true,
      valueGetter: (params, row) => {
        const name = `${row?.firstName || ''} ${row?.lastName || ''}`
        const hasGivenAssessment = row.hasGivenAssessment;
        return {
          name,
          hasGivenAssessment
        }
      },
      renderCell: (params) => (
        <div className="name-cell flex items-center gap-2 h-12">
          <Avatar src={"https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/694px-Unknown_person.jpg"} sx={{ width: 32, height: 32 }}/>
          <p className='flex items-center gap-2'>{params.value.name}
            {params.value.hasGivenAssessment && 
            <span>
                <AssignmentIconStroke  />
            </span>}
          </p>
          <div className="hover-icons h-full flex items-center"
            onClick={(event) => event.stopPropagation()}
          >
            {params.row.portfolio && (
              <a href={ensureAbsoluteUrl(params.row.portfolio)} target="_blank" rel="noopener noreferrer" className="icon-link">
                <CustomToolTip title={'Portfolio'} arrowed>
                  <FileMainIcon sizeClasses={'w-9 h-9'} />
                </CustomToolTip>
              </a>
            )}
            {params.row.website && (
              <a href={ensureAbsoluteUrl(params.row.website)} target="_blank" rel="noopener noreferrer" className="icon-link ">
                <CustomToolTip title={'Website'} arrowed>
                  <WebsiteMainIcon sizeClasses={'w-9 h-9'} />
                </CustomToolTip>
              </a>
            )}
            {params.row.resumeUrl && (
              <button onClick={() => handleDocumentClick(params.row.resumeUrl)} className="icon-link">
                <CustomToolTip title='Resume' arrowed>
                  <ResumeIcon sizeClasses={'w-9 h-9'}/>
                </CustomToolTip>
              </button>
            )}
          </div>
        </div>
      ),
    },
    {
      field: 'currentStage',
      headerName: 'Stage',
      width: 200,
      align:'left',
      headerAlign : 'left',
      disableColumnMenu: true,
      renderCell: (params) => (
        <div className='h-full flex items-center justify-start'>
          <StageBadge stage={params.value} />
        </div>
      )
    },
  ];

  const expAndCtcColumns = [
    ...(role === 'Hiring Manager' ? [
      {
        field: 'currentCTC',
        headerName: 'Current CTC',
        width: 130,
        align :'center',
        headerAlign : 'center',
        disableColumnMenu: true,
      }, 
      {
        field: 'expectedCTC',
        headerName: 'Expected CTC',
        width: 130,
        align :'center',
        headerAlign : 'center',
        disableColumnMenu: true,
      },
    ] : []), 
    {
      field: 'experience',
      headerName: "Experience",
      width: 130,
      align:'center',
      headerAlign : 'center',
      disableColumnMenu: true,
    },
  ]

  const infoColumns = [
    {
      field: 'email',
      headerName: 'Email',
      width: 220,
      disableColumnMenu: true,
      renderCell : (params) =>(
        <CustomToolTip title={params.value} arrowed size={2}>
          <p className='w-full font-outfit text-white overflow-hidden text-start whitespace-nowrap text-ellipsis'>{params.value}</p>
        </CustomToolTip>
      )
    },
    
    {
      field: 'phone',
      headerName: 'Phone',
      width: 130,
      disableColumnMenu: true,
    },
  ]

  const readOnlyColumns = [
    ...commonColumns,
    {
      field: 'status',
      headerName: 'Status',
      width: 200,
      align:'center',
      headerAlign : 'left',
      disableColumnMenu: true,
      renderCell: (params) => (
        <div className='h-full flex items-center justify-start'>
          <StatusBadge status={params.row.status} />
        </div>
      ),
    },
    ...expAndCtcColumns,
    {
      field: 'jobTitle',
      headerName: 'Applied For',
      width: 200,
      align:'center',
      headerAlign : 'center',
      disableColumnMenu: true,
      renderCell : (params) =>(
        <p className='w-full overflow-hidden whitespace-nowrap text-ellipsis'>{params.value}</p>
      )
    },
    ...infoColumns  
  ];

  const defaultColumns = [
    ...commonColumns,
    {
      field: 'status',
      headerName: 'Status',
      width: 180,
      disableColumnMenu: true,
      valueGetter: (value,row) =>{
        const currentStage = row.currentStage;
        const status = row.stageStatuses[currentStage]?.status || 'Unknown';
        return status;
      }, 
      renderCell: (params) => {
        const status = params.value
        return (
          <div className='h-full flex items-center'>
            <StatusBadge status={status} />
          </div>
        );
      },
    },
    {
      field: 'score',
      headerName: 'Score',
      headerAlign : "center",
      width: 120,
      disableColumnMenu: true,
      valueGetter: (value,row) =>{
        const currentStage = row.currentStage;
        let score = 0;
        if(currentStage === "Screening"){
          let attitudeScore = parseInt(row.stageStatuses[currentStage]?.score?.Attitude ?? 0);
          let communicationScore = parseInt(row.stageStatuses[currentStage]?.score?.Communication ?? 0);
          let uxScore = parseInt(row.stageStatuses[currentStage]?.score?.UX ?? 0);
          let uiScore = parseInt(row.stageStatuses[currentStage]?.score?.UI ?? 0);
          let techScore = parseInt(row.stageStatuses[currentStage]?.score?.Tech ?? 0);
          let budgetScore = parseInt(row.stageStatuses[currentStage]?.score?.Budget ?? 0);
          score = attitudeScore + communicationScore + uiScore + uxScore + techScore + budgetScore; 
        }else{
          score = row.stageStatuses[currentStage]?.score || 0;
        }
        
        return score;
      }, 
      renderCell: (params) => {
        const score = params.value
        return (
          <p className='text-center'>
            {score}
          </p>
        );
      },
    },
    {
      field: 'assignee',
      headerName: 'Assignee',
      width: 100,
      disableColumnMenu: true,
      valueGetter: (value,row) => {
        return row.stageStatuses[row.currentStage]?.assignedTo
      },
      renderCell: (params) => {
        const isReviewed = params?.row?.stageStatuses[params?.row?.currentStage]?.status === 'Reviewed';  
        return (
          <div className='flex items-center justify-center h-full'
            onClick={(event) => event.stopPropagation()}
          >
            <AssigneeSelector
              mode="icon"
              disabled={isReviewed}
              value={params.row.stageStatuses[params.row.currentStage]?.assignedTo}
              onChange={(newAssignee) => handleAssigneeChange(
                params.row._id,
                params.row.currentStage,
                newAssignee
              )}
              onSelect={() => { }}
            />
          </div>
        )
      },
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      disableColumnMenu: true,
      renderCell: (params) => (
        <div className='flex h-full items-center gap-2'
          onClick={(event) => event.stopPropagation()}
        >
          <button
            onClick={() => handleMoveClick(params.row)}
            disabled={!canMove(params.row)}
          >
            {canMove(params.row) ? <MoveActive /> : <Move />}
          </button>
          <button
            onClick={() => handleRejectClick(params.row)}
            disabled={!canReject(params.row)}
          >
            {canReject(params.row) ? <RejectActive /> : <Reject />}
          </button>
          <button onClick={(e) => handleRatingClick(e, params.row)}>
            {getRatingIcon(params.row.rating)}
          </button>
        </div>
      )
    },
    ...expAndCtcColumns,
    ...infoColumns  
  ];

  const columns = readOnly ? readOnlyColumns : defaultColumns;

  const navigate = useNavigate();


  const handleRowClick = (params) => {
    if (role === "Hiring Manager") {
      const baseUrl = readOnly 
        ? "/admin/candidates/view-candidate" 
        : "/admin/jobs/view-candidate";
      navigate(`${baseUrl}/${params?.row?._id}/${readOnly ? params.row.jobId : jobId}`);
    } else {
      navigate(`view-candidate/${params?.row?._id}/${readOnly ? params.row.jobId : jobId}`);
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
    if (budgetFilter.from && budgetFilter.to) {
      setBudgetMenuAnchorEl(event.currentTarget);
    } else {
      setTempBudgetFilter(budgetFilter);
      setIsBudgetModalOpen(true);
    }
  };

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


      <style>
        {`
    .MuiDataGrid-root .MuiDataGrid-columnHeader:focus,
    .MuiDataGrid-root .MuiDataGrid-cell:focus {
        outline: none !important;                      
        border: none !important
    
    }
    .MuiDataGrid-root {
        outline: none !important;                      
        border: none !important;                
    }
    
    .MuiDataGrid-columnHeaderRow {
        color:"red",
        font-style:"outfit"
    }    
    .MuiDataGrid-row .MuiDataGrid-checkboxInput {
        visibility: hidden;
    }
    .css-13edya7-MuiDataGrid-root .MuiDataGrid-virtualScrollerContent .MuiDataGrid-row.Mui-selected {
        background: rgba(24, 233, 208, 0.2) !important;
    }
    .MuiDataGrid-row:hover .MuiDataGrid-checkboxInput,
    .MuiDataGrid-row .MuiDataGrid-checkboxInput.Mui-checked {
        visibility: visible;
    }
    .MuiDataGrid-columnHeaders .MuiDataGrid-checkboxInput {
        visibility: visible !important;
    }
    .name-cell {
        display: flex;
        align-items: center;
        width: 100%;
    }
    .hover-icons {
        display: none;
        margin-left: auto;
    }
    .Mui-selected .name-cell p{
        color:rgb(24, 233, 208);
    }
    .name-cell:hover  p{
        width:20%;
        white-space:nowrap;
        overflow:hidden !important;
        text-overflow:ellipsis !important;
        color:rgb(24, 233, 208);
    }
    .name-cell:hover .hover-icons {
        width:80%;
        display: flex;
    }
    .icon-link {
        margin-left: 8px;
        color: #666;
        transition: color 0.3s;
        display : flex;
        justify-content : "center",
        align-items : "center"
    }
    .icon-link:hover {
        color: #000;
    }
 
    .icon {
        font-size: 1.2rem;
    }  

          .MuiDataGrid-root .MuiDataGrid-cell {
            overflow: visible !important;
          }
          .MuiDataGrid-root .MuiDataGrid-row {
            z-index: 1;
            cursor: pointer
          }
          .MuiDataGrid-root .MuiDataGrid-row:hover {
            z-index: 2;
          }
          .MuiDataGrid-main.css-3eek4p-MuiDataGrid-main {
          max-width:83vw;
          }
          .MuiDataGrid-scrollbar.MuiDataGrid-scrollbar--horizontal.css-1rtad1::-webkit-scrollbar {
            width: 5px;
            height: 5px;
          }

          /* Track */
          .MuiDataGrid-scrollbar.MuiDataGrid-scrollbar--horizontal.css-1rtad1::-webkit-scrollbar-track {
            border-radius: 5px;
            background: #1D1D1D; 
          }
          
          /* Handle */
          .MuiDataGrid-scrollbar.MuiDataGrid-scrollbar--horizontal.css-1rtad1::-webkit-scrollbar-thumb {
            background: #c1c1c1; 
            border-radius: 100px;
          }

          /* Handle on hover */
          .MuiDataGrid-scrollbar.MuiDataGrid-scrollbar--horizontal.css-1rtad1::-webkit-scrollbar-thumb:hover {
            background: #fff; 
          }
          .css-1oudwrl::after {
            display: none;
          }
          .css-tgsonj {
          border-top:none;
          }

    `}
      </style>

      <div className='flex justify-between py-4 gap-2'>

        {/* {here is the place to add the search bar ,  filter , export button } */}

        <div className='flex gap-4 items-center'>
          <input
            type="text"
            placeholder="Search by name or email"
            className='min-w-[300px]'
            value={searchTerm}
            onChange={handleSearch}
          />
          <FilterForDataTable onApplyFilters={handleApplyFilters} readOnly={readOnly} />
          <div className='flex items-center cursor-pointer gap-2 text-font-gray hover:bg-background-60 hover:text-accent-100 rounded-xl typography-body h-12 p-3' onClick={() => handleExport()}>
            <Export />
            Export
          </div>
        </div>

        {!readOnly && (<div className='flex gap-4'>

          <div className={`${budgetFilter.from && budgetFilter.to ? "" : "hidden"}`}>
            <Button
              icon={AutoAssign}
              variant="primary"
              onClick={() => setIsAutoAssignModalOpen(true)}
              disabled={autoAssignMutation.isLoading}
            >
              {(autoAssignMutation.isLoading ? 'Auto-Assigning...' : 'Auto-Assign Portfolio')}
            </Button>
          </div>
          <div className={`${budgetFilter.from && budgetFilter.to ? "auto" : ""}`}>

            <Button
              variant={budgetFilter.from && budgetFilter.to ? "icon" : "primary"}
              icon={Budget}
              // onClick={() => {
              //   setTempBudgetFilter(budgetFilter);
              //   setIsBudgetModalOpen(true);
              // }}
              onClick={handleBudgetButtonClick}
            >
              {budgetFilter.from && budgetFilter.to ? '' : 'Screen With Budget'}
            </Button>

          </div>
        </div>)}
      </div>

      <DataGrid
        rows={filteredAndSearchedRowsData}
        columns={columns}
        getRowId={(row) => `${row._id}_${row.jobId}`} // Create a unique ID for each row
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        slotProps={{
          pagination : {
            SelectProps: {
              sx: {
                fontFamily: 'Outfit, sans-serif !important'
              },
              MenuProps: {
                sx :{
                  "& .MuiMenuItem-root": {
                    fontFamily: "Outfit, sans-serif !important"
                  }
                },
                PaperProps: {
                  sx: {
                    backgroundColor: '#0C0D0D', // Set background to yellow for the pagination select dropdown
                    color : "white",
                    fontFamily : 'Outfit, sans-serif !important',
                  },
                },
                
              },
            },
          }
        }}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? 'first-row' : 'second-row'
        }
        localeText={{ noRowsLabel: <p style={{fontFamily:"Outfit"}}>No Candidates</p> }}
        sx={{
          '& .MuiDataGrid-root': {
            borderRadius: '12px !important',
            fontFamily: 'Outfit, sans-serif !important',
            backgroundColor: 'black !important', // Ensure each header cell is transparent
          },
          '& .MuiDataGrid-topContainer': {
            borderRadius : "12px !important"
          },
          '& .css-yrdy0g-MuiDataGrid-columnHeaderRow' :{
            borderRadius: '12px !important',
          },
          '& .MuiTablePagination-root .MuiSelect-select.MuiTablePagination-select': {
            fontFamily: 'Outfit, sans-serif !important'
          },
          '& .MuiTablePagination-menuItem': {
            fontFamily: 'Outfit, sans-serif !important ', // Font family for menu items
          },
          '& .MuiDataGrid-cell': {
            color: 'white',
            borderBottom: 'none',
            borderTop: 'none',
            fontFamily: 'Outfit, sans-serif !important',
          },
          '& .MuiDataGrid-columnHeaders': {
            borderTop: 'none',
            borderBottom: 'none',
            color: 'gray',
            fontFamily: 'Outfit, sans-serif !important',
            backgroundColor: 'black !important', // Force transparent background
          },
          '& .MuiDataGrid-columnHeader': {
            backgroundColor: 'black !important', // Ensure each header cell is transparent
          },
          '& .MuiDataGrid-columnHeaderTitle': {
            color: 'gray', // Ensure the header text is gray
          },
          '& .MuiDataGrid-row': {
            borderBottom: 'none',
            borderTop: 'none',
          },
          '& .MuiDataGrid-columnSeparator': {
            display: 'none',
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: 'none',
            color: 'white',
            fontFamily: 'Outfit, sans-serif !important',
          },
          '& .MuiTablePagination-root': {
            color: 'white',
            fontFamily: 'Outfit, sans-serif !important',
          },
          '& .MuiTablePagination-toolbar': {
            color: 'white',
            fontFamily: 'Outfit, sans-serif !important',
          },
          '& .MuiDataGrid-filler': {
            backgroundColor: 'black',
          },
          '& .css-8yphpr':{
            height : "0px !important"
          },
          '& .MuiTablePagination-selectIcon': {
            color: 'white',
            fontFamily: 'Outfit, sans-serif !important',
          },
          '& .MuiTablePagination-selectLabel ' :{
            fontFamily :"Outfit",
          },
          '& .MuiTablePagination-select ' :{
            fontFamily :"Outfit",
          },
          '& .MuiTablePagination-displayedRows' :{
            fontFamily :"Outfit",
          },
          '& .MuiSvgIcon-root': {
            color:"white"
          },
          '& .Mui-selected .MuiSvgIcon-root': {
            color: 'rgb(24, 233, 208)',
          },
          '& .first-row': {
            borderRadius:2,
            backgroundColor: 'rgba(18, 19, 20, 1)',
            '&:hover': {
              backgroundColor: '#232425',
            },
          },
          '& .second-row': {
            borderRadius:2,
            backgroundColor: 'rgba(12, 13, 13, 1)',
            '&:hover': {
              backgroundColor: '#232425',
            },
          },
          borderRadius: "12px",
          backgroundColor: 'black',
          '& .MuiDataGrid-virtualScroller': {
            backgroundColor: 'transparent ' , // Ensure the background behind rows is also transparent
            borderRadius: '12px !important',
          },
          '& .MuiDataGrid-scrollbarFiller' :{
            minWidth: "0px !important"
          },
          '& .MuiDataGrid-scrollbar' :{
              display: "none",
              background : "transparent"
          },
          '& .MuiDataGrid-overlayWrapper':{
            height:"3rem",
          },
          '& .MuiDataGrid-overlay':{
            color: 'white',
            backgroundColor : 'rgba(12, 13, 13, 1)'
          },
        }}
        pageSizeOptions={[10,20,30,40,50]}
        checkboxSelection
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

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleRatingClose}
        sx={{
          "& .MuiList-root": {
            backgroundColor: 'rgba(12, 13, 13, 1)',
            color: "white",
            font: "Outfit"
          }
        }}
      >
        {['Good Fit', 'Not A Good Fit', 'May Be'].map((rating) => (
          <MenuItem key={rating} onClick={() => handleRatingSelect(rating)}

          >
            <div className="flex items-center gap-2">
              {getRatingIcon(rating)}
              <span>{rating}</span>
            </div>
          </MenuItem>
        ))}
      </Menu>



      <Menu
        anchorEl={budgetMenuAnchorEl}
        open={Boolean(budgetMenuAnchorEl)}
        onClose={handleBudgetMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        sx={{
          "& .MuiList-root": {
            backgroundColor: 'rgba(12, 13, 13, 1)',
            color: "white",
            font: "Outfit"
          },
          "& .MuiPaper-root": {
            marginTop: '8px',
            marginLeft: '-60px', // Adjust this value to move the menu more to the left
          }
        }}
      >
        <div className='flex items-center justify-start px-4 typograhy-body '>
          <EditIcon />
          <MenuItem
          sx={{
            fontFamily :"Outfit",
          }}
          onClick={handleBudgetEdit}>Edit</MenuItem>

        </div>
        <div className='flex items-center justify-start px-4 typograhy-body '>
          <DeleteIcon />
          <MenuItem 
          sx={{
            fontFamily :"Outfit",
          }}
          onClick={handleBudgetClear}>Clear</MenuItem>
        </div>
      </Menu>


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
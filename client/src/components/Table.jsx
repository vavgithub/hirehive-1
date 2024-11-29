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
  // console.log(rowsData);


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
    // console.log(params?.row?.rating);
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
      sortable: false,
      valueGetter: (params, row) => `${row?.firstName || ''} ${row?.lastName || ''}`,
      renderCell: (params) => (
        <div className="name-cell flex items-center gap-2">
          <Avatar src={"https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/694px-Unknown_person.jpg"} sx={{ width: 32, height: 32 }}/>
          <p>{params.value}</p>
          <div className="hover-icons flex items-center"
            onClick={(event) => event.stopPropagation()}
          >
            {params.row.portfolio && (
              <a href={ensureAbsoluteUrl(params.row.portfolio)} target="_blank" rel="noopener noreferrer" className="icon-link">
                <FileMainIcon sizeClasses={'w-9 h-9'} />
              </a>
            )}
            {params.row.website && params.row.website !== params.row.portfolio && (
              <a href={ensureAbsoluteUrl(params.row.website)} target="_blank" rel="noopener noreferrer" className="icon-link ">
                <WebsiteMainIcon sizeClasses={'w-9 h-9'} />
              </a>
            )}
            {params.row.resumeUrl && (
              <button onClick={() => handleDocumentClick(params.row.resumeUrl)} className="icon-link">
                <ResumeIcon sizeClasses={'w-9 h-9'}/>
              </button>
            )}
          </div>
        </div>
      ),
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 220,
    },
    
    {
      field: 'phone',
      headerName: 'Phone',
      width: 130,
    },
    {
      field: 'experience',
      headerName: "Experience",
      width: 130,
      align:'center',
      headerAlign : 'center'
    },
    {
      field: 'currentStage',
      headerName: 'Stage',
      width: 190,
      renderCell: (params) => (
        <div className='h-full flex items-center'>
          <StageBadge stage={params.value} />
        </div>
      )
    },
  ];

  const readOnlyColumns = [
    ...commonColumns,
    {
      field: 'status',
      headerName: 'Status',
      width: 180,
      renderCell: (params) => (
        <div className='h-full flex items-center'>
          <StatusBadge status={params.row.status} />
        </div>
      ),
    },
    {
      field: 'jobTitle',
      headerName: 'Applied For',
      width: 200,
    },
    ...(role === 'Hiring Manager' ? [
      {
        field: 'expectedCTC',
        headerName: 'Expected CTC',
        width: 130,
        align :'center',
        headerAlign : 'center'
      }, 
    ] : []),   
  ];

  const defaultColumns = [
    ...commonColumns,
    {
      field: 'status',
      headerName: 'Status',
      width: 180,
      renderCell: (params) => {
        const currentStage = params.row.currentStage;
        const status = params.row.stageStatuses[currentStage]?.status || 'Unknown';
        return (
          <div className='h-full flex items-center'>
            <StatusBadge status={status} />
          </div>
        );
      },
    },
    {
      field: 'assignee',
      headerName: 'Assignee',
      width: 100,
      renderCell: (params) => (
        <div className='flex items-center justify-center h-full'
          onClick={(event) => event.stopPropagation()}
        >
          <AssigneeSelector
            mode="icon"
            value={params.row.stageStatuses[params.row.currentStage]?.assignedTo}
            onChange={(newAssignee) => handleAssigneeChange(
              params.row._id,
              params.row.currentStage,
              newAssignee
            )}
            onSelect={() => { }}
          />
        </div>
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
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
    }
  ];

  const columns = readOnly ? readOnlyColumns : defaultColumns;

  const navigate = useNavigate();

  //  const handleRowClick = (params) => {
  //     navigate(`/admin/jobs/view-candidate/${params.id}/${readOnly ? params.row.jobId : jobId}`)
  //   }

  // const handleRowClick = (params) => {
  //   if (role == "Hiring Manager") {
  //     console.log("main waala cliked up")
  //     navigate(`/admin/jobs/view-candidate/${params?.row?._id}/${readOnly ? params.row.jobId : jobId}`)
  //   } else {
  //     console.log("else waala cliked up")
  //     navigate(`view-candidate/${params?.row?._id}/${readOnly ? params.row.jobId : jobId}`)

  //   }
  // }

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
    exportToExcel(filteredAndSearchedRowsData, 'my_data');
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
    <div>


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
    .name-cell:hover p{
        width:20%;
        white-space:nowrap;
        overflow:hidden;
        text-overflow:ellipsis;
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
            value={searchTerm}
            onChange={handleSearch}
          />
          <FilterForDataTable onApplyFilters={handleApplyFilters} readOnly={readOnly} />
          <div className='flex items-center cursor-pointer gap-2 text-font-gray  typography-body' onClick={() => handleExport()}>
            <Export />
            Export
          </div>
        </div>

        {!readOnly && (<div className='flex gap-4'>

          <div className={`${budgetFilter.from && budgetFilter.to ? "w-[216px]" : "hidden"}`}>
            <Button
              icon={AutoAssign}
              variant="primary"
              onClick={() => setIsAutoAssignModalOpen(true)}
              disabled={autoAssignMutation.isLoading}
            >
              {(autoAssignMutation.isLoading ? 'Auto-Assigning...' : 'Auto-Assign Portfolio')}
            </Button>
          </div>
          <div className={`${budgetFilter.from && budgetFilter.to ? "auto" : "w-[216px]"}`}>

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
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? 'first-row' : 'second-row'
        }
        sx={{
          '& .MuiDataGrid-root': {
            border: '0px',
            fontFamily: 'Outfit, sans-serif',
            border: "none",
            borderBottom: "none",
            backgroundColor: 'black !important', // Ensure each header cell is transparent
          },
          '& .MuiDataGrid-cell': {
            color: 'white',
            borderBottom: 'none',
            borderTop: 'none',
            fontFamily: 'Outfit, sans-serif',
          },
          '& .MuiDataGrid-columnHeaders': {
            borderTop: 'none',
            borderBottom: 'none',
            color: 'gray',
            fontFamily: 'Outfit, sans-serif',
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
            fontFamily: 'Outfit, sans-serif',
          },
          '& .MuiTablePagination-root': {
            color: 'white',
            fontFamily: 'Outfit, sans-serif',
          },
          '& .MuiTablePagination-toolbar': {
            color: 'white',
          },
          '& .MuiDataGrid-filler': {
            backgroundColor: 'black',
          },
          '& .MuiTablePagination-selectIcon': {
            color: 'white',
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
          border: "none",
          backgroundColor: 'black',
          '& .MuiDataGrid-virtualScroller': {
            backgroundColor: 'transparent ' , // Ensure the background behind rows is also transparent
          },
        }}
        pageSizeOptions={[5, 10]}
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
        <div className='flex items-center justify-evenly px-4 typograhy-body '>
          <EditIcon />
          <MenuItem onClick={handleBudgetEdit}>Edit</MenuItem>

        </div>
        <div className='flex items-center justify-evenly px-4 typograhy-body '>
          <DeleteIcon />
          <MenuItem onClick={handleBudgetClear}>Clear</MenuItem>
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
        <BudgetField
          value={tempBudgetFilter}
          onChange={handleBudgetChange}
          required
        />
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
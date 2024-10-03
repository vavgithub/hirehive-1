import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { FaGlobe, FaUser } from 'react-icons/fa';
import { Menu, MenuItem } from '@mui/material';

import { Link } from 'react-router-dom';
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


const updateAssignee = async ({ candidateId, jobId, stage, assigneeId }) => {

  const response = await axios.put('dr/update-assignee', {
    candidateId,
    jobId,
    stage,
    assigneeId
  });
  return response.data;
};
const Table = ({ rowsData, jobId }) => {
  const [isAutoAssignModalOpen, setIsAutoAssignModalOpen] = useState(false);

  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false);
  const [budgetFilter, setBudgetFilter] = useState(() => {
    const savedFilter = localStorage.getItem(`budgetFilter_${jobId}`);
    return savedFilter ? JSON.parse(savedFilter) : { from: '', to: '' };
  });
  const [tempBudgetFilter, setTempBudgetFilter] = useState(budgetFilter);
  const [filteredRowsData, setFilteredRowsData] = useState(rowsData);


  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);

  // ... (previous state declarations)
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isMoveModalOpen, setIsMoveModalOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [openRatingDropdown, setOpenRatingDropdown] = useState(null);



  const queryClient = useQueryClient();

  // Query to fetch candidates
  // const { data: rowsData, isLoading, isError, error } = useQuery({
  //   queryKey: ['candidates', jobId],
  //   queryFn: () => axios.get(`/candidates/${jobId}`).then(res => res.data.candidates),
  // });

  const autoAssignMutation = useMutation({
    mutationFn: ({ jobId, reviewerIds }) =>
      axios.post('dr/auto-assign-portfolios', { jobId, reviewerIds }),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries(['candidates', jobId]);
      console.log('Auto-assign result:', data);
      refetch();
      // You might want to show a success message to the user here
    },
    onError: (error) => {
      console.error('Auto-assign error:', error);
      // You might want to show an error message to the user here
    }
  });

  const handleAutoAssign = (selectedReviewers) => {
    autoAssignMutation.mutate({
      jobId,
      reviewerIds: selectedReviewers.map(r => r._id)
    });
    setIsAutoAssignModalOpen(false);
  };


  const updateAssigneeMutation = useMutation({
    mutationFn: updateAssignee,
    onSuccess: () => {
      queryClient.invalidateQueries(['candidates', jobId]);
    },
  });

  const handleAssigneeChange = (candidateId, stage, newAssignee) => {
    updateAssigneeMutation.mutate({
      candidateId,
      jobId, // Use the jobId passed as prop
      stage,
      assigneeId: newAssignee._id
    });
  };

  useEffect(() => {
    if (rowsData) {
      console.log('Candidates Data:', rowsData);
      // Check the structure of the first candidate (if available)
      if (rowsData.length > 0) {
        console.log('First Candidate:', rowsData[0]);
        console.log('First Candidate stageStatuses:', rowsData[0].stageStatuses);
        console.log('First Candidate currentStage:', rowsData[0].currentStage);
      }
    }
  }, [rowsData]);


  //Below Code is for the functionality of Screen With Budget Filter
  useEffect(() => {
    applyBudgetFilter();
  }, [rowsData, budgetFilter]);

  const applyBudgetFilter = () => {
    if (budgetFilter.from !== '' && budgetFilter.to !== '') {
      const filtered = rowsData.filter(row => {
        const expectedCTC = parseFloat(row.expectedCTC);
        return expectedCTC >= parseFloat(budgetFilter.from) && expectedCTC <= parseFloat(budgetFilter.to);
      });
      setFilteredRowsData(filtered);
    } else {
      setFilteredRowsData(rowsData);
    }
  };

  const handleBudgetChange = (newBudget) => {
    setTempBudgetFilter(newBudget);
  };

  const handleApplyBudgetFilter = () => {
    setBudgetFilter(tempBudgetFilter);
    localStorage.setItem(`budgetFilter_${jobId}`, JSON.stringify(tempBudgetFilter));
    setIsBudgetModalOpen(false);
  };

  const clearBudgetFilter = () => {
    const clearedFilter = { from: '', to: '' };
    setBudgetFilter(clearedFilter);
    setTempBudgetFilter(clearedFilter);
    localStorage.removeItem(`budgetFilter_${jobId}`);
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
  const handleRejectConfirm = async (candidate, rejectionReason) => {
    try {
      await axios.post('/hr/reject-candidate', {
        candidateId: candidate._id,
        jobId,
        rejectionReason
      });
      // Update local state or refetch data
      // For example:
      // refetchCandidates();
      setIsRejectModalOpen(false);
      setSelectedCandidate(null);
      // You might want to show a success message here
      console.log('Candidate rejected with reason:', rejectionReason);
    } catch (error) {
      console.error('Error rejecting candidate:', error);
      // Handle error (e.g., show error message to user)
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

  const handleMoveConfirm = async () => {
    try {
      await axios.post('/hr/move-candidate', {
        candidateId: selectedCandidate._id,
        jobId,
        currentStage: selectedCandidate.currentStage
      });
      // Update local state or refetch data
      // refetchCandidates();
      setIsMoveModalOpen(false);
      setSelectedCandidate(null);
      // Show success message
    } catch (error) {
      console.error('Error moving candidate:', error);
      // Handle error (e.g., show error message to user)
    }
  };
  const handleRatingClick = (event, row) => {
    console.log('Rating clicked for row:', row);
    // console.log(params?.row?.rating);
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handleRatingClose = () => {
    console.log('Closing rating menu');
    setAnchorEl(null);
    setSelectedRow(null);
  };

  const handleRatingSelect = async (rating) => {
    console.log('Rating selected:', rating);
    if (!selectedRow) return;

    console.log(selectedRow);

    try {
      await axios.post('/hr/update-candidate-rating', {
        candidateId: selectedRow?._id,
        jobId,
        rating
      });
      console.log('Rating updated successfully');
      // Update local state or refetch data
      // For example:
      // refetchCandidates();
      handleRatingClose();
      // Show success message
    } catch (error) {
      console.error('Error updating candidate rating:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  const getRatingIcon = (rating) => {
    console.log('Getting icon for rating:', rating);
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



  const columns = [
    {
      field: 'fullName',
      headerName: 'Full Name',
      width: 250,
      sortable: false,
      valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
      renderCell: (params) => (
        <div className="name-cell flex items-center gap-2">
          <span>{params.value}</span>
          <div className="hover-icons flex">
            <Link to={`/portfolio/${params.row._id}`} target="_blank" className="icon-link">
              <FaUser className="icon" />
            </Link>
            <Link to={`/website/${params.row._id}`} target="_blank" className="icon-link">
              <FaGlobe className="icon" />
            </Link>
          </div>
        </div>
      ),
    },
    {
      field: 'experience',
      headerName: "Experience",
    },
    {
      field: 'expectedCTC',
      headerName: "Expected CTC",
    },
    {
      field: 'currentStage',
      headerName: 'Stage',
      width: 150,
      renderCell: (params) => (
        <div className='h-full flex items-center'>

          <StageBadge stage={params.value} />
        </div>
      )
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
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
        <div className='flex items-center justify-center h-full'>
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
        <div className='flex h-full items-center gap-2'>
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
          <button onClick={(e) => handleRatingClick(e, params?.row)}>
            {getRatingIcon(params?.row?.rating)}
          </button>
        </div>
      )
    }
  ];


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
    .name-cell:hover .hover-icons {
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
    `}
      </style>

      <div className='flex justify-end py-4 gap-2'>
        <div className='w-[216px] '>
          <Button
            icon={AutoAssign}
            variant="primary"
            onClick={() => setIsAutoAssignModalOpen(true)}
            disabled={autoAssignMutation.isLoading}
          >
            {autoAssignMutation.isLoading ? 'Auto-Assigning...' : 'Auto-Assign Portfolio'}
          </Button>
        </div>
        <div className={`${budgetFilter.from && budgetFilter.to ? "auto" : "w-[216px]"}`}>

          <Button
            variant={budgetFilter.from && budgetFilter.to ? "icon" : "primary"}
            icon={Budget}
            onClick={() => {
              setTempBudgetFilter(budgetFilter);
              setIsBudgetModalOpen(true);
            }}
          >
            {budgetFilter.from && budgetFilter.to ? '' : 'Screen With Budget'}
          </Button>

        </div>
      </div>

      <DataGrid
        rows={filteredRowsData}
        columns={columns}
        getRowId={(row) => row._id}
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
            color: 'white',
          },
          '& .first-row': {
            backgroundColor: 'rgba(18, 19, 20, 1)',
            '&:hover': {
              backgroundColor: 'rgba(32, 33, 34, 1)',
            },
          },
          '& .second-row': {
            backgroundColor: 'rgba(12, 13, 13, 1)',
            '&:hover': {
              backgroundColor: 'rgba(32, 33, 34, 1)',
            },
          },
          border: "none",
          backgroundColor: 'black',
          '& .MuiDataGrid-virtualScroller': {
            backgroundColor: 'transparent', // Ensure the background behind rows is also transparent
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        onRowClick={(params) => handleRowClick(params)}
        />

      <AutoAssignModal
        open={isAutoAssignModalOpen}
        onClose={() => setIsAutoAssignModalOpen(false)}
        onAssign={handleAutoAssign}
        />

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleRatingClose}
        sx={{
          "& .MuiList-root":{
            backgroundColor: 'rgba(12, 13, 13, 1)',
            color:"white",
            font:"Outfit"
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
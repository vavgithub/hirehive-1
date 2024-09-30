import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { FaGlobe, FaUser } from 'react-icons/fa';

import { Link } from 'react-router-dom';
import AssigneeSelector from './utility/AssigneeSelector';
import axios from '../api/axios';
import { Button } from './ui/Button';
import AutoAssignModal from './utility/AutoAssignModal';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import StatusBadge from './ui/StatusBadge';
import StageBadge from './ui/StageBadge';


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


  const columns = [
    {
      field: 'fullName',
      headerName: 'Full Name',
      width: 500,
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

      <div className='flex justify-end py-4'>
        <div className='w-[276px] '>
          <Button
            variant="primary"
            onClick={() => setIsAutoAssignModalOpen(true)}
            disabled={autoAssignMutation.isLoading}
          >
            {autoAssignMutation.isLoading ? 'Auto-Assigning...' : 'Auto-Assign Portfolio'}
          </Button>
        </div>
      </div>



      <DataGrid
        rows={rowsData}
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
          '& .MuiDataGrid-filler':{
            backgroundColor:'black',
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
    </div>

  )

}

export default Table
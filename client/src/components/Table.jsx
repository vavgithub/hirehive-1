import React, { useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { FaGlobe, FaUser } from 'react-icons/fa';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Link } from 'react-router-dom';
import AssigneeSelector from './utility/AssigneeSelector';
import axios from '../api/axios';


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
  const [rows, setRows] = useState(rowsData)

  const queryClient = useQueryClient();

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
      field: 'currentStage',
      headerName: 'Stage',
    },
    {
      field: 'assignee',
      headerName: 'Assignee',
      width: 100,
      renderCell: (params) => (
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
      <DataGrid
        rows={rows}
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
    </div>

  )

}

export default Table
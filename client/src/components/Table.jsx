import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { FaGlobe, FaStar, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import BasicSelect from './BasicSelect';
import Modal from './Modal';


const getStageOptions = (stage) => {
    switch (stage) {
        case 'Portfolio':
            return ['Not Assigned', 'Under Review', 'Reviewed', 'Cleared', 'Rejected'];
        case 'Screening':
            return ['Call Pending', 'Call Scheduled', 'Under Review', 'Reviewed', 'Cleared', 'No Show', 'Rejected'];
        case 'Design Task':
            return ['Sent', 'Not Assigned', 'Under Review', 'Reviewed', 'Cleared', 'Rejected', 'Not Submitted'];
        case 'Round 1':
            return ['Call Pending', 'Call Scheduled', 'Not Assigned', 'Reviewed', 'Cleared', 'No Show', 'Rejected'];
        case 'Round 2':
            return ['Call Pending', 'Call Scheduled', 'Not Assigned', 'Reviewed', 'Cleared', 'No Show', 'Rejected'];
        default:
            return ['N/A'];
    }
};

const stageStatusMap = {
    Portfolio: ['Not Assigned', 'Under Review', 'Reviewed', 'Cleared', 'Rejected'],
    Screening: ['Call Pending', 'Call Scheduled', 'Under Review', 'Reviewed', 'Cleared', 'No Show', 'Rejected'],
    DesignTask: ['Sent', 'Not Assigned', 'Under Review', 'Reviewed', 'Cleared', 'Rejected', 'Not Submitted'],
    Round1: ['Call Pending', 'Call Scheduled', 'Not Assigned', 'Reviewed', 'Cleared', 'No Show', 'Rejected'],
    Round2: ['Call Pending', 'Call Scheduled', 'Not Assigned', 'Reviewed', 'Cleared', 'No Show', 'Rejected'],
};

const nextStageMap = {
    "Portfolio": "Screening",
    "Screening": "Design Task",
    "Design Task": "Round 1",
    "Round 1": "Round 2",
    "Round 2": "Hired",
};

const Table = ({ rowsData, onUpdateCandidate }) => {
    const [rows, setRows] = useState(rowsData);
    const [openRejectModal, setOpenRejectModal] = useState(false);
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        setRows(rowsData);
    }, [rowsData]);

    const handleRowClick = (params) => {
        navigate(`/admin/view-candidate/${params.row._id}`);
    };

    const handleStageChange = async (id, newStage) => {
        const newStatus = getStageOptions(newStage)[0];
        const updatedRows = rows.map((row) =>
            row._id === id ? { ...row, stage: newStage, status: newStatus } : row
        );
        setRows(updatedRows);
        await onUpdateCandidate(id, { stage: newStage, status: newStatus });
    };

    const handleStatusChange = async (id, newStatus, stage) => {
        const updatedRows = rows.map((row) => {
            if (row._id === id) {
                let updatedRow = { ...row, status: newStatus };
                
                // If it's the Portfolio stage and status is changed to "Under Review", update the assignee
                if (stage === 'Portfolio' && newStatus === 'Under Review' && row.assignees.Portfolio === 'N/A') {
                    updatedRow.assignees = { ...row.assignees, Portfolio: 'Auto-assigned' };
                }
                
                return updatedRow;
            }
            return row;
        });
        setRows(updatedRows);
        
        const updates = { status: newStatus };
        if (stage === 'Portfolio' && newStatus === 'Under Review') {
            updates['assignees.Portfolio'] = 'Auto-assigned';
        }
        
        await onUpdateCandidate(id, updates);
    };
    const handleNextRoundClick = async (e, id, currentStage) => {
        e.stopPropagation();
        const nextStage = nextStageMap[currentStage];
        if (nextStage) {
            await handleStageChange(id, nextStage);
        }
    };

    const handleRejectClick = (e, candidate) => {
        e.stopPropagation();
        setSelectedCandidate(candidate);
        setOpenRejectModal(true);
    };

    const confirmReject = async () => {
        if (selectedCandidate) {
            await handleStatusChange(selectedCandidate._id, 'Rejected');
            setOpenRejectModal(false);
        }
    };


    const handleAssigneeChange = async (id, stage, newAssignee) => {
        const updatedRows = rows.map((row) => {
            if (row._id === id) {
                const assignees = { ...row.assignees, [stage]: newAssignee };
                let status = row.status;
                
                // If it's the Portfolio stage and an assignee is set, change status to "Under Review"
                if (stage === 'Portfolio' && newAssignee !== 'N/A') {
                    status = 'Under Review';
                }
                
                return { ...row, assignees, status };
            }
            return row;
        });
        setRows(updatedRows);
        
        // Update both assignee and status
        await onUpdateCandidate(id, { 
            [`assignees.${stage}`]: newAssignee,
            status: stage === 'Portfolio' && newAssignee !== 'N/A' ? 'Under Review' : undefined
        });
    };

    const columns = [
        {
            field: 'fullName',
            headerName: 'Full Name',
            width: 300,
            sortable: false,
            valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
            renderCell: (params) => (
                <div className="name-cell">
                    <span>{params.value}</span>
                    <div className="hover-icons">
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
            field: 'stage',
            headerName: 'Stage',
            width: 120,
            renderCell: (params) => (
                <BasicSelect
                    label="Stage"
                    value={params.value}
                    onChange={(e) => handleStageChange(params.row._id, e.target.value)}
                    list={["Portfolio", "Screening", "Design Task", "Round 1", "Round 2", "Hired"]}
                />
            ),
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 200,
            height:50,
            renderCell: (params) => {
                const list = getStageOptions(params.row.stage);
                return (
                    <BasicSelect
                        label="Status"
                        value={params.value}
                        onChange={(e) => handleStatusChange(params.row._id, e.target.value, params.row.stage)}
                        list={list}
                    />
                );
            },
        },
        {
            field: 'assignees',
            headerName: 'Assignee',
            width: 130,
            valueGetter: (params , row) => `${row?.assignees?.[row?.stage]}`
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 200,
            renderCell: (params) => (
                <div className='flex gap-2'>
                    <button className='text-red-600' onClick={(e) => handleRejectClick(e, params.row)}>Reject</button>
                    <button className='text-blue-500' onClick={(e) => handleNextRoundClick(e, params.row._id, params.row.stage)}>Next Round</button>
                    {/* <button className='text-blue-500' onClick={(e) => handleNextRoundClick(e, params.row._id, params.row.stage)}>Next Round</button> */}
                    {/* <FaStar
                className='cursor-pointer'
                style={{ color: getRatingColor(params.row.rating) }}
                onClick={(e) => handleRatingClick(e, params.row._id)}
            /> */}
                </div>
            ),
        },
    ];

    return (
        <div style={{ height: 400, width: '100%' }}>
            <style>
                {`
          .MuiDataGrid-root .MuiDataGrid-columnHeader:focus,
          .MuiDataGrid-root .MuiDataGrid-cell:focus {
            outline: none !important;
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
                pageSizeOptions={[5, 10]}
                checkboxSelection
                onRowClick={(params) => handleRowClick(params)}
            />
            <Modal
                open={openRejectModal}
                onClose={() => setOpenRejectModal(false)}
                action="reject"
                confirmAction={confirmReject}
            />
        </div>
    );
};

export default Table;

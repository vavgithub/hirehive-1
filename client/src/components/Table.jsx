import React, { useCallback, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { FaGlobe, FaStar, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import BasicSelect from './BasicSelect';
import Modal from './Modal';
import InputPopUpModalAutoSelect from './InputPopUpModalAutoSelect';
import FilterForDataTable from './FilterForDataTable';
import BudgetWithScreen from '../svg/BudgetWithScreen';
import InputPopUpModal from './InputPopUpModal';
import { exportToExcel } from '../utility/exportToExcel';
import { Button } from './ui/Button';
import Create from '../svg/Buttons/Create';
import Export from '../svg/Buttons/Export';

const stageStatusMap = {
    "Portfolio": ['Not Assigned', 'Under Review', 'Reviewed', 'Cleared', 'Rejected'],
    "Screening": ['Call Pending', 'Call Scheduled', 'Under Review', 'Reviewed', 'Cleared', 'No Show', 'Rejected'],
    "Design Task": ['Not Assigned', 'Sent', 'Under Review', 'Reviewed', 'Cleared', 'Rejected', 'Not Submitted'],
    "Round 1": ['Call Pending', 'Call Scheduled', 'Not Assigned', 'Reviewed', 'Cleared', 'No Show', 'Rejected'],
    "Round 2": ['Call Pending', 'Call Scheduled', 'Not Assigned', 'Reviewed', 'Cleared', 'No Show', 'Rejected'],
};

const nextStageMap = {
    "Portfolio": "Screening",
    "Screening": "Design Task",
    "Design Task": "Round 1",
    "Round 1": "Round 2",
    "Round 2": "Hired",
};

const allAssignees = ['John', 'Vevaar', 'Komael', 'Eshan', 'Sushmita', 'Jordyn'];




const Table = ({ rowsData, onUpdateCandidate }) => {
    const [rows, setRows] = useState(rowsData);
    const [filteredRows, setFilteredRows] = useState(rowsData);
    const [searchQuery, setSearchQuery] = useState('');
    const [budgetFilteredRows, setBudgetFilteredRows] = useState(rowsData);
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState('');

    const [openAssigneeModal, setOpenAssigneeModal] = useState(false);
    const [selectedAssignees, setSelectedAssignees] = useState([]);

    const [openRejectModal, setOpenRejectModal] = useState(false);

    const [filters, setFilters] = useState({
        stage: [],
        stageStatus: [],
        experience: '',
        rating: [],
        assignee: [],
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const jobID = localStorage.getItem('currentJobId');
    const [savedBudgetFilter, setSavedBudgetFilter] = useState(
        JSON.parse(localStorage.getItem(`budgetFilter_${jobID}`))
    );

    const [selectedValue1, setSelectedValue1] = useState(savedBudgetFilter ? savedBudgetFilter.min : '');
    const [selectedValue2, setSelectedValue2] = useState(savedBudgetFilter ? savedBudgetFilter.max : '');

    useEffect(() => {
        setRows(rowsData);
    }, [rowsData]);

    const handleConfirm = () => {
        if (selectedValue1 && selectedValue2) {
            const min = parseInt(selectedValue1);
            const max = parseInt(selectedValue2);
            const newBudgetFilteredRows = applyBudgetFilter(min, max);
            setFilteredRows(newBudgetFilteredRows);
            localStorage.setItem(`budgetFilter_${jobID}`, JSON.stringify({ min, max }));
        }
        setIsModalOpen(false);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleRowClick = (params) => {
        navigate(`/admin/jobs/view-candidate/${params.row._id}`);
    };

    const handleMultipleAssigneeChange = async () => {
        const updatedRows = rows.map((row) => {
            if (row.stage === 'Portfolio' && row.stageStatus.Portfolio.status === 'Not Assigned') {
                const randomAssignee = selectedAssignees[Math.floor(Math.random() * selectedAssignees.length)];
                return {
                    ...row,
                    stageStatus: {
                        ...row.stageStatus,
                        Portfolio: {
                            ...row.stageStatus.Portfolio,
                            status: 'Under Review',
                            assignee: randomAssignee
                        }
                    }
                };
            }
            return row;
        });

        setRows(updatedRows);
        setOpenAssigneeModal(false);

        const changedCandidates = updatedRows.filter(
            (row, index) => row.stageStatus.Portfolio.assignee !== rows[index].stageStatus.Portfolio.assignee
        );

        for (const candidate of changedCandidates) {
            await onUpdateCandidate(candidate._id, {
                'stageStatus.Portfolio.assignee': candidate.stageStatus.Portfolio.assignee,
                'stageStatus.Portfolio.status': 'Under Review'
            });
        }
    };

    const handleStageChange = async (id, newStage) => {
        try {
            const candidate = rowsData.find(row => row._id === id);
            if (!candidate) throw new Error('Candidate not found');

            const currentStatus = candidate.stageStatus[newStage]?.status || stageStatusMap[newStage][0];

            const updates = {
                stage: newStage,
                [`stageStatus.${newStage}.status`]: currentStatus
            };

            await onUpdateCandidate(id, updates);
        } catch (error) {
            console.error("Error updating candidate stage:", error);
        }
    };

    const handleStatusChange = async (id, newStatus, stage) => {
        try {
            const updates = { [`stageStatus.${stage}.status`]: newStatus };
            await onUpdateCandidate(id, updates);
        } catch (error) {
            console.error("Error updating candidate status:", error);
        }
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
            await handleStatusChange(selectedCandidate._id, 'Rejected', selectedCandidate.stage);
            setOpenRejectModal(false);
        }
    };

    const fields = [
        {
            type: 'select',
            label: 'Start Range',
            value: selectedValue1,
            onChange: (e) => setSelectedValue1(e.target.value),
            options: [
                { value: "", label: "Select Start Range" },
                { value: '1', label: '1 Lpa' },
                { value: '2', label: '2 Lpa' },
                { value: '3', label: '3 Lpa' },
                { value: '4', label: '4 Lpa' },
                { value: '5', label: '5 Lpa' },
            ],
        },
        {
            type: 'select',
            label: 'End Range',
            value: selectedValue2,
            onChange: (e) => setSelectedValue2(e.target.value),
            options: [
                { value: "", label: "Select Start Range" },
                { value: '1', label: '1 Lpa' },
                { value: '2', label: '2 Lpa' },
                { value: '3', label: '3 Lpa' },
                { value: '4', label: '4 Lpa' },
                { value: '5', label: '5 Lpa' },
                { value: '6', label: '6 Lpa' },
                { value: '7', label: '7 Lpa' },
                { value: '8', label: '8 lpa' }
            ],
        },
    ];

    const handleAssigneeChange = async (id, stage, newAssignee) => {
        const updatedRows = rows.map((row) => {
            if (row._id === id) {
                let stageStatus = { ...row.stageStatus };
                stageStatus[stage] = {
                    ...stageStatus[stage],
                    assignee: newAssignee,
                    status: stage === 'Portfolio' && newAssignee !== 'N/A' ? 'Under Review' : stageStatus[stage].status
                };

                return { ...row, stageStatus };
            }
            return row;
        });
        setRows(updatedRows);

        const updates = {
            [`stageStatus.${stage}.assignee`]: newAssignee,
            [`stageStatus.${stage}.status`]: stage === 'Portfolio' && newAssignee !== 'N/A' ? 'Under Review' : undefined
        };

        await onUpdateCandidate(id, updates);
    };

    const handleExport = () => {
        exportToExcel(budgetFilteredRows, 'my_data');
    };

    const applyBudgetFilter = useCallback((min, max) => {
        return rows.filter(row => row.budget >= min && row.budget <= max);
    }, [rows]);

    const applyFiltersAndSearch = useCallback((rowsToFilter) => {
        let newFilteredRows = [...rowsToFilter];

        if (searchQuery) {
            const lowercasedQuery = searchQuery.toLowerCase();
            newFilteredRows = newFilteredRows.filter(row =>
                `${row.firstName} ${row.lastName}`.toLowerCase().includes(lowercasedQuery)
            );
        }

        if (filters.stage.length > 0) {
            newFilteredRows = newFilteredRows.filter(row => filters.stage.includes(row.stage));
        }
        // if (filters.stageStatus.length > 0) {
        //     newFilteredRows = newFilteredRows.filter(row => 
        //         Object.values(row.stageStatus).some(status => filters.stageStatus.includes(status))
        //     );
        // }
        if (filters.experience) {
            const [min, max] = filters.experience.split('-').map(v => parseInt(v.trim()));
            newFilteredRows = newFilteredRows.filter(row => row.experience >= min && row.experience <= max);
        }
        if (filters.rating.length > 0) {
            newFilteredRows = newFilteredRows.filter(row => filters.rating.includes(row.rating));
        }
        if (filters.assignee.length > 0) {
            newFilteredRows = newFilteredRows.filter(row =>
                Object.values(row.assignees).some(assignee => filters.assignee.includes(assignee))
            );
        }

        setFilteredRows(newFilteredRows);
    }, [searchQuery, filters]);

    useEffect(() => {
        applyFiltersAndSearch(budgetFilteredRows);
    }, [applyFiltersAndSearch, budgetFilteredRows]);

    useEffect(() => {
        if (savedBudgetFilter) {
            const { min, max } = savedBudgetFilter;
            const newBudgetFilteredRows = applyBudgetFilter(min, max);
            setBudgetFilteredRows(newBudgetFilteredRows);
        } else {
            setBudgetFilteredRows(rows);
        }
    }, [savedBudgetFilter, applyBudgetFilter, rows]);

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
                    value={params.row.stage}
                    onChange={(e) => handleStageChange(params.row._id, e.target.value)}
                    list={Object.keys(stageStatusMap)}
                />
            ),
        },
        {
            field: 'stageStatus',
            headerName: 'Status',
            width: 200,
            renderCell: (params) => {
                const currentStage = params.row.stage;
                const currentStatus = params.row.stageStatus[currentStage]?.status || stageStatusMap[currentStage][0];
                return (
                    <BasicSelect
                        label="Status"
                        value={currentStatus}
                        onChange={(e) => handleStatusChange(params.row._id, e.target.value, currentStage)}
                        list={stageStatusMap[currentStage] || []}
                    />
                );
            },
        },
        {
            field: 'assignee',
            headerName: 'Assignee',
            width: 130,
            renderCell: (params) => {
                const currentStage = params.row.stage;
                const currentAssignee = params.row.stageStatus[currentStage]?.assignee || 'N/A';
                return (
                    <p>

                        {currentAssignee}
                    </p>

                );
            },
        },
        // {
        // field: 'assignees',
        // headerName: 'Assignee',
        // width: 130,
        // valueGetter: (params) => params.row.assignees[params.row.stage] || 'N/A'
        // },
        // {
        //     field: 'assignees',
        //     headerName: 'Assignee',
        //     width: 130,
        //     valueGetter: (params, row) => `${row?.assignees?.[row?.stage]}`
        // },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 200,
            renderCell: (params) => (
                <div className='flex gap-2'>
                    <button className='text-red-600' onClick={(e) => handleRejectClick(e, params.row)}>Reject</button>
                    <button className='text-blue-500' onClick={(e) => handleNextRoundClick(e, params.row._id, params.row.stage)}>Next Round</button>
                </div>
            ),
        },
    ];

    return (
        <div>
            <div className='flex justify-between m-4'>
                <div className='flex gap-4 items-center'>
                    <input
                        className="px-4 py-2 w-40 rounded "
                        placeholder="Search By Name"
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            applyFiltersAndSearch(budgetFilteredRows);
                        }}
                    />
                    <FilterForDataTable onApplyFilters={(newFilters) => {
                        setFilters(newFilters);
                        applyFiltersAndSearch(budgetFilteredRows);
                    }} />
                    <div className='flex cursor-pointer typography-body gap-2 text-font-gray' onClick={() => handleExport()}>
                        <Export /> Export
                    </div>
                    {/* <button className="bg-black text-white px-4 py-2 rounded" onClick={() => handleExport()}>Export</button> */}
                </div>

                <div className='flex gap-4'>

                    <div>
                        {savedBudgetFilter && (
                            <Button variant="primary" icon={Create} iconPosition="left" onClick={() => setOpenAssigneeModal(true)}>
                                Auto-assign portfolios
                            </Button>
                        )}
                    </div>

                    <div>
                        {savedBudgetFilter ? (
                            <Button variant="icon" onClick={() => setIsModalOpen(true)}></Button>
                        ) : (
                            <Button variant="primary" icon={Create} iconPosition="left" onClick={() => setIsModalOpen(true)} >
                                Budget With Screen
                            </Button>
                        )}
                    </div>

                </div>
            </div>

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
                `}
            </style>
            <DataGrid
                rows={filteredRows}
                columns={columns}
                getRowId={(row) => row._id}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                getRowClassName={(params) =>
                    params.indexRelativeToCurrentPage % 2 === 0 ? 'red-row' : 'blue-row'
                }
                sx={{
                    '& .MuiDataGrid-root': {
                        border: '0px'
                    },
                    '& .MuiDataGrid-cell': {
                        color: 'white',
                        borderBottom: 'none', // Remove the bottom border of the cells
                        borderTop: 'none'
                    },
                    '& .MuiDataGrid-columnHeaderRow': {
                        backgroundColor: 'red'
                    },
                    '& .MuiDataGrid-columnHeaders': {
                        borderTop: 'none',
                        borderBottom: 'none', // Remove the bottom border of the column headers
                    },
                    '& .MuiDataGrid-row': {
                        borderBottom: 'none', // Remove the bottom border of the rows
                        borderTop: 'none'
                    },
                    '& .MuiDataGrid-columnSeparator': {
                        display: 'none', // Remove the column separators
                    },
                    '& .MuiDataGrid-footerContainer': {
                        borderTop: 'none', // Remove the top border of the footer
                        color: 'white', // Set footer text color to white
                    },
                    '& .MuiTablePagination-root': {
                        color: 'white', // Set pagination text color to white
                    },
                    '& .MuiTablePagination-toolbar': {
                        color: 'white', // Set pagination toolbar text color to white
                    },
                    '& .MuiTablePagination-selectIcon': {
                        color: 'white', // Set pagination select icon color to white
                    },
                    '& .MuiSvgIcon-root': {
                        color: 'white', // Ensure all SVG icons are white
                    },
                    '& .red-row': {
                        backgroundColor: 'rgba(18, 19, 20, 1)',
                        '&:hover': {
                            backgroundColor: 'rgba(32, 33, 34, 1',
                        },
                    },
                    '& .blue-row': {
                        backgroundColor: 'rgba(12, 13, 13, 1)',
                        '&:hover': {
                            backgroundColor: 'rgba(32, 33, 34, 1',
                        },
                    },
                    backgroundColor: 'black', // Set the background color to black
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

            <InputPopUpModal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                confirmAction={handleConfirm}
                fields={fields}
                heading="Screen with Budget"
                para="Candidates will no longer be able to apply. Are you sure you want to close this job?"
                confirmButtonText="Apply Budget"
                cancelButtonText="Cancel"
            />

            <InputPopUpModalAutoSelect
                open={openAssigneeModal}
                onClose={() => setOpenAssigneeModal(false)}
                confirmAction={handleMultipleAssigneeChange}
                assignees={selectedAssignees}
                setAssignees={setSelectedAssignees}
                singleSelect={false}
                allAssignees={allAssignees}
                heading="Auto assign portfolios"
                para="Select the reviewers to assign portfolios to"
                confirmButtonText="Assign"
                cancelButtonText="Cancel"
            />
        </div>
    );
};

export default Table;
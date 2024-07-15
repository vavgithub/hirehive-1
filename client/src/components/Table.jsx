import { DataGrid } from '@mui/x-data-grid';
import React, { useCallback, useEffect, useState } from 'react';
import { FaGlobe, FaStar, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import BasicSelect from './BasicSelect';
import Modal from './Modal';
import InputPopUpModalAutoSelect from './InputPopUpModalAutoSelect';
import FilterForDataTable from './FilterForDataTable';
import BudgetWithScreen from '../svg/BudgetWithScreen';
import InputPopUpModal from './InputPopUpModal';
import { exportToExcel } from '../utility/exportToExcel';


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

const allAssignees = ['John', 'Vevaar', 'Komael', 'Eshan', 'Sushmita', 'Jordyn'];

const Table = ({ rowsData, onUpdateCandidate }) => {
    const [rows, setRows] = useState(rowsData);
    const [budgetFilteredRows, setBudgetFilteredRows] = useState(rowsData);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const navigate = useNavigate();

    //this is for the filtered Rows
    const [filteredRows, setFilteredRows] = useState(rowsData);
    const [searchTerm, setSearchTerm] = useState('');

    //this is the modal for auto assign portfolio
    const [openAssigneeModal, setOpenAssigneeModal] = useState(false);
    const [selectedAssignees, setSelectedAssignees] = useState([]);

    const [openRejectModal, setOpenRejectModal] = useState(false);


    const [filters, setFilters] = useState({
        stage: [],
        status: [],
        experience: '',
        rating: [],
        assignee: [],
    });



    const [isModalOpen, setIsModalOpen] = useState(false);
    const jobID = localStorage.getItem('currentJobId');
    const [savedBudgetFilter, setSavedBudgetFilter] = useState(
        JSON.parse(localStorage.getItem(`budgetFilter_${jobID}`))
    );
    // const savedBudgetFilter = JSON.parse(localStorage.getItem(`budgetFilter_${jobID}`));

    const [selectedValue1, setSelectedValue1] = useState(savedBudgetFilter ? savedBudgetFilter.min : '');
    const [selectedValue2, setSelectedValue2] = useState(savedBudgetFilter ? savedBudgetFilter.max : '');



    const handleConfirm = () => {
        console.log('Confirmed with selections:', selectedValue1, selectedValue2);

        if (selectedValue1 && selectedValue2) {
            const min = parseInt(selectedValue1);
            const max = parseInt(selectedValue2);
            const newBudgetFilteredRows = applyBudgetFilter(min, max);
            setFilteredRows(newBudgetFilteredRows);

            // Save to localStorage
            localStorage.setItem(`budgetFilter_${jobID}`, JSON.stringify({ min, max }));
        }
        setIsModalOpen(false);
    };


    useEffect(() => {
        const lowercasedFilter = searchTerm.toLowerCase();
        const filteredData = rows.filter(item => {
            return Object.keys(item).some(key =>
                item[key]?.toString().toLowerCase().includes(lowercasedFilter)
            );
        });
        setFilteredRows(filteredData);
    }, [searchTerm, rows]);


    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    useEffect(() => {
        setRows(rowsData);
    }, [rowsData]);

    const handleRowClick = (params) => {
        navigate(`/admin/view-candidate/${params.row._id}`);
    };

    const handleMultipleAssigneeChange = async () => {
        const updatedRows = rows.map((row) => {
            if (row.stage === 'Portfolio' && row.status === 'Not Assigned') {
                const randomAssignee = selectedAssignees[Math.floor(Math.random() * selectedAssignees.length)];
                return {
                    ...row,
                    assignees: { ...row.assignees, Portfolio: randomAssignee },
                    status: 'Under Review'
                };
            }
            return row;
        });

        setRows(updatedRows);
        setOpenAssigneeModal(false);

        // Update all changed candidates
        const changedCandidates = updatedRows.filter(
            (row, index) => row.assignees.Portfolio !== rows[index].assignees.Portfolio
        );

        for (const candidate of changedCandidates) {
            await onUpdateCandidate(candidate._id, {
                'assignees.Portfolio': candidate.assignees.Portfolio,
                status: 'Under Review'
            });
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

    //this is to handle Next Round Click
    const handleNextRoundClick = async (e, id, currentStage) => {
        e.stopPropagation();
        const nextStage = nextStageMap[currentStage];
        if (nextStage) {
            await handleStageChange(id, nextStage);
        }
    };


    //this is to handle the reject click
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

    const handleExport = () => {
        exportToExcel(budgetFilteredRows, 'my_data');
    };


    const applyBudgetFilter = useCallback((min, max) => {
        return rows.filter(row => row.budget >= min && row.budget <= max);
    }, [rows]);


    const applyFiltersAndSearch = useCallback((rowsToFilter) => {
        let newFilteredRows = [...rowsToFilter];

        // Apply search
        if (searchQuery) {
            const lowercasedQuery = searchQuery.toLowerCase();
            newFilteredRows = newFilteredRows.filter(row =>
                `${row.firstName} ${row.lastName}`.toLowerCase().includes(lowercasedQuery)
            );
        }

        // Apply filters
        if (filters.stage.length > 0) {
            newFilteredRows = newFilteredRows.filter(row => filters.stage.includes(row.stage));
        }
        if (filters.status.length > 0) {
            newFilteredRows = newFilteredRows.filter(row => filters.status.includes(row.status));
        }
        if (filters.experience) {
            const [min, max] = filters.experience.split('-').map(v => parseInt(v.trim()));
            newFilteredRows = newFilteredRows.filter(row => row.experience >= min && row.experience <= max);
        }
        if (filters.rating.length > 0) {
            newFilteredRows = newFilteredRows.filter(row => filters.rating.includes(row.rating));
        }
        if (filters.assignee.length > 0) {
            newFilteredRows = newFilteredRows.filter(row => filters.assignee.includes(row.assignee));
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
            height: 50,
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
            valueGetter: (params, row) => `${row?.assignees?.[row?.stage]}`
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
            <div className='flex justify-between m-4'>
                <div className='flex gap-4 h-12'>
                    <input
                        className="border border-gray-300 px-4 py-2 w-40 rounded mb-4"
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
                    <button className="bg-black text-white px-4 py-2 rounded" onClick={() => handleExport()}>Export</button>
                </div>



                <div>

                    {
                        savedBudgetFilter ? <button
                            onClick={() => setOpenAssigneeModal(true)}
                            className="mb-4 px-4 py-2 bg-black text-white rounded "
                        >
                            Assign Multiple Candidates
                        </button> : ""
                    }




                </div>

                <div>
                    {
                        savedBudgetFilter ? <button onClick={() => setIsModalOpen(true)}> <BudgetWithScreen /> </button> : <button className="bg-black text-white px-4 py-2 rounded" onClick={() => setIsModalOpen(true)}>
                            Budget With Screen
                        </button>
                    }
                </div>
            </div>


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
                rows={filteredRows}
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

            {/* this is for budget */}
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

            {/* this for the auto assingnne portfolio */}
            <InputPopUpModalAutoSelect
                open={openAssigneeModal}
                onClose={() => setOpenAssigneeModal(false)}
                confirmAction={handleMultipleAssigneeChange}
                assignees={selectedAssignees}
                setAssignees={setSelectedAssignees}
                allAssignees={allAssignees}
                heading="Assign Multiple Candidates"
                para="Select assignees for candidates in Portfolio stage with 'Not Assigned' status."
                confirmButtonText="Assign"
                cancelButtonText="Cancel"
            />
        </div>
    );
};

export default Table;

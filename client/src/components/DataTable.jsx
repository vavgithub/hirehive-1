import { useEffect, useRef, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import BasicSelect from './BasicSelect';
import { useNavigate } from 'react-router-dom';
import AppliedIcon from '../svg/AppliedIcon';
import Modal from './Modal';
import InputPopUpModal from './InputPopUpModal';
import FilterForDataTable from './FilterForDataTable';
import axios from 'axios';
import InputPopUpModalAutoSelect from './InputPopUpModalAutoSelect';

const getStageOptions = (stage) => {
  switch (stage) {
    case 'Portfolio':
      return ['Not Assigned', 'Under Review', 'Completed', 'Rejected'];
    case 'Screening':
      return ['Call Pending', 'Call Scheduled', 'Under Review', 'Completed', 'No Show', 'Rejected'];
    case 'Design Task':
      return ['Sent', 'Not Assigned', 'Under Review', 'Completed', 'Rejected', 'Not Submitted'];
    case 'Round 1':
      return ['Call Pending', 'Call Scheduled', 'Not Assigned', 'Completed', 'No Show', 'Rejected'];
    case 'Round 2':
      return ['Call Pending', 'Call Scheduled', 'Not Assigned', 'Completed', 'No Show', 'Rejected'];
    default:
      return ['N/A'];
  }
};

const stageStatusMap = {
  Portfolio: ['Not Assigned', 'Under Review', 'Completed', 'Rejected'],
  Screening: ['Call Pending', 'Call Scheduled', 'Under Review', 'Completed', 'No Show', 'Rejected'],
  DesignTask: ['Sent', 'Not Assigned', 'Under Review', 'Completed', 'Rejected', 'Not Submitted'],
  Round1: ['Call Pending', 'Call Scheduled', 'Not Assigned', 'Completed', 'No Show', 'Rejected'],
  Round2: ['Call Pending', 'Call Scheduled', 'Not Assigned', 'Completed', 'No Show', 'Rejected'],
};

const nextStageMap = {
  "Portfolio": "Screening",
  "Screening": "Design Task",
  "Design Task": "Round 1",
  "Round 1": "Round 2",
  "Round 2": "Hired",
};

const DataTable = ({ rowsData, onUpdateCandidate }) => {
  const [rows, setRows] = useState(rowsData);
  const [filteredRows, setFilteredRows] = useState(rowsData);
  const [searchQuery, setSearchQuery] = useState('');
  const [openRejectModal, setOpenRejectModal] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    stage: [],
    status: [],
    experience: '',
    rating: [],
    assignee: [],
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedValue1, setSelectedValue1] = useState('');
  const [selectedValue2, setSelectedValue2] = useState('');

  const handleConfirm = () => {
    console.log('Confirmed with selections:', selectedValue1, selectedValue2);
    setIsModalOpen(false);
  };


  const [isModalOpenPortfolio, setIsModalOpenPortfolio] = useState(false);
  // const [selectedAssignee, setselectedAssignee] = useState('');
  const [selectedAssignees, setSelectedAssignees] = useState([]);


  const handleConfirmAssignee = async () => {
    console.log('Confirmed with selections:', selectedAssignees);

    const numCandidates = rows.length;
    const numAssignees = selectedAssignees.length;

    // Create an array to hold the updated rows with distributed assignees
    let updatedRows = rows.map((row, index) => {
      const assignee = selectedAssignees[index % numAssignees];
      return { ...row, assignee: assignee };
    });

    try {
      // Send the updated rows to the server
      const response = await axios.patch('http://localhost:8008/api/v1/candidates/update-assignee', {
        candidates: updatedRows.map(row => ({ id: row._id, assignee: row.assignee }))
      });

      if (response.status === 200) {
        setRows(updatedRows);
        setFilteredRows(updatedRows);
        setIsModalOpenPortfolio(false);
      } else {
        console.error('Failed to update assignee');
      }
    } catch (error) {
      console.error('Error updating assignee:', error);
    }
  };

  const fields = [
    {
      type: 'select',
      label: 'Start Range',
      value: selectedValue1,
      onChange: (e) => setSelectedValue1(e.target.value),
      options: [
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
        { value: '1', label: '1 Lpa' },
        { value: '2', label: '2 Lpa' },
        { value: '3', label: '3 Lpa' },
        { value: '4', label: '4 Lpa' },
        { value: '5', label: '5 Lpa' },
      ],
    },
  ];

  const allAssignees = ['John', 'Vevaar', 'Komael'];

  const handleStageChange = async (id, newStage) => {
    const newStatus = getStageOptions(newStage)[0];
    const updatedRows = rows.map((row) =>
      row._id === id ? { ...row, stage: newStage, status: newStatus } : row
    );
    setRows(updatedRows);
    await onUpdateCandidate(id, { stage: newStage, status: newStatus });
  };

  const handleStatusChange = async (id, newStatus) => {
    const updatedRows = rows.map((row) =>
      row._id === id ? { ...row, status: newStatus } : row
    );
    setRows(updatedRows);
    await onUpdateCandidate(id, { status: newStatus });
  };

  const handleRowClick = (params) => {
    navigate(`/admin/view-candidate/${params.row._id}`);
  };

  const handleRejectClick = (e, candidate) => {
    e.stopPropagation();
    setSelectedCandidate(candidate);
    setOpenRejectModal(true);
  };

  const handleNextRoundClick = async (e, id, currentStage) => {
    e.stopPropagation();
    const nextStage = nextStageMap[currentStage];
    if (nextStage) {
      await handleStageChange(id, nextStage);
    }
  };

  const confirmReject = async () => {
    if (selectedCandidate) {
      await handleStatusChange(selectedCandidate._id, 'Rejected');
      setOpenRejectModal(false);
    }
  };

  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const newFilteredRows = rows.filter(row =>
      `${row.firstName} ${row.lastName}`.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredRows(newFilteredRows);
  }, [searchQuery, rows]);

  useEffect(() => {
    let newFilteredRows = [...rows];
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
  }, [filters, rows]);

  const columns = [
    {
      field: 'fullName',
      headerName: 'Full Name',
      width: 200,
      sortable: false,
      valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
      renderCell: (params) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span>{params.value}</span>
          <div style={{ visibility: 'hidden', marginLeft: 8 }} className="info-icon">
            <AppliedIcon />
          </div>
        </div>
      ),
    },
    {
      field: 'assignee', headerName: "Assignee", width: 130
    },
    , { field: 'budget', headerName: 'Budget', width: 130 },
    { field: 'experience', headerName: 'Experience', width: 130 },
    { field: 'age', headerName: 'Age', width: 90 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'phone', headerName: 'Phone', width: 200 },
    { field: 'latestScore', headerName: 'Latest Score', width: 130 },

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
      renderCell: (params) => {
        const list = getStageOptions(params.row.stage);
        return (
          <BasicSelect
            label="Status"
            value={params.value}
            onChange={(e) => handleStatusChange(params.row._id, e.target.value)}
            list={list}
          />
        );
      },
    },
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
        <div className='flex gap-4'>
          <input
            className="border border-gray-300 px-4 py-2 w-40 rounded mb-4"
            placeholder="Search By Name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FilterForDataTable onApplyFilters={setFilters} />
        </div>
        <div>
          <button className="bg-black text-white px-4 py-2 rounded" onClick={() => setIsModalOpen(true)}>Budget With Screen</button>
        </div>
        <div>
          <button className="bg-black text-white px-4 py-2 rounded" onClick={() => setIsModalOpenPortfolio(true)}>Auto Assign Portfolio</button>
        </div>
      </div>

      <div style={{ height: 400, width: '100%' }}>
        <style>
          {`
          .MuiDataGrid-row:hover .MuiDataGrid-checkboxInput {
            visibility: visible;
          }
          .MuiDataGrid-checkboxInput {
            visibility: hidden;
          }
          .MuiDataGrid-checkboxInput input:checked + .MuiSvgIcon-root {
            visibility: visible;
          }
          .MuiDataGrid-row:hover > div {
            visibility: visible;
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

        {/* this is input for budget screen */}
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

        {/* this is input for auto assign */}
        {/* <InputPopUpModal
          open={isModalOpenPortfolio}
          onClose={() => setIsModalOpenPortfolio(false)}
          confirmAction={handleConfirmAssignee}
          fields={fieldsAssignee}
          heading="Auto Assign Portfolio"
          para="Select The Reviewers To Assign Porfolios"
          confirmButtonText="Auto Assign Portfolio"
          cancelButtonText="Cancel"
        /> */}

          <InputPopUpModalAutoSelect
          open={isModalOpenPortfolio}
          onClose={() => setIsModalOpenPortfolio(false)}
          confirmAction={handleConfirmAssignee}
          assignees={selectedAssignees}
          setAssignees={setSelectedAssignees}
          allAssignees={allAssignees}
          heading="Auto Assign Portfolio"
          para="Select The Reviewers To Assign Portfolios"
          confirmButtonText="Auto Assign Portfolio"
          cancelButtonText="Cancel"
        />

        <Modal
          open={openRejectModal}
          onClose={() => setOpenRejectModal(false)}
          action="reject"
          confirmAction={confirmReject}
        />
      </div>
    </div>
  );
};

export default DataTable;




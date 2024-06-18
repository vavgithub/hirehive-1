import { useEffect, useRef, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import BasicSelect from './BasicSelect';
import { useNavigate } from 'react-router-dom';
import AppliedIcon from '../svg/AppliedIcon';
import Modal from './Modal';
import InputPopUpModal from './InputPopUpModal';

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
    ,{field:'budget' ,headerName: 'Budget', width: 130 },
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
          <Filter onApplyFilters={setFilters} />
        </div>
        <div>
          <button className="bg-black text-white px-4 py-2 rounded" onClick={() => setIsModalOpen(true)}>Budget With Screen</button>
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

const ExperienceFilter = ({ onApply }) => {
  const [minExperience, setMinExperience] = useState('');
  const [maxExperience, setMaxExperience] = useState('');

  const handleApply = () => {
    onApply(minExperience, maxExperience);
  };

  return (
    <div className="absolute left-44 p-2 bg-slate-800 rounded">
      <div className="flex space-x-4 mb-4">
        <div>
          <label className="text-white">Min Experience</label>
          <input
            type="number"
            value={minExperience}
            onChange={(e) => setMinExperience(e.target.value)}
            className="w-16 p-2 text-center text-white bg-slate-600 rounded"
          />
          <span className="text-white"> yr</span>
        </div>
        <div>
          <label className="text-white">Max Experience</label>
          <input
            type="number"
            value={maxExperience}
            onChange={(e) => setMaxExperience(e.target.value)}
            className="w-16 p-2 text-center text-white bg-slate-600 rounded"
          />
          <span className="text-white"> yr</span>
        </div>
      </div>
      <button
        onClick={handleApply}
        className="w-full p-2 text-white bg-blue-500 rounded"
      >
        Apply
      </button>
    </div>
  );
};

const Filter = ({ onApplyFilters }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const [selectedFilters, setSelectedFilters] = useState({
    stage: [],
    status: [],
    experience: '',
    rating: [],
    assignee: [],
  });

  const [showDropdown, setShowDropdown] = useState({
    stage: false,
    status: false,
    experience: false,
    budget: false,
    rating: false,
    assignee: false,
  });

  const stageStatusMap = {
    Portfolio: ['Not Assigned', 'Under Review', 'Completed', 'Rejected'],
    Screening:['Call Pending', 'Call Scheduled', 'Under Review', 'Completed', 'No Show', 'Rejected'],
    'Design Task' :['Sent', 'Not Assigned', 'Under Review', 'Completed', 'Rejected', 'Not Submitted'],
    'Round 1' :  ['Call Pending', 'Call Scheduled', 'Not Assigned', 'Completed', 'No Show', 'Rejected'],
    'Round 2' : ['Call Pending', 'Call Scheduled', 'Not Assigned', 'Completed', 'No Show', 'Rejected'],
  };

  const handleSelect = (category, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter((item) => item !== value)
        : [...prev[category], value],
    }));
  };

  const handleStageSelect = (value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      stage: prev.stage.includes(value)
        ? prev.stage.filter((item) => item !== value)
        : [...prev.stage, value],
      status: [],
    }));
  };

  const handleExperienceApply = (min, max) => {
    setSelectedFilters((prev) => ({
      ...prev,
      experience: `${min}-${max} yrs`
    }));
    setShowDropdown((prev) => ({
      ...prev,
      experience: false
    }));
  };

  const handleDropdown = (category) => {
    setShowDropdown({
      stage: false,
      status: false,
      experience: false,
      budget: false,
      rating: false,
      assignee: false,
      [category]: !showDropdown[category],
    });
  };

  const toggleMenu = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
    setShowDropdown({
      stage: false,
      status: false,
      experience: false,
      budget: false,
      rating: false,
      assignee: false,
    });
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const categories = {
    stage: ['Portfolio', 'Screening', 'Design Task', 'Round 1', 'Round 2', 'Hired'],
    status: selectedFilters.stage.length === 1 ? stageStatusMap[selectedFilters.stage[0]] : ['Rejected'],
    experience: [],
    rating: ['Good Fit', 'Not a Good Fit', 'May Be'],
    assignee: ['John Doe', 'Jane Smith'],
  };

  useEffect(() => {
    onApplyFilters(selectedFilters);
  }, [selectedFilters]);

  return (
    <div className='relative' ref={menuRef}>
      <button className="bg-black text-white px-4 py-2 rounded" onClick={(e) => toggleMenu(e)}>Filters</button>
      {
        isOpen && (
          <div className='absolute z-10 mt-2 w-max bg-slate-800 p-4 rounded'>
            {Object.keys(categories).map((category) => (
              <div key={category} className="mb-4">
                <div className="flex justify-between items-center cursor-pointer" onClick={() => handleDropdown(category)}>
                  <span className="text-white">{category.charAt(0).toUpperCase() + category.slice(1)}: {selectedFilters[category] || 'All'}</span>
                  <span className="text-white">{showDropdown[category] ? '>' : '>'}</span>
                </div>
                {showDropdown[category] && (
                  category === 'experience' ? (
                    <ExperienceFilter onApply={handleExperienceApply} />
                  ) : (
                    <div className="p-2 rounded absolute left-44 bg-slate-800 w-max">
                      {categories[category].map((item) => (
                        <label key={item} className="flex items-center text-white mb-2">
                          <input
                            type="checkbox"
                            checked={selectedFilters[category].includes(item)}
                            onChange={() => category === 'stage' ? handleStageSelect(item) : handleSelect(category, item)}
                            className="mr-2"
                          />
                          {item}
                        </label>
                      ))}
                    </div>
                  )
                )}
              </div>
            ))}
          </div>
        )
      }
    </div>
  );
};

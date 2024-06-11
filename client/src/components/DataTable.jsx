// import { useState } from 'react';
// import { DataGrid } from '@mui/x-data-grid';
// import BasicSelect from './BasicSelect';
// import { Navigate, useNavigate } from 'react-router-dom';
// import AppliedIcon from '../svg/AppliedIcon';

// const getStageOptions = (status) => {
//   switch (status) {
//     case 'Portfolio':
//       return ['Not Assigned', 'Under Review', 'Completed', 'Rejected'];
//     case 'Screening':
//       return ['Call Pending', 'Call Scheduled', 'Under Review', 'Completed', 'No Show', 'Rejected'];
//     case 'Design Task':
//       return ['Sent', 'Not Assigned', 'Under Review', 'Completed', 'Rejected', 'Not Submitted'];
//     case 'Round 1':
//       return ['Call Pending', 'Call Scheduled', 'Not Assigned', 'Completed', 'No Show', 'Rejected'];
//     case 'Round 2':
//       return ['Call Pending', 'Call Scheduled', 'Not Assigned', 'Completed', 'No Show', 'Rejected'];
//     default:
//       return ['N/A'];
//   }
// };

// const initialRows = [
//   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35, status: 'Hired', stage: 'N/A', experience: 4, latestScore: 4.5, email: 'jon@example.com', phone: '1234567890' },
//   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42, status: 'Portfolio', stage: 'Not Assigned', experience: 4, latestScore: 4.5, email: 'cersei@example.com', phone: '1234567890' },
//   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45, status: 'Screening', stage: 'Call Pending', experience: 4, latestScore: 4.5, email: 'jaime@example.com', phone: '1234567890' },
//   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16, status: 'Design Task', stage: 'Sent', experience: 4, latestScore: 4.5, email: 'arya@example.com', phone: '1234567890' },
//   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null, status: 'Portfolio', stage: 'Not Assigned', experience: 4, latestScore: 4.5, email: 'daenerys@example.com', phone: '1234567890' },
//   { id: 6, lastName: 'Melisandre', firstName: null, age: 150, status: 'Screening', stage: 'Call Pending', experience: 4, latestScore: 4.5, email: 'melisandre@example.com', phone: '1234567890' },
//   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44, status: 'Design Task', stage: 'Sent', experience: 4, latestScore: 4.5, email: 'ferrara@example.com', phone: '1234567890' },
//   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36, status: 'Hired', stage: 'N/A', experience: 4, latestScore: 4.5, email: 'rossini@example.com', phone: '1234567890' },
//   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65, status: 'Portfolio', stage: 'Not Assigned', experience: 4, latestScore: 4.5, email: 'harvey@example.com', phone: '1234567890' },
// ];

// const DataTable = ({ rowsData, columnsData }) => {
//   const [rows, setRows] = useState(rowsData);

//   const updateStatus = (id, newStatus) => {
//     const newStage = getStageOptions(newStatus)[0];
//     setRows((prevRows) =>
//       prevRows.map((row) =>
//         row.id === id ? { ...row, status: newStatus, stage: newStage } : row
//       )
//     );
//   };

//   const updateStage = (id, newStage) => {
//     setRows((prevRows) =>
//       prevRows.map((row) =>
//         row.id === id ? { ...row, stage: newStage } : row
//       )
//     );
//   };

//   const navigate = useNavigate();

//   const handleRowClick = (params) => {
//     navigate(`/candidate/${params.id}`);
//   }

//   const columns = [
//     {
//       field: 'fullName',
//       headerName: 'Full Name',
//       width: 200,
//       sortable: false,
//       valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
//       renderCell: (params) => (
//         <div style={{ display: 'flex', alignItems: 'center' }}>
//           <span>{params.value}</span>
//           <div style={{ visibility: 'hidden', marginLeft: 8, backgroundColor: "red" }} className="info-icon">
//             <AppliedIcon />
//           </div>

//         </div>
//       ),
//     },
//     { field: 'experience', headerName: 'Experience', width: 130 },
//     { field: 'age', headerName: 'Age', width: 90 },
//     { field: 'email', headerName: 'Email', width: 200},
//     { field: 'phone', headerName: 'Phone', width: 200},
//     { field: 'latestScore', headerName: 'Latest Score', width: 130 },
//     { field: 'firstName', headerName: 'First name', width: 130 },
//     { field: 'lastName', headerName: 'Last name', width: 130 },
//     {
//       field: 'status',
//       headerName: 'Status',
//       width: 120,
//       renderCell: (params) => (
//         <BasicSelect
//           label="Status"
//           value={params.value}
//           onChange={(e) => updateStatus(params.id, e.target.value)}
//           list={["Portfolio", "Screening", "Design Task", "Round 1", "Round 2", "Hired"]}
//         />
//       ),
//     },
//     {
//       field: 'stage',
//       headerName: 'Stage',
//       width: 200,
//       renderCell: (params) => {
//         const list = getStageOptions(params.row.status);
//         return (
//           <BasicSelect
//             label="Stage"
//             value={params.value}
//             onChange={(e) => updateStage(params.id, e.target.value)}
//             list={list}
//           />
//         );
//       },
//     },


//   ];

//   return (
//     <div style={{ height: 400, width: '100%' }}>
//       <style>
//         {`
//           .MuiDataGrid-row:hover .MuiDataGrid-checkboxInput {
//             visibility: visible;
//           }
//           .MuiDataGrid-checkboxInput {
//             visibility: hidden;
//           }
//           .MuiDataGrid-checkboxInput input:checked + .MuiSvgIcon-root {
//             visibility: visible;
//           }
//           .MuiDataGrid-row:hover > div {
//             visibility: visible;
//           }
//         `}
//       </style>
//       <DataGrid
//         rows={rows}
//         columns={columns || columnsData}
//         initialState={{
//           pagination: {
//             paginationModel: { page: 0, pageSize: 5 },
//           },
//         }}
//         pageSizeOptions={[5, 10]}
//         checkboxSelection
//         onRowClick={handleRowClick}
//       />
//     </div>
//   );
// };

// export default DataTable;


// DataTable.js

import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import BasicSelect from './BasicSelect';
import { useNavigate } from 'react-router-dom';
import AppliedIcon from '../svg/AppliedIcon';

const getStageOptions = (status) => {
  switch (status) {
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

const DataTable = ({ rowsData }) => {
  const [rows, setRows] = useState(rowsData);
  const navigate = useNavigate();

  const updateStatus = (id, newStatus) => {
    const newStage = getStageOptions(newStatus)[0];
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id ? { ...row, status: newStatus, stage: newStage } : row
      )
    );
  };

  const updateStage = (id, newStage) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id ? { ...row, stage: newStage } : row
      )
    );
  };

  const handleRowClick = (params) => {
    navigate(`/candidate/${params.id}`);
  };

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
    { field: 'experience', headerName: 'Experience', width: 130 },
    { field: 'age', headerName: 'Age', width: 90 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'phone', headerName: 'Phone', width: 200 },
    { field: 'latestScore', headerName: 'Latest Score', width: 130 },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => (
        <BasicSelect
          label="Status"
          value={params.value}
          onChange={(e) => updateStatus(params.id, e.target.value)}
          list={["Portfolio", "Screening", "Design Task", "Round 1", "Round 2", "Hired"]}
        />
      ),
    },
    {
      field: 'stage',
      headerName: 'Stage',
      width: 200,
      renderCell: (params) => {
        const list = getStageOptions(params.row.status);
        return (
          <BasicSelect
            label="Stage"
            value={params.value}
            onChange={(e) => updateStage(params.id, e.target.value)}
            list={list}
          />
        );
      },
    },
  ];

  return (
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
        rows={rows}
        columns={columns}
        getRowId={(row) => row._id} // Use the MongoDB _id as the id
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        onRowClick={handleRowClick}
      />
    </div>
  );
};

export default DataTable;

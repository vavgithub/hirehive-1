import React, { useState } from 'react'

const ReusableTable = ({ data, onStatusChange, onReject, onNextRound }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;

    // Calculate the currently displayed rows
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(data.length / rowsPerPage); i++) {
        pageNumbers.push(i);
    }

    // Adjusted status change handler
    const handleStatusChange = (index, newStatus) => {
        // Calculate the correct index in the entire dataset
        const absoluteIndex = indexOfFirstRow + index;
        onStatusChange(absoluteIndex, newStatus);
    };

    return (
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" className="py-3 px-6">Name</th>
                        <th scope="col" className="py-3 px-6">Applied for</th>
                        <th scope="col" className="py-3 px-6">Experience</th>
                        <th scope="col" className="py-3 px-6">Rating</th>
                        <th scope="col" className="py-3 px-6">Status</th>
                        <th scope="col" className="py-3 px-6">Assignee</th>                        
                        <th scope="col" className="py-3 px-6">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentRows.map((item, index) => (
                        <tr key={index} className="bg-white border-b">
                            <td className="py-4 px-6">{item.name}</td>
                            <td className="py-4 px-6">{item.appliedFor}</td>
                            <td className="py-4 px-6">{item.experience}</td>
                            <td className="py-4 px-6">{item.rating}</td>
                            <td className="py-4 px-6">
                                <select 
                                    className="form-select block w-full mt-1 text-gray-700"
                                    value={item.status}
                                    onChange={(e) => handleStatusChange(index, e.target.value)}
                                >
                                    <option value="Shortlisted R1">Shortlisted R1</option>
                                    <option value="Shortlisted R2">Shortlisted R2</option>
                                    <option value="Rejected">Rejected</option>
                                    <option value="Task sent">Task sent</option>
                                </select>
                            </td>
                            <td className="py-4 px-6">
                                <select 
                                    className="form-select block w-full mt-1 text-gray-700"
                                    value={item.assignee}
                                    onChange={(e) => handleStatusChange(index, e.target.value)}
                                >
                                    <option value="Shortlisted R1">Alex Chen</option>
                                    <option value="Shortlisted R2">Sarah James</option>
                                    <option value="Rejected">Jacob Smith</option>
                                    <option value="Task sent">Mia Taylor</option>
                                </select>
                            </td>
                            <td className="py-4 px-6 flex items-center space-x-3">
                                <button className="text-red-500 hover:text-red-700" onClick={() => onReject(index)}>Reject</button>
                                <button className="text-blue-500 hover:text-blue-700" onClick={() => onNextRound(index)}>Next round</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
                <div className="flex justify-between items-center">
                    <div className="flex-1 text-sm text-gray-700">
                        Showing page {currentPage} of {pageNumbers.length}
                    </div>
                    <div>
                        {pageNumbers.map(number => (
                            <button key={number} onClick={() => paginate(number)} className="text-indigo-600 hover:text-indigo-900 px-3 py-1">
                                {number}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};


const InfoCard = ({ data }) => {
    return (
        <div className='flex gap-3'>
            {data.map((item, index) => (
                <div key={index} className='flex flex-col justify-center bg-gray-300 w-48 h-24 border rounded-md p-2'>
                    <p>{item.title}</p>
                    <h1>{item.value}</h1>
                </div>
            ))}
        </div>
    );
};
const FilterComponent = ({ filter , options, onFilterChange, filterKey }) => {
    return (
        <div className="flex ">
            <div className="flex flex-col">
                <label htmlFor={filterKey} className="text-gray-700">{filter}</label>
                <select
                    id={filterKey}
                    className="form-select block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    onChange={e => onFilterChange(filterKey, e.target.value)}
                >
                    {options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

const Candidates = () => {
    const infoData = [
        { title: 'Total', value: 556 },
        { title: 'Shortlisted For Round 1', value: 556 },
        { title: 'Shortlisted For Task', value: 556 },
        { title: 'Shortlisted For Round 2', value: 556 },
        { title: 'Offer Send', value: 556 }
    ];

    const [filters, setFilters] = useState({
        status: 'all',
        job: 'all',
        experience: 'all'
    });

    const handleFilterChange = (key, value) => {
        setFilters(prevFilters => ({ ...prevFilters, [key]: value }));
    };

    const filterOptions = {
        status: [
            { value: 'all', label: 'All' },
            { value: 'active', label: 'Active' },
            { value: 'inactive', label: 'Inactive' }
        ],
        job: [
            { value: 'all', label: 'All' },
            { value: 'developer', label: 'Developer' },
            { value: 'designer', label: 'Designer' }
        ],
        experience: [
            { value: 'all', label: 'All' },
            { value: 'junior', label: 'Junior' },
            { value: 'senior', label: 'Senior' }
        ],
        assignee: [
            { value: 'all', label: 'All' },
            { value: 'junior', label: 'Junior' },
            { value: 'senior', label: 'Senior' }
        ]
    };
    const [candidates, setCandidates] = useState([
        { name: "Ryan Bergson", appliedFor: "Frontend Developer", experience: 4, rating: 4.0, status: "Shortlisted R2" },
        { name: "Jordyn Press", appliedFor: "Senior UI/UX designer", experience: 4, rating: 4.0, status: "Shortlisted R1" },
        { name: "Jordyn Press", appliedFor: "Senior UI/UX designer", experience: 4, rating: 4.0, status: "Shortlisted R1" },
       
        // Add more candidates here
    ]);
    
    const handleStatusChange = (absoluteIndex, newStatus) => {
        const newData = [...candidates];
        newData[absoluteIndex].status = newStatus;
        setCandidates(newData);
    };
    
    const handleReject = (index) => {
        console.log(`Rejected candidate at position ${index}`);
        // Add your rejection logic here
    };
    
    const handleNextRound = (index) => {
        console.log(`Moved candidate to next round at position ${index}`);
        // Add your next round logic here
    };

    return (
        <div className='ml-52 pt-4'>
            <p className='font-bg text-h1 font-h1'>All Candidates</p>
            <InfoCard data={infoData} />
            <div className="p-5 flex">
                {Object.entries(filterOptions).map(([key, options]) => (
                    <FilterComponent
                        filter={key.toUpperCase()}
                        key={key}
                        filterKey={key}
                        options={options}
                        onFilterChange={handleFilterChange}
                    />
                ))}
            </div>
            <div className="p-5">
            <ReusableTable
                data={candidates}
                onStatusChange={handleStatusChange}
                onReject={handleReject}
                onNextRound={handleNextRound}
            />
        </div>
        </div>
    )
}

export default Candidates
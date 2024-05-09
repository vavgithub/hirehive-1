import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditJobs = () => {
    const [formData, setFormData] = useState(null);
    const { id:mainId } = useParams();
    const navigate = useNavigate();
    console.log(mainId);

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const response = await axios.get(`http://localhost:8008/api/getJobById/${mainId}`);
                console.log(response.data)
                setFormData(response.data);
            } catch (error) {
                console.error('Error fetching job:', error);
            }
        };
        fetchJob();
    }, [mainId]);

    if (!formData) {
        return <div>Loading...</div>;  // Show a loading message or spinner until the data is loaded
    }
    console.log(formData);

    const handleInputChange = (event) => {
        const { id, value } = event.target;
        setFormData({ ...formData, [id]: value });
    };

    const setSkills = (skills) => {
        setFormData({ ...formData, skills });
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.put(`http://localhost:8008/api/editJob/${mainId}`, formData);
            console.log('Job updated successfully:', response.data);
            navigate('/jobs');
        } catch (error) {
            console.error('Error updating job:', error);
        }
    };

    const handleSubmitForActive = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.put(`http://localhost:8008/api/editJob/${mainId}`, { ...formData, status: 'active' });
            console.log('Job updated successfully:', response.data);
            navigate('/jobs');
        } catch (error) {
            console.error('Error updating job:', error);
        }
    }

    return (
        <div className="max-w-2xl mx-24 py-10">
            <h2 className="text-3xl font-bold mb-6">Edit Job Listing</h2>
            <form onSubmit={handleSubmitForActive}>
                <div className="mb-4 flex justify-between">
                    <div className='w-1/2 mr-2'>
                        <label htmlFor="title" className="block font-bold mb-2">
                            Job Title*
                        </label>
                        <input
                            type="text"
                            id="title"
                            placeholder="Enter job title"
                            className="w-full px-3 py-2 border border-gray-300 rounded"
                            value={formData.title}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className='w-1/2 '>
                        <label htmlFor="location" className="block font-bold mb-2">
                            Location*
                        </label>
                        <input
                            type="text"
                            id="location"
                            placeholder="Enter your location"
                            className="w-full px-3 py-2 border border-gray-300 rounded"
                            value={formData.location}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                </div>

                <div className="mb-4 flex justify-between">
                    <div className="w-1/3 mr-2">
                        <label htmlFor="jobType" className="block font-bold mb-2">
                            Job Type*
                        </label>
                        <select
                            id="jobType"
                            className="w-full px-3 py-2 border border-gray-300 rounded"
                            value={formData.jobType}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">-Select-</option>
                            <option value="fulltime">Full-time</option>
                            <option value="internship">Internship</option>
                        </select>
                    </div>

                    <div className="w-1/3 mr-2">
                        <label htmlFor="category" className="block font-bold mb-2">
                            Category*
                        </label>
                        <select
                            id="category"
                            className="w-full px-3 py-2 border border-gray-300 rounded"
                            value={formData.category}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">-Select-</option>
                            <option value="sales">Sales</option>
                            <option value="marketing">Marketing</option>
                            <option value="engineering">Engineering</option>
                            <option value="design">Design</option>
                        </select>
                    </div>

                    <div className="w-1/3 mr-2">
                        <label htmlFor="experienceLevel" className="block font-bold mb-2">
                            Experience Level*
                        </label>
                        <select
                            id="experienceLevel"
                            className="w-full px-3 py-2 border border-gray-300 rounded"
                            value={formData.experienceLevel}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">-Select-</option>
                            <option value="entry">Entry Level</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="senior">Senior</option>
                        </select>
                    </div>
                </div>
                <div className='mb-4'>
                    <label htmlFor="skills" className="block font-bold mb-2">
                        Skills*
                    </label>
                    <SkillsInput skills={formData.skills} setSkills={setSkills} />
                </div>

                <div className="mb-4">
                    <label htmlFor="description" className="block font-bold mb-2">
                        Job Description*
                    </label>
                    <textarea
                        id="description"
                        placeholder="Write a job description"
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                        rows="4"
                    ></textarea>
                </div>

                <div className="mb-8">
                    <label htmlFor="requirements" className="block font-bold mb-2">
                        Job Requirements*
                    </label>
                    <textarea
                        id="requirements"
                        placeholder="Write job requirements"
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                        value={formData.requirements}
                        onChange={handleInputChange}
                        required
                        rows="4"
                    ></textarea>
                </div>

                <div className="flex justify-end">
                    <button type="button" onClick={handleSubmit} name="createJob" className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded mr-2">
                        Save
                    </button>
                    {
                        formData.status === 'draft' && (
                            <button type="submit" name="publish" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2">
                                Make It Active
                            </button>
                        )
                    }    

                    {/* <button type="button" onClick={handleSaveForLater} name="saveForLater" className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded">
                        Save for Later
                    </button> */}
                </div>
            </form>
        </div>
    );
};

export default EditJobs;

const SkillsInput = ({ skills, setSkills }) => {
    const [skill, setSkill] = useState('');
    const [error, setError] = useState('');

    const handleKeyDown = (event) => {
        if (['Enter', ','].includes(event.key)) {
            event.preventDefault();
            const trimmedSkill = skill.trim();
            if (trimmedSkill && !skills.includes(trimmedSkill)) {
                setSkills([...skills, trimmedSkill]);
                setSkill('');
                setError('');
            } else {
                setError('Same value not allowed');
            }
        }
    };

    const handleInputChange = (event) => {
        setSkill(event.target.value);
    };

    const removeSkill = (index) => {
        const newSkills = skills.filter((_, idx) => idx !== index);
        setSkills(newSkills);
    };

    return (
        <div>
            <div className="flex flex-wrap gap-2 p-2 border border-gray-300 rounded">
                {skills.map((skill, index) => (
                    <div key={index} className="flex items-center gap-1 bg-blue-100 rounded px-2">
                        {skill}
                        <button onClick={() => removeSkill(index)} className="text-blue-500 hover:text-blue-700">✖</button>
                    </div>
                ))}
                <input
                    type="text"
                    value={skill}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Add skills"
                    className="outline-none"
                />
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
    );
};

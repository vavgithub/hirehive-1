import React, { useState, useEffect } from 'react';

const ViewCandidate = () => {
  const [candidateData, setCandidateData] = useState({
    name: 'Jordyn Press',
    email: 'jordynpress@gmail.com',
    address: 'Suite 193 25913 Jayson Drive, Turnerchester, HI 20505',
    phone: '(206) 342-8631',
    currentJobTitle: 'UX Designer',
    qualification: 'Bachelors',
    experience: 4
  });

  useEffect(() => {
    // Fetch data from the backend
    const fetchData = async () => {
      const response = await fetch('YOUR_BACKEND_ENDPOINT');
      const data = await response.json();
      setCandidateData(data);
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="md:flex">
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Candidate Profile</div>
          <p className="block mt-1 text-lg leading-tight font-medium text-black">Name: {candidateData.name}</p>
          <p className="mt-2 text-gray-500">Email: {candidateData.email}</p>
          <p className="mt-2 text-gray-500">Address: {candidateData.address}</p>
          <p className="mt-2 text-gray-500">Phone: {candidateData.phone}</p>
          <p className="mt-2 text-gray-500">Current Job Title: {candidateData.currentJobTitle}</p>
          <p className="mt-2 text-gray-500">Highest Qualification: {candidateData.qualification}</p>
          <p className="mt-2 text-gray-500">Experience: {candidateData.experience} years</p>
        </div>
      </div>
      <SkillsInput/>
    </div>
  );
};

export default ViewCandidate;


const SkillsInput = () => {
    const [skill, setSkill] = useState('');
    const [skills, setSkills] = useState([]);
  
    const handleKeyDown = (event) => {
      if (['Enter', ','].includes(event.key)) {
        event.preventDefault();
        const trimmedSkill = skill.trim();
  
        if (trimmedSkill && !skills.includes(trimmedSkill)) {
          setSkills([...skills, trimmedSkill]);
          setSkill('');
        }
      }
    };
  
    const handleInputChange = (event) => {
      setSkill(event.target.value);
    };
  
    const removeSkill = (index) => {
      setSkills(skills.filter((_, idx) => idx !== index));
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
      </div>
    );
  };
  
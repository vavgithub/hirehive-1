import React, { useState, useEffect ,useRef } from 'react';
import { fetchAvailableDesignReviewers } from '../../api/authApi';
import Modal from './Modal';
import axios from '../../api/axios';
import ProfileIcon from '../../svg/Icons/ProfileIcon';
import CloseButton from '../../svg/Icons/CloseButton';
import IconWrapper from '../Cards/IconWrapper';
import { User, X } from 'lucide-react';

const AutoAssignModal = ({ open, onClose, onAssign, jobId, budgetFilter }) => {
    const [reviewers, setReviewers] = useState([]);
    const [selectedReviewers, setSelectedReviewers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
  
    useEffect(() => {
      if (open) {
        loadReviewers();
      }
    }, [open]);
  
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setIsDropdownOpen(false);
        }
      };
  
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);
  
    const loadReviewers = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchAvailableDesignReviewers();
        setReviewers(data);
      } catch (err) {
        setError('Failed to load reviewers. Please try again.');
      }
      setIsLoading(false);
    };
  
    const handleReviewerToggle = (reviewer) => {
      setSelectedReviewers(prev => 
        prev.some(r => r._id === reviewer._id)
          ? prev.filter(r => r._id !== reviewer._id)
          : [...prev, reviewer]
      );
    };
  
    const handleRemoveReviewer = (reviewerId) => {
      setSelectedReviewers(prev => prev.filter(r => r._id !== reviewerId));
    };
  
    const handleSelectAll = () => {
      if (selectedReviewers.length === reviewers.length) {
        setSelectedReviewers([]);
      } else {
        setSelectedReviewers([...reviewers]);
      }
    };
  
    const handleAssign = () => {
      onAssign(selectedReviewers);
    };

    // const handleAssign = async () => {
    //   try {
    //     const response = await axios.post('/dr/auto-assign-portfolios', {
    //       jobId,
    //       reviewerIds: selectedReviewers.map(reviewer => reviewer._id)
    //     });
        
    //     if (response.status === 200) {
    //       onAssign(response.data);
    //     } else {
    //       setError('Failed to assign portfolios. Please try again.');
    //     }
    //   } catch (error) {
    //     console.error('Error in auto-assigning portfolios:', error);
    //     setError('An error occurred while assigning portfolios.');
    //   }
    // };
  
  
    const customContent = (
      <div className="relative mt-4" ref={dropdownRef}>
        <h1 className='typography-h3 mb-2'>Select reviewers</h1>
        <div 
          className={"w-full bg-black-100 h-11 flex items-center cursor-pointer rounded-xl hover:bg-background-90 overflow-hidden " + (isDropdownOpen ? "border border-teal-100" : "")}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <div className="flex-grow flex flex-wrap gap-2 h-full px-4 py-1 items-center font-outfit text-font-gray hover:bg-background-90">
          <IconWrapper icon={User} size={0} customIconSize={5} inheritColor />

            {selectedReviewers.map(reviewer => (
              <div key={reviewer._id} className="bg-background-70 px-4 py-1 rounded-xl flex items-center text-white">
                <span className='typography-body'>{reviewer.name}</span>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveReviewer(reviewer._id);
                  }} 
                  className="ml-2 "
                >
                  <IconWrapper icon={X} size={0} customIconSize={5} />
                </button>
              </div>
            ))}
            {selectedReviewers.length === 0 && <span className=" typography-body flex items-center gap-2">-Select-</span>}
          </div>
          <svg className="w-4 h-4 mr-4" fill="none" stroke="#808389" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        {isDropdownOpen && (
          <div className="absolute z-10 w-full mt-1 bg-black-100 shadow-lg max-h-60 overflow-y-auto font-outfit typography-body rounded-xl">
            {isLoading ? (
              <p className="px-4 py-2">Loading reviewers...</p>
            ) : error ? (
              <p className="px-4 py-2 text-red-500">{error}</p>
            ) : (
              <>
                <button 
                  className="w-full px-4 py-2 text-left hover:bg-background-70 h-11"
                  onClick={handleSelectAll}
                >
                  {selectedReviewers.length === reviewers.length ? '-Deselect All-' : '-Select All-'}
                </button>
                {reviewers.map(reviewer => (
                  <label  htmlFor={`reviewer-${reviewer._id}`} key={reviewer._id} className="flex items-center px-4 py-2 hover:bg-background-70 h-11">
                    <input
                      type="checkbox"
                      id={`reviewer-${reviewer._id}`}
                      checked={selectedReviewers.some(r => r._id === reviewer._id)}
                      onChange={() => handleReviewerToggle(reviewer)}
                      className="appearance-none border border-background-80  h-4 w-4 text-black-100 rounded-md bg-background-80 hover:border-grey-100 checked:bg-accent-100 checked:border-accent-100 peer"
                    />
                    <span className="absolute hidden left-4 h-4 w-4 text-black-100 items-center justify-center text-black peer-checked:flex ">✔</span>
                    <span className='w-8 h-8 rounded-full overflow-hidden mx-4'>
                      <img src={reviewer.profilePicture || "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/694px-Unknown_person.jpg"} alt="" />
                    </span>
                    <span>{reviewer.name}</span>
                  </label>
                ))}
              </>
            )}
          </div>
        )}
      </div>
    );
  
    return (
      <Modal
        open={open}
        onClose={onClose}
        customTitle="Auto-Assign Portfolio"
        customMessage="Select reviewers to auto-assign portfolios:"
        cancelLabel="Cancel"
        customConfirmLabel="Assign"
        confirmVariant="primary"
        onConfirm={handleAssign}
        confirmDisabled={selectedReviewers.length === 0}
      >
        {customContent}
      </Modal>
    );
  };

  export default AutoAssignModal;
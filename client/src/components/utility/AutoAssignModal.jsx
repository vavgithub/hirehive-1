import React, { useState, useEffect ,useRef } from 'react';
import { fetchAvailableDesignReviewers } from '../../api/authApi';
import Modal from '../Modal';
import axios from '../../api/axios';


const AutoAssignModal = ({ open, onClose, onAssign, jobId }) => {
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
  
    // const handleAssign = () => {
    //   onAssign(selectedReviewers);
    //   onClose();
    // };
    const handleAssign = async () => {
      try {
        const response = await axios.post('/dr/auto-assign-portfolios', {
          jobId,
          reviewerIds: selectedReviewers.map(reviewer => reviewer._id)
        });
        
        if (response.status === 200) {
          onAssign(response.data);
        } else {
          setError('Failed to assign portfolios. Please try again.');
        }
      } catch (error) {
        console.error('Error in auto-assigning portfolios:', error);
        setError('An error occurred while assigning portfolios.');
      }
    };
  
  
    const customContent = (
      <div className="relative" ref={dropdownRef}>
        <div 
          className="w-full p-2 bg-background-100 rounded flex items-center cursor-pointer"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <div className="flex-grow flex flex-wrap gap-2">
            {selectedReviewers.map(reviewer => (
              <div key={reviewer._id} className="bg-background-70 px-2 py-1 rounded-full flex items-center">
                <span>{reviewer.name}</span>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveReviewer(reviewer._id);
                  }} 
                  className="ml-2 text-red-500"
                >
                  ×
                </button>
              </div>
            ))}
            {selectedReviewers.length === 0 && <span className="text-gray-400">Select reviewers</span>}
          </div>
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        {isDropdownOpen && (
          <div className="absolute z-10 w-full mt-1 bg-background-100 rounded shadow-lg max-h-60 overflow-y-auto">
            {isLoading ? (
              <p className="p-2">Loading reviewers...</p>
            ) : error ? (
              <p className="p-2 text-red-500">{error}</p>
            ) : (
              <>
                <button 
                  className="w-full p-2 text-left hover:bg-background-70"
                  onClick={handleSelectAll}
                >
                  {selectedReviewers.length === reviewers.length ? 'Deselect All' : 'Select All'}
                </button>
                {reviewers.map(reviewer => (
                  <div key={reviewer._id} className="flex items-center p-2 hover:bg-background-70">
                    <input
                      type="checkbox"
                      id={`reviewer-${reviewer._id}`}
                      checked={selectedReviewers.some(r => r._id === reviewer._id)}
                      onChange={() => handleReviewerToggle(reviewer)}
                      className="mr-2"
                    />
                    <label htmlFor={`reviewer-${reviewer._id}`}>{reviewer.name}</label>
                  </div>
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
        confirmLabel="Assign"
        confirmVariant="primary"
        onConfirm={handleAssign}
        confirmDisabled={selectedReviewers.length === 0}
      >
        {customContent}
      </Modal>
    );
  };

  export default AutoAssignModal;
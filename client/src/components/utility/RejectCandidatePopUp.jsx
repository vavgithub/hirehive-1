import React from 'react'
import { Button } from '../ui/Button';

const reasons = [
    "Candidate's scores did not meet the criteria",
    "Candidate did not appear for the screening",
    "Candidate did not appear for round one",
    "Candidate did not appear for round two",
    "Candidate did not submit the design task"
];

const RejectCandidatePopUp = ({ name, onReject, onNext }) => {
    return (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-background-80 rounded-lg p-6 w-full max-w-md">
                <h1>Reject</h1>
                <p className='typography-large-p'>Are you sure you want to reject "Jordyn Press"? {name}</p>
                <p className='typography-body'>Please provide the reason for rejecting this candidate</p>
                <div className="relative z-10">
                    <select name="" id="" className='w-full'>
                        {reasons.map((r, index) => (
                            <option key={index}>
                                {r}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='flex gap-6 mt-4 relative z-20'>
                    <div className='w-[236px]'>
                        <Button variant="primary" onClick={onNext}>Cancel</Button>
                    </div>
                    <div className='w-[236px]'>
                        <Button variant="cancel" onClick={onReject}>Reject</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RejectCandidatePopUp
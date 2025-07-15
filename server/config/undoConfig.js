export const undoConfig = {
    "Portfolio" : {
        'Not Assigned' : {
            revert : null,
            revertTo : null,
            condition : ['check_rejection_scheduled']
        },
        'Under Review' : {
            revert : [{field : 'assignedTo' , value : null}],
            revertTo : 'Not Assigned'
        },
        'Reviewed' : {
            revert : [{field : 'score' , value : null},{field : 'feedback' , value : ''}],
            revertTo : 'Under Review',
            condition : ['check_rejection_scheduled']
        },
        'Cleared' : {
            revert : null,
            revertTo : null,
        },
        'Rejected' : {
            revert : null,
            revertTo : null,
        }
    },
    "Screening" : {
        'Pending' : {
            revert : [{field : 'assignedTo' , value : null},{field : 'score.Budget' , value : 0}],
            revertTo : 'Pending'
        },
        'Call Scheduled' : {
            revert : null,
            revertTo : null,
        },
        'No Show' : {
            revert : null,
            revertTo : null,
            condition : ['check_rejection_scheduled']
        },        
        'Under Review' : {
            revert : null,
            revertTo : null,
        },
        'Reviewed' : {
            revert : [{field : 'score' , value : 0},{field : 'feedback' , value : ''}],
            revertTo : 'Under Review',
            condition : ['remove_except_budget','check_rejection_scheduled']
        },
        'Cleared' : {
            revert : null,
            revertTo : null,
        },
        'Rejected' : {
            revert : null,
            revertTo : null,
        }
    },
    "Design Task" : {
        'Pending' : {
            revert : [{field : 'taskDescription' , value : ''},{field : 'scheduledDate' , value : null},{field : 'currentCall.scheduledDate' , value : null},{field : 'currentCall.scheduledTime' , value : null}],
            revertTo : 'Pending'
        },
        'Sent' : {
            revert : null,
            revertTo : null,
            condition : ['check_rejection_scheduled']
        },
        'Not Assigned' : {
            revert : null,
            revertTo : null
        },        
        'Under Review' : {
            revert : [{field : 'assignedTo' , value : null}],
            revertTo : 'Not Assigned',
        },
        'Reviewed' : {
            revert : [{field : 'score' , value : null},{field : 'feedback' , value : ''}],
            revertTo : 'Under Review',
            condition : ['check_rejection_scheduled']
        },
        'Cleared' : {
            revert : null,
            revertTo : null,
        },
        'Rejected' : {
            revert : null,
            revertTo : null,
        }
    },
    "Round 1" : {
        'Pending' : {
            revert : [{field : 'assignedTo' , value : null}],
            revertTo : 'Pending'
        },
        'Call Scheduled' : {
            revert : null,
            revertTo : null,
        },
        'No Show' : {
            revert : null,
            revertTo : null,
            condition : ['check_rejection_scheduled']
        },        
        'Under Review' : {
            revert : null,
            revertTo : null,
        },
        'Reviewed' : {
            revert : [{field : 'score' , value : null},{field : 'feedback' , value : ''}],
            revertTo : 'Under Review',
            condition : ['check_rejection_scheduled']
        },
        'Cleared' : {
            revert : null,
            revertTo : null,
        },
        'Rejected' : {
            revert : null,
            revertTo : null,
        }
    },
    "Round 2" : {
        'Pending' : {
            revert : [{field : 'assignedTo' , value : null}],
            revertTo : 'Pending'
        },
        'Call Scheduled' : {
            revert : null,
            revertTo : null,
        },
        'No Show' : {
            revert : null,
            revertTo : null,
            condition : ['check_rejection_scheduled']
        },        
        'Under Review' : {
            revert : null,
            revertTo : null,
        },
        'Reviewed' : {
            revert : [{field : 'score' , value : null},{field : 'feedback' , value : ''}],
            revertTo : 'Under Review',
            condition : ['check_rejection_scheduled']
        },
        'Cleared' : {
            revert : null,
            revertTo : null,
        },
        'Rejected' : {
            revert : null,
            revertTo : null,
        }
    },
    "Hired" : {
        'Under Review' : {
            revert : null,
            revertTo : null,
            condition : ['check_rejection_scheduled']
        },
        'Accepted' : {
            revert : null,
            revertTo : null
        },
        'Rejected' : {
            revert : null,
            revertTo : null,
        }
    },
}
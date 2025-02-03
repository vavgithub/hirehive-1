import RejectCrossIcon from "../../svg/Staging/RejectCrossIcon";
import RightTick from "../../svg/Staging/RightTick";
import WarningIcon from "../../svg/Staging/WarningIcon";
import PortfolioHeader from "./PortfolioHeader";

export const stagingConfig = {
    'UI/UX' : [
        {
            name : "Portfolio",
            statuses : [
                'Not Assigned', 'Under Review', 'Reviewed', 'Cleared', 'Rejected'
            ],
            score : 5,
            extraHeaderContent : PortfolioHeader,
            contentConfig : {
                "Not Assigned" : {
                    "Hiring Manager" : {
                        hasAssigneeSelectorIcon : true,
                        hasAssigneeSelectorEnabled : true,
                        hasAssigneeSelector : true,
                        hasBudgetLabel : false,
                        hasLabel : {
                            content : "Candidate's portfolio has not yet been assigned to a reviewer.",
                            icon : WarningIcon
                        }
                    },
                    "Design Reviewer" : {
                        hasAssigneeSelectorIcon : false,
                        hasAssigneeSelectorEnabled : false,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : false,
                        hasLabel : {
                            content : "This portfolio has not been assigned to you yet.",
                            icon : WarningIcon
                        }
                    },
                    "Candidate" : {
                        hasAssigneeSelectorIcon : false,
                        hasAssigneeSelectorEnabled : false,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : false,
                        hasLabel : {
                            content : "Your portfolio is currently being reviewed. We will notify you once the review is complete.",
                            icon : WarningIcon
                        }
                    }
                },
                "Under Review" : {
                    "Hiring Manager" : {
                        hasAssigneeSelectorIcon : true,
                        hasAssigneeSelectorEnabled : true,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : false,
                        hasLabel : {
                            content : "Portfolio is currently under review by the design reviewer.",
                            icon : WarningIcon
                        },
                        hasRemarks : false,
                        hasScoreCard : false,
                        actions : false
                    },
                    "Design Reviewer" : {
                        hasAssigneeSelectorIcon : false,
                        hasAssigneeSelectorEnabled : false,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : false,
                        hasLabel : {
                            content : "Please review the portfolio and update the details below.",
                            icon : false
                        },
                        hasRatingComponent : true,
                        hasRemarks : false,
                        hasScoreCard : false,
                        actions : false
                    },
                    "Candidate" : {
                        hasAssigneeSelectorIcon : false,
                        hasAssigneeSelectorEnabled : false,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : false,
                        hasLabel : {
                            content : "Your portfolio is currently being reviewed. We will notify you once the review is complete.",
                            icon : WarningIcon
                        },
                        hasRemarks : false,
                        hasScoreCard : false,
                        actions : false
                    }
                },
                "Reviewed" : {
                    "Hiring Manager" : {
                        hasAssigneeSelectorIcon : true,
                        hasAssigneeSelectorEnabled : true,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : false,
                        hasLabel : false,
                        hasRemarks : true,
                        hasScoreCard : true,
                        actions : {
                            hasRejectAction : true,
                            hasMoveToNextRoundAction : true
                        }
                    },
                    "Design Reviewer" : {
                        hasAssigneeSelectorIcon : false,
                        hasAssigneeSelectorEnabled : false,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : false,
                        hasLabel : false,
                        hasRemarks : true,
                        hasScoreCard : true,
                        actions : false
                    },
                    "Candidate" : {
                        hasAssigneeSelectorIcon : false,
                        hasAssigneeSelectorEnabled : false,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : false,
                        hasLabel : {
                            content : "You are now ready to move on to the next round. Our team will contact you soon with further details",
                            icon : RightTick
                        },
                        hasRemarks : false,
                        hasScoreCard : false,
                        actions : false
                    }
                },
                "Rejected" : {
                    "Hiring Manager" : {
                        hasAssigneeSelectorIcon : true,
                        hasAssigneeSelectorEnabled : false,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : false,
                        hasLabel : false,
                        hasRemarks : false,
                        hasRejectionReason : true,
                        hasScoreCard : true,
                        actions : false
                    },
                    "Design Reviewer" : {
                        hasAssigneeSelectorIcon : false,
                        hasAssigneeSelectorEnabled : false,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : false,
                        hasLabel : false,
                        hasRemarks : true,
                        hasScoreCard : true
                    },
                    "Candidate" : {
                        hasAssigneeSelectorIcon : false,
                        hasAssigneeSelectorEnabled : false,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : false,
                        hasLabel : {
                            content : "Unfortunately, you did not clear the round. Thank you for your interest. We encourage you to reapply in the future",
                            icon : RejectCrossIcon
                        },
                        hasRemarks : false,
                        hasScoreCard : false
                    }
                },
                "Cleared" : {
                    "Hiring Manager" : {
                        hasAssigneeSelectorIcon : true,
                        hasAssigneeSelectorEnabled : false,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : false,
                        hasLabel : false,
                        hasRemarks : true,
                        hasScoreCard : true,
                        actions : false
                    },
                    "Design Reviewer" : {
                        hasAssigneeSelectorIcon : false,
                        hasAssigneeSelectorEnabled : false,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : false,
                        hasLabel : false,
                        hasRemarks : true,
                        hasScoreCard : true
                    },
                    "Candidate" : {
                        hasAssigneeSelectorIcon : false,
                        hasAssigneeSelectorEnabled : false,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : false,
                        hasLabel : {
                            content : "You are now ready to move on to the next round. Our team will contact you soon with further details",
                            icon : RightTick
                        },
                        hasRemarks : false,
                        hasScoreCard : false
                    }
                }
            }
        },
        {
            name : "Screening",
            statuses : [
                'Pending', 'Call Scheduled', 'Under Review', 'Reviewed', 'Cleared', 'No Show', 'Rejected'
            ],
            score : 5,
            extraHeaderContent : false,
            contentConfig : {
                "Pending" : {
                    "Hiring Manager" : {
                        hasAssigneeSelectorIcon : true,
                        hasAssigneeSelectorEnabled : true,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : true,
                        hasLabel : {
                            content : "Call not scheduled. Please contact the candidate to schedule the screening call and update the details below",
                            icon : WarningIcon
                        },
                        hasRemarks : false,
                        hasScoreCard : false,
                        actions : false,
                        hasCallDetails : true,
                        hasCallHistory : false,
                        hasScheduledForm : true
                    },
                    "Design Reviewer" : {
                        hasAssigneeSelectorIcon : false,
                        hasAssigneeSelectorEnabled : false,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : true,
                        hasLabel : {
                            content : "The screening call has not yet been scheduled. Please check back later for updates.",
                            icon : false
                        },
                        hasRemarks : false,
                        hasScoreCard : false
                    },
                    "Candidate" : {
                        hasAssigneeSelectorIcon : false,
                        hasAssigneeSelectorEnabled : false,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : true,
                        hasLabel : {
                            content : "Your screening call has not been scheduled yet. Please wait for further instructions.",
                            icon : WarningIcon
                        },
                        hasRemarks : false,
                        hasScoreCard : false,
                        hasCallDetails : true,
                        hasCallHistory : false,
                    }
                },
                "Call Scheduled" : {
                    "Hiring Manager" : {
                        hasAssigneeSelectorIcon : true,
                        hasAssigneeSelectorEnabled : true,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : true,
                        hasLabel : {
                            content : "The screening call has been scheduled. You can reschedule if needed.",
                            icon : WarningIcon
                        },
                        hasRemarks : false,
                        hasScoreCard : false,
                        hasCallDetails : true,
                        hasCallHistory : true,
                        hasScheduledForm : false,
                        actions : {
                            hasRescheduleAction : true,
                            hasNoShowAction : true,
                        }
                    },
                    "Design Reviewer" : {
                        hasAssigneeSelectorIcon : false,
                        hasAssigneeSelectorEnabled : false,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : true,
                        hasLabel : {
                            content : "The screening call has been scheduled.",
                            icon : WarningIcon
                        },
                        hasRemarks : false,
                        hasScoreCard : false,
                        hasCallDetails : true,
                        hasCallHistory : false,
                    },
                    "Candidate" : {
                        hasAssigneeSelectorIcon : false,
                        hasAssigneeSelectorEnabled : false,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : true,
                        hasLabel : {
                            content : "Your screening call has been scheduled. Please attend at the specified time.",
                            icon : WarningIcon
                        },
                        hasRemarks : false,
                        hasScoreCard : false,
                        hasCallDetails : true,
                        hasCallHistory : false,
                    }
                },
                "No Show" : {
                    "Hiring Manager" : {
                        hasAssigneeSelectorIcon : true,
                        hasAssigneeSelectorEnabled : true,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : true,
                        hasLabel : {
                            content : "Candidate did not show up for the scheduled screening call.",
                            icon : WarningIcon
                        },
                        hasRemarks : false,
                        hasScoreCard : false,
                        hasCallDetails : false,
                        hasCallHistory : false,
                        hasScheduledForm : false,
                        actions : {
                            hasRescheduleAction : true,
                            hasRejectAction : true,
                        }
                    },
                    "Design Reviewer" : {
                        hasAssigneeSelectorIcon : false,
                        hasAssigneeSelectorEnabled : false,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : true,
                        hasLabel : {
                            content : "Waiting for the screening call to be scheduled.",
                            icon : WarningIcon
                        },
                        hasRemarks : false,
                        hasScoreCard : false,
                        hasCallDetails : false,
                        hasCallHistory : false,
                    },
                    "Candidate" : {
                        hasAssigneeSelectorIcon : false,
                        hasAssigneeSelectorEnabled : false,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : true,
                        hasLabel : {
                            content : "You missed the scheduled screening call. Please contact the hiring team for further instructions.",
                            icon : WarningIcon
                        },
                        hasRemarks : false,
                        hasScoreCard : false,
                        hasCallDetails : false,
                        hasCallHistory : false,
                    }
                },
                "Under Review" : {
                    "Hiring Manager" : {
                        hasAssigneeSelectorIcon : true,
                        hasAssigneeSelectorEnabled : true,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : true,
                        hasLabel : {
                            content : "Screening is currently under review.",
                            icon : WarningIcon
                        },
                        hasRemarks : false,
                        hasScoreCard : false,
                        hasCallDetails : false,
                        hasCallHistory : false,
                        hasScheduledForm : false,
                        actions : {
                            hasNoShowAction : true,
                        }
                    },
                    "Design Reviewer" : {
                        hasAssigneeSelectorIcon : false,
                        hasAssigneeSelectorEnabled : false,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : true,
                        hasLabel : {
                            content : "Please review the candidate's performance and provide scores.",
                            icon : WarningIcon
                        },
                        hasRatingComponent : true,
                        hasRemarks : false,
                        hasScoreCard : false,
                        hasCallDetails : false,
                        hasCallHistory : false,
                    },
                    "Candidate" : {
                        hasAssigneeSelectorIcon : false,
                        hasAssigneeSelectorEnabled : false,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : true,
                        hasLabel : {
                            content : "Your performance is currently being reviewed. We will notify you once the review is complete",
                            icon : WarningIcon
                        },
                        hasRemarks : false,
                        hasScoreCard : false,
                        hasCallDetails : false,
                        hasCallHistory : false,
                    }
                },
                "Reviewed" : {
                    "Hiring Manager" : {
                        hasAssigneeSelectorIcon : true,
                        hasAssigneeSelectorEnabled : true,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : true,
                        hasLabel : false,
                        hasRemarks : true,
                        hasScoreBoard : true,
                        hasBudgetScoring : true,
                        hasScoreCard : true,
                        hasCallDetails : false,
                        hasCallHistory : false,
                        hasScheduledForm : false,
                        actions : {
                            hasRejectAction : true,
                            hasMoveToNextRoundAction : true
                        }
                    },
                    "Design Reviewer" : {
                        hasAssigneeSelectorIcon : false,
                        hasAssigneeSelectorEnabled : false,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : true,
                        hasLabel : false,
                        hasRatingComponent : false,
                        hasScoreBoard : true,
                        hasRemarks : true,
                        hasScoreCard : true,
                        hasCallDetails : false,
                        hasCallHistory : false,
                    },
                    "Candidate" : {
                        hasAssigneeSelectorIcon : false,
                        hasAssigneeSelectorEnabled : false,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : true,
                        hasLabel : {
                            content : "Your performance is currently being reviewed. We will notify you once the review is complete",
                            icon : WarningIcon
                        },
                        hasRemarks : false,
                        hasScoreCard : false,
                        hasCallDetails : false,
                        hasCallHistory : false,
                    }
                },
                "Cleared" : {
                    "Hiring Manager" : {
                        hasAssigneeSelectorIcon : true,
                        hasAssigneeSelectorEnabled : true,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : true,
                        hasLabel : false,
                        hasRemarks : true,
                        hasScoreBoard : true,
                        hasScoreCard : true,
                        hasCallDetails : false,
                        hasCallHistory : false,
                        hasScheduledForm : false,
                        actions : false
                    },
                    "Design Reviewer" : {
                        hasAssigneeSelectorIcon : false,
                        hasAssigneeSelectorEnabled : false,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : true,
                        hasLabel : false,
                        hasRatingComponent : false,
                        hasScoreBoard : true,
                        hasRemarks : true,
                        hasScoreCard : true,
                        hasCallDetails : false,
                        hasCallHistory : false,
                    },
                    "Candidate" : {
                        hasAssigneeSelectorIcon : false,
                        hasAssigneeSelectorEnabled : false,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : true,
                        hasLabel : {
                            content : "You are now ready to move on to the next round. Our team will contact you soon with further details",
                            icon : RightTick
                        },
                        hasRemarks : false,
                        hasScoreCard : false,
                        hasCallDetails : false,
                        hasCallHistory : false,
                    }
                },
                "Rejected" : {
                    "Hiring Manager" : {
                        hasAssigneeSelectorIcon : true,
                        hasAssigneeSelectorEnabled : true,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : true,
                        hasLabel : false,
                        hasRemarks : false,
                        hasRejectionReason : true,
                        hasScoreBoard : true,
                        hasScoreCard : true,
                        hasCallDetails : false,
                        hasCallHistory : false,
                        hasScheduledForm : false,
                        actions : false
                    },
                    "Design Reviewer" : {
                        hasAssigneeSelectorIcon : false,
                        hasAssigneeSelectorEnabled : false,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : true,
                        hasLabel : false,
                        hasRatingComponent : false,
                        hasScoreBoard : true,
                        hasRemarks : false,
                        hasRejectionReason : true,
                        hasScoreCard : true,
                        hasCallDetails : false,
                        hasCallHistory : false,
                    },
                    "Candidate" : {
                        hasAssigneeSelectorIcon : false,
                        hasAssigneeSelectorEnabled : false,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : true,
                        hasLabel : {
                            content : "Unfortunately, you did not clear the round. Thank you for your interest. We encourage you to reapply in the future",
                            icon : RejectCrossIcon
                        },
                        hasRemarks : false,
                        hasScoreCard : false,
                        hasCallDetails : false,
                        hasCallHistory : false,
                    }
                },
            }
        }
    ]
}


export const statusConfig = {
    "Accepted": { 
        bgColor: "#411a22", 
        color: "#FF385C" 
    },
    "Call Scheduled": { 
        bgColor: "#3e3514", 
        color: "#EDBD14" 
    },
    "Cleared": { 
        bgColor: "#123c22", 
        color: "#12D382" 
    },
    "No Show": { 
        bgColor: "#232425", 
        color: "#FFFFFF" 
    },
    "Not Assigned": { 
        bgColor: "#411a22", 
        color: "#FF385C" 
    },
    "Not Submitted": { 
        bgColor: "#411a22", 
        color: "#FF385C" 
    },
    "Offer Sent": { 
        bgColor: "#123c22", 
        color: "#12D382" 
    },
    "Pending": { 
        bgColor: "#411a22", 
        color: "#FF385C" 
    },
    "Rejected": { 
        bgColor: "#411a22", 
        color: "#FF385C" 
    },
    "Reviewed": { 
        bgColor: "#123c22", 
        color: "#12D382" 
    },
    "Sent": { 
        bgColor: "#123c22", 
        color: "#12D382" 
    },
    "Under Review": { 
        bgColor: "#3e3514", 
        color: "#EDBD14" 
    }
  };
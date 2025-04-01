import RejectCrossIcon from "../../svg/Staging/RejectCrossIcon";
import RightTick from "../../svg/Staging/RightTick";
import WarningIcon from "../../svg/Staging/WarningIcon";
import PortfolioHeader from "./PortfolioHeader";

export const stagingConfig = {
    'UI UX' : [
        {
            name : "Portfolio",
            statuses : [
                'Not Assigned', 'Under Review', 'Reviewed', 'Cleared', 'Rejected'
            ],
            score : 5,
            totalScore : 5,
            extraHeaderContent : PortfolioHeader,
            contentConfig : {
                "Not Assigned" : {
                    "Admin" : {
                        hasAssigneeSelectorIcon : true,
                        hasAssigneeSelectorEnabled : true,
                        hasAssigneeSelector : true,
                        hasBudgetLabel : false,
                        hasLabel : {
                            content : "Candidate's portfolio has not yet been assigned to a reviewer.",
                            icon : WarningIcon
                        }
                    },
                    "Hiring Manager" : {
                        hasAssigneeSelectorIcon : true,
                        hasAssigneeSelectorEnabled : true,
                        hasAssigneeSelector : true,
                        hasBudgetLabel : false,
                        hasLabel : {
                            content : "Candidate's portfolio has not yet been assigned to a reviewer.",
                            icon : WarningIcon
                        },
                        hasScheduledLabel : true,
                        actions : {
                            hasRejectAction : true,
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
                    "Admin" : {
                        hasAssigneeSelectorIcon : true,
                        hasAssigneeSelectorEnabled : true,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : false,
                        hasLabel : {
                            content : "Portfolio is currently under review by the design reviewer.",
                            icon : WarningIcon
                        },
                        hasRemarks : false,
                        hasRatingComponent : true,
                        hasScoreCard : false,
                        actions : false
                    },
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
                    "Admin" : {
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
                    "Hiring Manager" : {
                        hasAssigneeSelectorIcon : true,
                        hasAssigneeSelectorEnabled : true,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : false,
                        hasLabel : false,
                        hasRemarks : true,
                        hasScoreCard : true,
                        hasScheduledLabel : true,
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
                    "Admin" : {
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
                    "Admin" : {
                        hasAssigneeSelectorIcon : true,
                        hasAssigneeSelectorEnabled : false,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : false,
                        hasLabel : false,
                        hasRemarks : true,
                        hasScoreCard : true,
                        actions : false
                    },
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
            score : {
                Attitude : 5,
                UI : 5,
                UX : 5,
                Tech : 5,
                Communication : 5,
                Budget : 5,
            },
            totalScore : 30,
            hasSplitScoring : true,
            extraHeaderContent : false,
            contentConfig : {
                "Pending" : {
                    "Admin" : {
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
                        hasBudgetScoring : true,
                        actions : false,
                        hasCallHistory : false,
                        hasScheduledForm : true
                    },
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
                        hasBudgetScoring : true,
                        actions : false,
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
                    }
                },
                "Call Scheduled" : {
                    "Admin" : {
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
                    "Admin" : {
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
                    "Admin" : {
                        hasAssigneeSelectorIcon : true,
                        hasAssigneeSelectorEnabled : true,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : true,
                        hasLabel : {
                            content : "Screening is currently under review.",
                            icon : WarningIcon
                        },
                        hasScheduledForm : false,
                        hasRatingComponent : true,
                        hasRemarks : false,
                        hasScoreCard : false,
                        hasCallDetails : false,
                        hasCallHistory : false,
                        actions : {
                            hasNoShowAction : true,
                        }
                    },
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
                    "Admin" : {
                        hasAssigneeSelectorIcon : true,
                        hasAssigneeSelectorEnabled : false,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : true,
                        hasLabel : false,
                        hasRemarks : true,
                        hasScoreBoard : true,
                        hasScoreCard : true,
                        hasBudgetScoring : true,
                        hasCallDetails : false,
                        hasCallHistory : false,
                        hasScheduledForm : false,
                        actions : {
                            hasRejectAction : true,
                            hasMoveToNextRoundAction : true
                        }
                    },
                    "Hiring Manager" : {
                        hasAssigneeSelectorIcon : true,
                        hasAssigneeSelectorEnabled : false,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : true,
                        hasLabel : false,
                        hasRemarks : true,
                        hasScoreBoard : true,
                        hasScoreCard : true,
                        hasBudgetScoring : true,
                        hasCallDetails : false,
                        hasCallHistory : false,
                        hasScheduledForm : false,
                        hasScheduledLabel : true,
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
                    "Admin" : {
                        hasAssigneeSelectorIcon : true,
                        hasAssigneeSelectorEnabled : false,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : true,
                        hasLabel : false,
                        hasRemarks : true,
                        hasScoreBoard : true,
                        hasScoreCard : true,
                        hasCallDetails : false,
                        hasCallHistory : true,
                        hasScheduledForm : false,
                        actions : false
                    },
                    "Hiring Manager" : {
                        hasAssigneeSelectorIcon : true,
                        hasAssigneeSelectorEnabled : false,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : true,
                        hasLabel : false,
                        hasRemarks : true,
                        hasScoreBoard : true,
                        hasScoreCard : true,
                        hasCallDetails : false,
                        hasCallHistory : true,
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
                    "Admin" : {
                        hasAssigneeSelectorIcon : true,
                        hasAssigneeSelectorEnabled : false,
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
                    "Hiring Manager" : {
                        hasAssigneeSelectorIcon : true,
                        hasAssigneeSelectorEnabled : false,
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
        },
        {
            name : "Design Task",
            statuses : [
                'Pending','Not Assigned', 'Sent', 'Under Review', 'Reviewed', 'Cleared', 'Rejected', 'Not Submitted'
            ],
            score : 5,
            totalScore : 5,
            extraHeaderContent : false,
            contentConfig : {
                "Pending" : {
                    "Admin" : {
                        hasAssigneeSelectorIcon : true,
                        hasAssigneeSelectorEnabled : false,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : false,
                        hasLabel : {
                            content : "Design task not sent. Please provide task details and set a due date/time.",
                            icon : WarningIcon
                        },
                        hasScheduledLabel : true,
                        hasRemarks : false,
                        hasScoreCard : false,
                        actions : false,
                        hasTaskForm : true
                    },
                    "Hiring Manager" : {
                        hasAssigneeSelectorIcon : true,
                        hasAssigneeSelectorEnabled : false,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : false,
                        hasLabel : {
                            content : "Design task not sent. Please provide task details and set a due date/time.",
                            icon : WarningIcon
                        },
                        hasRemarks : false,
                        hasScoreCard : false,
                        actions : false,
                        hasTaskForm : true,
                        hasScheduledLabel : true
                    },
                    "Design Reviewer" : {
                        hasAssigneeSelectorIcon : false,
                        hasAssigneeSelectorEnabled : false,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : false,
                        hasLabel : {
                            content : "The design task has not yet been sent. Please check back later for updates.",
                            icon : false
                        },
                        hasRemarks : false,
                        hasScoreCard : false
                    },
                    "Candidate" : {
                        hasAssigneeSelectorIcon : false,
                        hasAssigneeSelectorEnabled : false,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : false,
                        hasLabel : {
                            content : "Your submission is Pending. Please wait for feedback.",
                            icon : WarningIcon
                        },
                        hasRemarks : false,
                        hasScoreCard : false,
                    }
                },
                "Sent" : {
                    "Admin" : {
                        hasAssigneeSelectorIcon : true,
                        hasAssigneeSelectorEnabled : false,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : false,
                        hasLabel : {
                            content : "The design task has been sent to the candidate.",
                            icon : WarningIcon
                        },
                        hasRemarks : false,
                        hasScoreCard : false,
                        actions : false,
                        hasTaskDetails : true
                    },
                    "Hiring Manager" : {
                        hasAssigneeSelectorIcon : true,
                        hasAssigneeSelectorEnabled : false,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : false,
                        hasLabel : {
                            content : "The design task has been sent to the candidate.",
                            icon : WarningIcon
                        },
                        hasRemarks : false,
                        hasScoreCard : false,
                        actions : false,
                        hasTaskDetails : true
                    },
                    "Design Reviewer" : {
                        hasAssigneeSelectorIcon : false,
                        hasAssigneeSelectorEnabled : false,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : false,
                        hasLabel : {
                            content : "The design task has been sent to the candidate. Please wait for the submission.",
                            icon : false
                        },
                        hasTaskDetails : true
                    },
                    "Candidate" : {
                        hasAssigneeSelectorIcon : false,
                        hasAssigneeSelectorEnabled : false,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : false,
                        hasLabel : {
                            content : "You have been assigned a design task. Please complete it and submit the link before the due date.",
                            icon : WarningIcon
                        },
                        hasTaskDetails : false,
                        hasSubmissionForm : true
                    }
                },
                "Not Assigned" : {
                    "Admin" : {
                        hasAssigneeSelectorIcon : true,
                        hasAssigneeSelectorEnabled : true,
                        hasAssigneeSelector : true,
                        hasBudgetLabel : false,
                        hasLabel : {
                            content : "Candidate’s design task has not yet been assigned to a reviewer.",
                            icon : WarningIcon
                        },
                        hasRemarks : false,
                        hasScoreCard : false,
                        actions : false,
                        hasSubmissionDetails : true
                    },
                    "Hiring Manager" : {
                        hasAssigneeSelectorIcon : true,
                        hasAssigneeSelectorEnabled : true,
                        hasAssigneeSelector : true,
                        hasBudgetLabel : false,
                        hasLabel : {
                            content : "Candidate’s design task has not yet been assigned to a reviewer.",
                            icon : WarningIcon
                        },
                        hasRemarks : false,
                        hasScoreCard : false,
                        actions : false,
                        hasSubmissionDetails : true
                    },
                    "Design Reviewer" : {
                        hasAssigneeSelectorIcon : false,
                        hasAssigneeSelectorEnabled : false,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : false,
                        hasLabel : {
                            content : "Waiting for the task to be sent to the candidate.",
                            icon : WarningIcon
                        },
                    },
                    "Candidate" : {
                        hasAssigneeSelectorIcon : false,
                        hasAssigneeSelectorEnabled : false,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : false,
                        hasLabel : {
                            content : "Your performance is currently being reviewed. We will notify you once the review is complete.",
                            icon : WarningIcon
                        },
                        hasSubmissionDetails : true,
                        isSubmissionEditable : true,
                    }
                },
                "Under Review" : {
                    "Admin" : {
                        hasAssigneeSelectorIcon : true,
                        hasAssigneeSelectorEnabled : true,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : false,
                        hasLabel : {
                            content : "Design Task is currently under review by the design reviewer",
                            icon : WarningIcon
                        },
                        hasRemarks : false,
                        hasScoreCard : false,
                        hasSubmissionDetails : true,
                        hasRatingComponent : true,
                        actions : false,
                    },
                    "Hiring Manager" : {
                        hasAssigneeSelectorIcon : true,
                        hasAssigneeSelectorEnabled : true,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : false,
                        hasLabel : {
                            content : "Design Task is currently under review by the design reviewer",
                            icon : WarningIcon
                        },
                        hasRemarks : false,
                        hasScoreCard : false,
                        hasSubmissionDetails : true,
                        actions : false,
                    },
                    "Design Reviewer" : {
                        hasAssigneeSelectorIcon : false,
                        hasAssigneeSelectorEnabled : false,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : false,
                        hasLabel : {
                            content : "Please review the candidate's submission and provide feedback.",
                            icon : WarningIcon
                        },
                        hasSubmissionDetails : true,
                        hasRatingComponent : true
                    },
                    "Candidate" : {
                        hasAssigneeSelectorIcon : false,
                        hasAssigneeSelectorEnabled : false,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : false,
                        hasLabel : {
                            content : "Your submission is under review. Please wait for feedback.",
                            icon : WarningIcon
                        },
                    }
                },
                "Reviewed" : {
                    "Admin" : {
                        hasAssigneeSelectorIcon : true,
                        hasAssigneeSelectorEnabled : false,
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
                    "Hiring Manager" : {
                        hasAssigneeSelectorIcon : true,
                        hasAssigneeSelectorEnabled : false,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : false,
                        hasLabel : false,
                        hasRemarks : true,
                        hasScoreCard : true,
                        hasScheduledLabel : true,
                        hasSubmissionDetails : true,
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
                        hasSubmissionDetails : true,
                        hasLabel : false,
                        hasRemarks : true,
                    },
                    "Candidate" : {
                        hasAssigneeSelectorIcon : false,
                        hasAssigneeSelectorEnabled : false,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : false,
                        hasLabel : false,
                        hasRemarks : true,
                    }
                },
                "Cleared" : {
                    "Admin" : {
                        hasAssigneeSelectorIcon : true,
                        hasAssigneeSelectorEnabled : false,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : false,
                        hasLabel : false,
                        hasRemarks : true,
                        hasScoreCard : true,
                        hasSubmissionDetails : true
                    },
                    "Hiring Manager" : {
                        hasAssigneeSelectorIcon : true,
                        hasAssigneeSelectorEnabled : false,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : false,
                        hasLabel : false,
                        hasRemarks : true,
                        hasScoreCard : true,
                        hasSubmissionDetails : true
                    },
                    "Design Reviewer" : {
                        hasAssigneeSelectorIcon : false,
                        hasAssigneeSelectorEnabled : false,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : false,
                        hasLabel : false,
                        hasRemarks : false,
                        hasSubmissionDetails : true
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
                    }
                },
                "Rejected" : {
                    "Admin" : {
                        hasAssigneeSelectorIcon : true,
                        hasAssigneeSelectorEnabled : false,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : false,
                        hasLabel : false,
                        hasRejectionReason : true,
                        hasScoreCard : true,
                    },
                    "Hiring Manager" : {
                        hasAssigneeSelectorIcon : true,
                        hasAssigneeSelectorEnabled : false,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : false,
                        hasLabel : false,
                        hasRejectionReason : true,
                        hasScoreCard : true,
                    },
                    "Design Reviewer" : {
                        hasAssigneeSelectorIcon : false,
                        hasAssigneeSelectorEnabled : false,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : false,
                        hasLabel : false,
                        hasRejectionReason : true,
                    },
                    "Candidate" : {
                        hasAssigneeSelectorIcon : false,
                        hasAssigneeSelectorEnabled : false,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : false,
                        hasLabel : false,
                        hasRejectionReason : true,
                    }
                },
                "Not Submitted" : {
                    "Admin" : {
                        hasAssigneeSelectorIcon : true,
                        hasAssigneeSelectorEnabled : false,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : false,
                        hasLabel : {
                            content : "The design task has not yet submitted by the candidate.",
                            icon : WarningIcon
                        },
                        hasRemarks : false,
                        hasScoreCard : false,
                        actions : false,
                        hasTaskDetails : true
                    },
                    "Hiring Manager" : {
                        hasAssigneeSelectorIcon : true,
                        hasAssigneeSelectorEnabled : false,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : false,
                        hasLabel : {
                            content : "The design task has not yet submitted by the candidate.",
                            icon : WarningIcon
                        },
                        hasRemarks : false,
                        hasScoreCard : false,
                        actions : false,
                        hasTaskDetails : true
                    },
                    "Design Reviewer" : {
                        hasAssigneeSelectorIcon : false,
                        hasAssigneeSelectorEnabled : false,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : false,
                        hasLabel : {
                            content : "The design task has been sent to the candidate. Please wait for the submission.",
                            icon : false
                        },
                        hasTaskDetails : true
                    },
                    "Candidate" : {
                        hasAssigneeSelectorIcon : false,
                        hasAssigneeSelectorEnabled : false,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : false,
                        hasLabel : {
                            content : "You have been assigned a design task. Please complete it and submit the link before the due date.",
                            icon : WarningIcon
                        },
                        hasTaskDetails : true,
                        hasSubmissionForm : true
                    }
                },
            }
        },
        {
            name : "Round 1",
            statuses : [
                'Pending', 'Call Scheduled', 'Not Assigned', 'Reviewed', 'Cleared', 'No Show', 'Rejected'
            ],
            score : 5,
            totalScore : 5,
            extraHeaderContent : false,
            contentConfig : {
                "Pending" : {
                    "Admin" : {
                        hasAssigneeSelectorIcon : true,
                        hasAssigneeSelectorEnabled : true,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : false,
                        hasLabel : {
                            content : "Call not scheduled. Please contact the candidate to schedule the screening call and update the details below",
                            icon : WarningIcon
                        },
                        hasRemarks : false,
                        hasScoreCard : false,
                        actions : false,
                        hasScheduledForm : true
                    },
                    "Hiring Manager" : {
                        hasAssigneeSelectorIcon : true,
                        hasAssigneeSelectorEnabled : true,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : false,
                        hasLabel : {
                            content : "Call not scheduled. Please contact the candidate to schedule the screening call and update the details below",
                            icon : WarningIcon
                        },
                        hasRemarks : false,
                        hasScoreCard : false,
                        actions : false,
                        hasScheduledForm : true
                    },
                    "Design Reviewer" : {
                        hasAssigneeSelectorIcon : false,
                        hasAssigneeSelectorEnabled : false,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : false,
                        hasLabel : {
                            content : "Waiting for the interview to be scheduled.",
                            icon : false
                        },
                        hasRemarks : false,
                        hasScoreCard : false
                    },
                    "Candidate" : {
                        hasAssigneeSelectorIcon : false,
                        hasAssigneeSelectorEnabled : false,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : false,
                        hasLabel : {
                            content : "Your interview is yet to be scheduled. We will notify you once it's scheduled.",
                            icon : WarningIcon
                        },
                        hasRemarks : false,
                        hasScoreCard : false,
                    }
                },
                "Call Scheduled" : {
                    "Admin" : {
                        hasAssigneeSelectorIcon : true,
                        hasAssigneeSelectorEnabled : true,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : false,
                        hasLabel : {
                            content : "The round 1 call has been scheduled. You can reschedule if needed.",
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
                    "Hiring Manager" : {
                        hasAssigneeSelectorIcon : true,
                        hasAssigneeSelectorEnabled : true,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : false,
                        hasLabel : {
                            content : "The round 1 call has been scheduled. You can reschedule if needed.",
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
                        hasBudgetLabel : false,
                        hasLabel : {
                            content : "The interview has been scheduled.",
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
                        hasBudgetLabel : false,
                        hasLabel : {
                            content : "Your interview has been scheduled. Please join using the link below at the scheduled time.",
                            icon : WarningIcon
                        },
                        hasRemarks : false,
                        hasScoreCard : false,
                        hasCallDetails : true,
                        hasCallHistory : false,
                    }
                },
                "No Show" : {
                    "Admin" : {
                        hasAssigneeSelectorIcon : true,
                        hasAssigneeSelectorEnabled : true,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : false,
                        hasLabel : {
                            content : "Candidate did not show up for the scheduled Round 1 call.",
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
                    "Hiring Manager" : {
                        hasAssigneeSelectorIcon : true,
                        hasAssigneeSelectorEnabled : true,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : false,
                        hasLabel : {
                            content : "Candidate did not show up for the scheduled Round 1 call.",
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
                        hasBudgetLabel : false,
                        hasLabel : {
                            content : "Candidate did not show up for the scheduled Round 1 call.",
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
                        hasBudgetLabel : false,
                        hasLabel : {
                            content : "You missed the scheduled round 1 call. Please contact the hiring team for further instructions.",
                            icon : WarningIcon
                        },
                        hasRemarks : false,
                        hasScoreCard : false,
                        hasCallDetails : false,
                        hasCallHistory : false,
                    }
                },
                "Under Review" : {
                    "Admin" : {
                        hasAssigneeSelectorIcon : true,
                        hasAssigneeSelectorEnabled : true,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : false,
                        hasLabel : {
                            content : "Round 1 interview is currently under review.",
                            icon : WarningIcon
                        },
                        hasRemarks : false,
                        hasScoreCard : false,
                        hasCallDetails : false,
                        hasCallHistory : false,
                        hasScheduledForm : false,
                        hasRatingComponent : true,
                        actions : {
                            hasNoShowAction : true,
                        }
                    },
                    "Hiring Manager" : {
                        hasAssigneeSelectorIcon : true,
                        hasAssigneeSelectorEnabled : true,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : false,
                        hasLabel : {
                            content : "Round 1 interview is currently under review.",
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
                        hasBudgetLabel : false,
                        hasLabel : {
                            content : "Please review the candidate’s performance and update the details below.",
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
                        hasBudgetLabel : false,
                        hasLabel : {
                            content : "Your interview is being reviewed. We will update you soon.",
                            icon : WarningIcon
                        },
                        hasRemarks : false,
                        hasScoreCard : false,
                        hasCallDetails : false,
                        hasCallHistory : false,
                    }
                },
                "Reviewed" : {
                    "Admin" : {
                        hasAssigneeSelectorIcon : true,
                        hasAssigneeSelectorEnabled : false,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : false,
                        hasLabel : false,
                        hasRemarks : true,
                        hasScoreCard : true,
                        hasCallDetails : false,
                        hasCallHistory : false,
                        hasScheduledForm : false,
                        actions : {
                            hasRejectAction : true,
                            hasMoveToNextRoundAction : true
                        }
                    },
                    "Hiring Manager" : {
                        hasAssigneeSelectorIcon : true,
                        hasAssigneeSelectorEnabled : false,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : false,
                        hasLabel : false,
                        hasRemarks : true,
                        hasScoreCard : true,
                        hasCallDetails : false,
                        hasCallHistory : false,
                        hasScheduledForm : false,
                        hasScheduledLabel : true,
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
                        hasRatingComponent : false,
                        hasRemarks : true,
                        hasScoreCard : true,
                        hasCallDetails : false,
                        hasCallHistory : false,
                    },
                    "Candidate" : {
                        hasAssigneeSelectorIcon : false,
                        hasAssigneeSelectorEnabled : false,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : false,
                        hasLabel : {
                            content : "Your interview has been reviewed. We will notify you of the next steps soon.",
                            icon : RightTick
                        },
                        hasRemarks : false,
                        hasScoreCard : false,
                        hasCallDetails : false,
                        hasCallHistory : false,
                    }
                },
                "Cleared" : {
                    "Admin" : {
                        hasAssigneeSelectorIcon : true,
                        hasAssigneeSelectorEnabled : false,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : false,
                        hasLabel : false,
                        hasRemarks : true,
                        hasScoreCard : true,
                        hasCallDetails : false,
                        hasCallHistory : true,
                        hasScheduledForm : false,
                        actions : false
                    },
                    "Hiring Manager" : {
                        hasAssigneeSelectorIcon : true,
                        hasAssigneeSelectorEnabled : false,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : false,
                        hasLabel : false,
                        hasRemarks : true,
                        hasScoreCard : true,
                        hasCallDetails : false,
                        hasCallHistory : true,
                        hasScheduledForm : false,
                        actions : false
                    },
                    "Design Reviewer" : {
                        hasAssigneeSelectorIcon : false,
                        hasAssigneeSelectorEnabled : false,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : false,
                        hasLabel : false,
                        hasRatingComponent : false,
                        hasRemarks : true,
                        hasScoreCard : true,
                        hasCallDetails : false,
                        hasCallHistory : false,
                    },
                    "Candidate" : {
                        hasAssigneeSelectorIcon : false,
                        hasAssigneeSelectorEnabled : false,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : false,
                        hasLabel : {
                            content : "Congratulations! You have cleared this round. We will contact you with further details.",
                            icon : RightTick
                        },
                        hasRemarks : false,
                        hasScoreCard : false,
                        hasCallDetails : false,
                        hasCallHistory : false,
                    }
                },
                "Rejected" : {
                    "Admin" : {
                        hasAssigneeSelectorIcon : true,
                        hasAssigneeSelectorEnabled : false,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : false,
                        hasLabel : false,
                        hasRemarks : false,
                        hasRejectionReason : true,
                        hasScoreCard : true,
                        hasCallDetails : false,
                        hasCallHistory : false,
                        hasScheduledForm : false,
                        actions : false
                    },
                    "Hiring Manager" : {
                        hasAssigneeSelectorIcon : true,
                        hasAssigneeSelectorEnabled : false,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : false,
                        hasLabel : false,
                        hasRemarks : false,
                        hasRejectionReason : true,
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
                        hasBudgetLabel : false,
                        hasLabel : false,
                        hasRatingComponent : false,
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
                        hasBudgetLabel : false,
                        hasLabel : {
                            content : "We regret to inform you that you have not been selected to move forward. Thank you for your time.",
                            icon : RejectCrossIcon
                        },
                        hasRemarks : false,
                        hasScoreCard : false,
                        hasCallDetails : false,
                        hasCallHistory : false,
                    }
                },
            }
        },
        {
            name : "Round 2",
            statuses : [
                'Pending', 'Call Scheduled', 'Not Assigned', 'Reviewed', 'Cleared', 'No Show', 'Rejected'
            ],
            score : 5,
            totalScore : 5,
            extraHeaderContent : false,
            contentConfig : {
                "Pending" : {
                    "Admin" : {
                        hasAssigneeSelectorIcon : true,
                        hasAssigneeSelectorEnabled : true,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : false,
                        hasLabel : {
                            content : "Call not scheduled. Please contact the candidate to schedule the round 2 call and update the details below",
                            icon : WarningIcon
                        },
                        hasRemarks : false,
                        hasScoreCard : false,
                        actions : false,
                        hasScheduledForm : true
                    },
                    "Hiring Manager" : {
                        hasAssigneeSelectorIcon : true,
                        hasAssigneeSelectorEnabled : true,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : false,
                        hasLabel : {
                            content : "Call not scheduled. Please contact the candidate to schedule the round 2 call and update the details below",
                            icon : WarningIcon
                        },
                        hasRemarks : false,
                        hasScoreCard : false,
                        actions : false,
                        hasScheduledForm : true
                    },
                    "Design Reviewer" : {
                        hasAssigneeSelectorIcon : false,
                        hasAssigneeSelectorEnabled : false,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : false,
                        hasLabel : {
                            content : "Waiting for the interview to be scheduled.",
                            icon : false
                        },
                        hasRemarks : false,
                        hasScoreCard : false
                    },
                    "Candidate" : {
                        hasAssigneeSelectorIcon : false,
                        hasAssigneeSelectorEnabled : false,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : false,
                        hasLabel : {
                            content : "Your interview is yet to be scheduled. We will notify you once it's scheduled.",
                            icon : WarningIcon
                        },
                        hasRemarks : false,
                        hasScoreCard : false,
                    }
                },
                "Call Scheduled" : {
                    "Admin" : {
                        hasAssigneeSelectorIcon : true,
                        hasAssigneeSelectorEnabled : true,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : false,
                        hasLabel : {
                            content : "The round 2 call has been scheduled. You can reschedule if needed.",
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
                    "Hiring Manager" : {
                        hasAssigneeSelectorIcon : true,
                        hasAssigneeSelectorEnabled : true,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : false,
                        hasLabel : {
                            content : "The round 2 call has been scheduled. You can reschedule if needed.",
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
                        hasBudgetLabel : false,
                        hasLabel : {
                            content : "The interview has been scheduled.",
                            icon : WarningIcon
                        },
                        hasRemarks : false,
                        hasScoreCard : false,
                    },
                    "Candidate" : {
                        hasAssigneeSelectorIcon : false,
                        hasAssigneeSelectorEnabled : false,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : false,
                        hasLabel : {
                            content : "The call has been scheduled. Please be prepared to discuss with the founder.",
                            icon : WarningIcon
                        },
                        hasRemarks : false,
                        hasScoreCard : false,
                        hasCallDetails : true,
                        hasCallHistory : false,
                    }
                },
                "No Show" : {
                    "Admin" : {
                        hasAssigneeSelectorIcon : true,
                        hasAssigneeSelectorEnabled : true,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : false,
                        hasLabel : {
                            content : "Candidate did not show up for the scheduled Round 2 call.",
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
                    "Hiring Manager" : {
                        hasAssigneeSelectorIcon : true,
                        hasAssigneeSelectorEnabled : true,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : false,
                        hasLabel : {
                            content : "Candidate did not show up for the scheduled Round 2 call.",
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
                        hasBudgetLabel : false,
                        hasLabel : {
                            content : "Candidate did not show up for the scheduled Round 2 call.",
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
                        hasBudgetLabel : false,
                        hasLabel : {
                            content : "You missed the scheduled Round 2 call. Please contact the hiring team for further instructions.",
                            icon : WarningIcon
                        },
                        hasRemarks : false,
                        hasScoreCard : false,
                        hasCallDetails : false,
                        hasCallHistory : false,
                    }
                },
                "Under Review" : {
                    "Admin" : {
                        hasAssigneeSelectorIcon : true,
                        hasAssigneeSelectorEnabled : true,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : false,
                        hasLabel : {
                            content : "Please review the candidate's performance and provide a score and feedback.",
                            icon : WarningIcon
                        },
                        hasRemarks : false,
                        hasScoreCard : false,
                        hasCallDetails : false,
                        hasCallHistory : false,
                        hasRatingComponent : true,
                    },
                    "Hiring Manager" : {
                        hasAssigneeSelectorIcon : true,
                        hasAssigneeSelectorEnabled : true,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : false,
                        hasLabel : {
                            content : "Please review the candidate's performance and provide a score and feedback.",
                            icon : WarningIcon
                        },
                        hasRemarks : false,
                        hasScoreCard : false,
                        hasCallDetails : false,
                        hasCallHistory : false,
                        hasRatingComponent : true,
                    },
                    "Design Reviewer" : {
                        hasAssigneeSelectorIcon : false,
                        hasAssigneeSelectorEnabled : false,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : false,
                        hasLabel : {
                            content : "Round 2 interview is currently under review.",
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
                        hasBudgetLabel : false,
                        hasLabel : {
                            content : "Your performance is currently being reviewed. We will notify you once the review is complete.",
                            icon : WarningIcon
                        },
                        hasRemarks : false,
                        hasScoreCard : false,
                        hasCallDetails : false,
                        hasCallHistory : false,
                    }
                },
                "Reviewed" : {
                    "Admin" : {
                        hasAssigneeSelectorIcon : true,
                        hasAssigneeSelectorEnabled : false,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : false,
                        hasLabel : false,
                        hasRemarks : true,
                        hasScoreCard : true,
                        hasCallDetails : false,
                        hasCallHistory : false,
                        hasScheduledForm : false,
                        actions : {
                            hasRejectAction : true,
                            hasMoveToNextRoundAction : true
                        }
                    },
                    "Hiring Manager" : {
                        hasAssigneeSelectorIcon : true,
                        hasAssigneeSelectorEnabled : false,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : false,
                        hasLabel : false,
                        hasRemarks : true,
                        hasScoreCard : true,
                        hasCallDetails : false,
                        hasCallHistory : false,
                        hasScheduledForm : false,
                        hasScheduledLabel : true,
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
                        hasRatingComponent : false,
                        hasRemarks : true,
                        hasScoreCard : true,
                        hasCallDetails : false,
                        hasCallHistory : false,
                    },
                    "Candidate" : {
                        hasAssigneeSelectorIcon : false,
                        hasAssigneeSelectorEnabled : false,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : false,
                        hasLabel : {
                            content : "Your interview has been reviewed. We will notify you of the next steps soon.",
                            icon : RightTick
                        },
                        hasRemarks : false,
                        hasScoreCard : false,
                        hasCallDetails : false,
                        hasCallHistory : false,
                    }
                },
                "Cleared" : {
                    "Admin" : {
                        hasAssigneeSelectorIcon : true,
                        hasAssigneeSelectorEnabled : false,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : false,
                        hasLabel : false,
                        hasRemarks : true,
                        hasScoreCard : true,
                        hasCallDetails : false,
                        hasCallHistory : true,
                        hasScheduledForm : false,
                        actions : false
                    },
                    "Hiring Manager" : {
                        hasAssigneeSelectorIcon : true,
                        hasAssigneeSelectorEnabled : false,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : false,
                        hasLabel : false,
                        hasRemarks : true,
                        hasScoreCard : true,
                        hasCallDetails : false,
                        hasCallHistory : true,
                        hasScheduledForm : false,
                        actions : false
                    },
                    "Design Reviewer" : {
                        hasAssigneeSelectorIcon : false,
                        hasAssigneeSelectorEnabled : false,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : false,
                        hasLabel : false,
                        hasRatingComponent : false,
                        hasRemarks : true,
                        hasScoreCard : true,
                        hasCallDetails : false,
                        hasCallHistory : false,
                    },
                    "Candidate" : {
                        hasAssigneeSelectorIcon : false,
                        hasAssigneeSelectorEnabled : false,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : false,
                        hasLabel : {
                            content : "Congratulations! You are now ready to move on to the next round. Our team will contact you soon with further details",
                            icon : RightTick
                        },
                        hasRemarks : false,
                        hasScoreCard : false,
                        hasCallDetails : false,
                        hasCallHistory : false,
                    }
                },
                "Rejected" : {
                    "Admin" : {
                        hasAssigneeSelectorIcon : true,
                        hasAssigneeSelectorEnabled : false,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : false,
                        hasLabel : false,
                        hasRemarks : false,
                        hasRejectionReason : true,
                        hasScoreCard : true,
                        hasCallDetails : false,
                        hasCallHistory : false,
                        hasScheduledForm : false,
                        actions : false
                    },
                    "Hiring Manager" : {
                        hasAssigneeSelectorIcon : true,
                        hasAssigneeSelectorEnabled : false,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : false,
                        hasLabel : false,
                        hasRemarks : false,
                        hasRejectionReason : true,
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
                        hasBudgetLabel : false,
                        hasLabel : false,
                        hasRatingComponent : false,
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
                        hasBudgetLabel : false,
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
        },
        {
            name : "Hired",
            statuses : [
                'Under Review', 'Offer Sent', 'Accepted', 'Rejected'
            ],
            score : 0,
            totalScore : 0,
            showGrandTotal : true,
            extraHeaderContent : false,
            contentConfig : {
                "Under Review" : {
                    "Admin" : {
                        hasAssigneeSelectorIcon : false,
                        hasAssigneeSelectorEnabled : false,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : false,
                        hasLabel : {
                            content : "Please confirm if the candidate was hired.",
                            icon : WarningIcon
                        },
                        hasRemarks : false,
                        hasScoreCard : true,
                        hasCallDetails : false,
                        hasCallHistory : false,
                        actions : {
                            hasRejectAction : true,
                            hasHiredAction : true
                        }
                    },
                    "Hiring Manager" : {
                        hasAssigneeSelectorIcon : false,
                        hasAssigneeSelectorEnabled : false,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : false,
                        hasLabel : {
                            content : "Please confirm if the candidate was hired.",
                            icon : WarningIcon
                        },
                        hasRemarks : false,
                        hasScoreCard : true,
                        hasCallDetails : false,
                        hasCallHistory : false,
                        actions : {
                            hasRejectAction : true,
                            hasHiredAction : true
                        }
                    },
                    "Design Reviewer" : {
                        hasAssigneeSelectorIcon : false,
                        hasAssigneeSelectorEnabled : false,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : false,
                        hasLabel : {
                            content : "Candidate's performance is now being reviewed.",
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
                        hasBudgetLabel : false,
                        hasLabel : {
                            content : "Your application is under review. Please wait while someone from our team contacts you",
                            icon : WarningIcon
                        },
                        hasRemarks : false,
                        hasScoreCard : false,
                        hasCallDetails : false,
                        hasCallHistory : false,
                    }
                },
                "Accepted" : {
                    "Admin" : {
                        hasAssigneeSelectorIcon : false,
                        hasAssigneeSelectorEnabled : false,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : false,
                        hasLabel : {
                            hasCustomContent : true,
                            content : 'Candidate hired for the role of ',
                            icon : RightTick
                        },
                        hasHiredLabel: true,
                        hasRemarks : false,
                        hasCallDetails : false,
                        hasCallHistory : false,
                    },
                    "Hiring Manager" : {
                        hasAssigneeSelectorIcon : false,
                        hasAssigneeSelectorEnabled : false,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : false,
                        hasLabel : {
                            hasCustomContent : true,
                            content : 'Candidate hired for the role of ',
                            icon : RightTick
                        },
                        hasHiredLabel: true,
                        hasRemarks : false,
                        hasCallDetails : false,
                        hasCallHistory : false,
                    },
                    "Design Reviewer" : {
                        hasAssigneeSelectorIcon : false,
                        hasAssigneeSelectorEnabled : false,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : false,
                        hasLabel : {
                            hasCustomContent : true,
                            content : "Candidate is hired for ",
                            icon : RightTick
                        },
                        hasHiredLabel: true,
                        hasRemarks : false,
                        hasScoreCard : false,
                        hasCallDetails : false,
                        hasCallHistory : false,
                    },
                    "Candidate" : {
                        hasAssigneeSelectorIcon : false,
                        hasAssigneeSelectorEnabled : false,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : false,
                        hasLabel : {
                            hasCustomContent : true,
                            content : 'Congratulations! You have been successfully hired as a ',
                            icon : RightTick
                        },
                        hasHiredLabel: true,
                        hasRemarks : false,
                        hasScoreCard : false,
                        hasCallDetails : false,
                        hasCallHistory : false,
                    }
                },
                "Rejected" : {
                    "Admin" : {
                        hasAssigneeSelectorIcon : false,
                        hasAssigneeSelectorEnabled : false,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : false,
                        hasLabel : false,
                        hasRejectionReason : true,
                        hasCallDetails : false,
                        hasCallHistory : false,
                    },
                    "Hiring Manager" : {
                        hasAssigneeSelectorIcon : false,
                        hasAssigneeSelectorEnabled : false,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : false,
                        hasLabel : false,
                        hasRejectionReason : true,
                        hasCallDetails : false,
                        hasCallHistory : false,
                    },
                    "Design Reviewer" : {
                        hasAssigneeSelectorIcon : false,
                        hasAssigneeSelectorEnabled : false,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : false,
                        hasLabel : false,
                        hasRejectionReason : true,
                        hasScoreCard : false,
                        hasCallDetails : false,
                        hasCallHistory : false,
                    },
                    "Candidate" : {
                        hasAssigneeSelectorIcon : false,
                        hasAssigneeSelectorEnabled : false,
                        hasAssigneeSelector : false,
                        hasBudgetLabel : false,
                        hasLabel : {
                            content : "Thank you for your interest. Unfortunately, we will not be moving forward with your application at this time. We encourage you to reapply in the future",
                            icon : RejectCrossIcon
                        },
                        hasRejectionReason : false,
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

export const getStageColor = (stage) => {
    switch (stage.toLowerCase()) {
      case 'portfolio':
        return 'rgb(59, 130, 246)';
      case 'screening':
        return 'rgb(234, 179, 8)';
      case 'design task':
        return 'rgb(168, 85, 247)';
      case 'round 1':
        return 'rgb(34, 197, 94)';
      case 'round 2':
        return 'rgb(249, 115, 22)';
      default:
        return 'rgb(255, 255, 255)';
    }
};

  export const maxScoreOfEachStage = (stageTitle) => {
    let totalScore = 0;
    stagingConfig["UI UX"].map(eachStage => {
        if(eachStage?.name === stageTitle){
            totalScore = eachStage?.totalScore;
        }
    })
    return totalScore
  }
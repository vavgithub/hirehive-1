import React from 'react';
import {
    Card,
    CardContent,
    CardActions,
    Typography,
    Box,
    Button,
    Avatar,
    IconButton
} from '@mui/material';
import StatusBadge from '../ui/StatusBadge';
import Label from '../ui/Label';
import WarningIcon from '../../svg/Staging/WarningIcon';
// import StatusBadge from '../ui/StatusBadge';

const PortfolioStage = ({ stageData, onAssign, onViewPortfolio, onReject, onMoveToNextRound }) => {
    const { status, assignedTo, score, remarks, rejectionReason } = stageData;

    const renderContent = () => {
        switch (status) {
            case 'Not Assigned':
                return (
                    <>
                        <Box display="flex" alignItems="center" my={1}>
                            {/* <WarningIcon color="warning" sx={{ mr: 1 }} /> */}
                            {/* <Typography variant="body2">
                            </Typography> */}
                            <Label icon={WarningIcon} text={"Candidate's portfolio has not yet been assigned to a reviewer."} />


                        </Box>
                        {/* <Typography variant="body2" color="text.secondary">
                            Received on {new Date(stageData.receivedDate).toLocaleDateString()}
                        </Typography> */}
                    </>
                );
            case 'Under review':
                return (
                    <Typography variant="body2">
                        Portfolio is currently under review by the design reviewer
                    </Typography>
                );
            case 'Reviewed':
                return (
                    <>
                        <Typography variant="body2" mb={2}>
                            {remarks}
                        </Typography>
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Typography variant="body2">Score</Typography>
                            <Typography variant="h4">{score} <small>out of 5</small></Typography>
                        </Box>
                    </>
                );
            case 'Cleared':
                return (
                    <>
                        <Typography variant="body2" mb={2}>
                            {remarks}
                        </Typography>
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Typography variant="body2">Score</Typography>
                            <Typography variant="h4">{score} <small>out of 5</small></Typography>
                        </Box>
                    </>
                );
            case 'Rejected':
                return (
                    <>
                        <Typography variant="body2" mb={2}>
                            Reason for rejection
                        </Typography>
                        <Typography variant="body1">
                            {rejectionReason}
                        </Typography>
                        <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                            <Typography variant="body2">Score</Typography>
                            <Typography variant="h4">{score} <small>out of 5</small></Typography>
                        </Box>
                    </>
                );
            default:
                return null;
        }
    };

    const renderActions = () => {
        switch (status) {
            case 'Not assigned':
                return (
                    <Button variant="contained" color="primary" onClick={onAssign}>
                        Assign Portfolio
                    </Button>
                );
            case 'Reviewed':
                return (
                    <>
                        <Button variant="contained" color="error" onClick={onReject}>
                            Reject
                        </Button>
                        <Button variant="contained" color="primary" onClick={onMoveToNextRound}>
                            Move to next round
                        </Button>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <Card
            sx={{
                backgroundColor: "rgba(22, 23, 24, 1)",
                borderRadius: "12px",
            }}
        >
            <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    {/* <Typography variant="h6"></Typography> */}
                    <div className='flex '>

                        <h3 className='typography-h3 mr-10'>Portfolio</h3>

                        <div className='flex gap-4 items-center'>

                            <div className='w-8 h-8 rounded-full bg-background-80 flex items-center justify-center'>
                            </div>
                            <a className='typography-body text-font-primary underline flex gap-2' href={"duumy"}>View Portfolio
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M18 13V19C18 19.5304 17.7893 20.0391 17.4142 20.4142C17.0391 20.7893 16.5304 21 16 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V8C3 7.46957 3.21071 6.96086 3.58579 6.58579C3.96086 6.21071 4.46957 6 5 6H11M15 3H21M21 3V9M21 3L10 14" stroke="#045FFD" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    <Box display="flex" alignItems="center">
                        <StatusBadge status={status} />
                        {assignedTo && <Avatar src={assignedTo.avatar} sx={{ ml: 1 }} />}
                    </Box>
                </Box>
                {renderContent()}
            </CardContent>
            <CardActions sx={{ justifyContent: 'space-between' }}>
                {renderActions()}
                {/* <IconButton color="primary" onClick={onViewPortfolio}>
                    <VisibilityIcon /> View Portfolio
                </IconButton> */}
            </CardActions>
        </Card>
    );
};

export default PortfolioStage;
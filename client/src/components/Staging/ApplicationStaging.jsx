import React, { useState, useEffect } from 'react';
import {
    Button,
    Card,
    CardContent,
    CardActions,
    Typography,
    LinearProgress,
    Box,
    Grid,
    Tab,
} from '@mui/material';
// import { Warning as WarningIcon } from '@mui/icons-material';
import StatusBadge from '../ui/StatusBadge';
import WarningIcon from '../../svg/Staging/WarningIcon';
import Portfolio from './Portfolio';

const StageProgressBar = ({ stageStatus, nextStageStatus }) => {
    const getProgressValue = (status) => {
        switch (status) {
            case 'Cleared':
                return 100;
            case 'Reviewed':
                return 75;
            case 'Under Review':
                return 50;
            case 'Not Assigned':
            case 'Pending':
                return 0;
            default:
                return 0;
        }
    };

    const progress = getProgressValue(stageStatus.status);

    return (
        <Box sx={{ width: '100%', mt: 1 }}>
            <LinearProgress variant="determinate" value={progress} />
        </Box>
    );
};

const StageCard = ({ stage, currentStage, stageStatus, onAssign, onViewPortfolio, allStages, applicationDate }) => {
    const isActive = stage === currentStage;
    const isCompleted = allStages.indexOf(stage) < allStages.indexOf(currentStage);

    const renderStageActions = () => {
        switch (stageStatus.status) {
            case 'Cleared':
                return (
                    <Button
                        variant="outlined"
                        size="small"
                        onClick={() => onViewPortfolio(stage)}
                    >
                        View {stage} Details
                    </Button>
                );
            case 'Pending':
                return (
                    <Button
                        variant="contained"
                        size="small"
                        onClick={() => onAssign(stage)}
                    >
                        Assign Reviewer
                    </Button>
                );
            case 'Under Review':
                return (
                    <Button
                        variant="contained"
                        size="small"
                        onClick={() => console.log(`Check ${stage} progress`)}
                    >
                        Check Progress
                    </Button>
                );
            // Add more cases for different statuses as needed
            default:
                return null;
        }
    };

    return (
        <Card
            variant="outlined"
            sx={{
                mb: 2,
                opacity: 1, // Always fully visible now
                border: isActive ? '2px solid primary.main' : '1px solid grey.300',
                backgroundColor: "rgba(22, 23, 24, 1)",
                borderRadius: "12px",
                color: "white",
                fontFamily: 'Outfit, sans-serif',
            }}
        >
            <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6" component="div">
                        {stage}
                    </Typography>
                    <div>
                        <StatusBadge status={stageStatus.status} />
                    </div>

                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', my: 1 }}>
                    {/* {isActive && <WarningIcon color="warning" sx={{ mr: 1 }} />} */}
                    {isActive && <WarningIcon />}
                    <Typography variant="body2">
                        {isActive
                            ? `Candidate's ${stage.toLowerCase()} is ${stageStatus.status.toLowerCase()}.`
                            : isCompleted
                                ? `This stage has been completed with status: ${stageStatus.status}`
                                : "This stage is not yet active."}
                    </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                    {isCompleted ? `Completed on ${new Date(stageStatus.completedDate).toLocaleDateString()}` :
                        `Received on ${new Date(applicationDate).toLocaleDateString()}`}
                </Typography>
            </CardContent>
            <CardActions>
                {renderStageActions()}
            </CardActions>
        </Card>
    );
};

const ApplicationStaging = ({ candidateData }) => {
    const [currentStage, setCurrentStage] = useState('');
    const [selectedStage, setSelectedStage] = useState('');

    const stages = Object.keys(candidateData.jobApplication.stageStatuses);

    useEffect(() => {
        // Set current stage
        const newCurrentStage = candidateData.jobApplication.currentStage || stages[0] || '';
        setCurrentStage(newCurrentStage);
        setSelectedStage(newCurrentStage);
    }, [candidateData, stages]);

    const handleAssign = (stage) => {
        // Implement assign logic
        console.log(`Assigning ${stage}`);
    };

    const handleViewPortfolio = (stage) => {
        // Implement view portfolio logic
        console.log(`Viewing ${stage}`);
    };

    const handleTabChange = (event, newValue) => {
        setSelectedStage(newValue);
    };
    const isStageAccessible = (stageIndex) => {
        const currentStageIndex = stages.indexOf(currentStage);
        return stageIndex <= currentStageIndex;
    };

    return (
        <Box>
            <Grid container alignItems="center" spacing={1}>
                {stages.map((stage, index) => (
                    <React.Fragment key={stage}>
                        <Grid item>
                            <Tab
                                label={stage}
                                value={stage}
                                disabled={!isStageAccessible(index)}
                                onClick={() => handleTabChange(null, stage)}
                                sx={{
                                    opacity: selectedStage === stage ? 1 : 0.7,
                                    fontWeight: selectedStage === stage ? 'bold' : 'normal',
                                    cursor: isStageAccessible(index) ? 'pointer' : 'not-allowed',
                                }}
                            />
                        </Grid>
                        {index < stages.length - 1 && (
                            <Grid item xs>
                                <StageProgressBar
                                    stageStatus={candidateData.jobApplication.stageStatuses[stage]}
                                    nextStageStatus={candidateData.jobApplication.stageStatuses[stages[index + 1]]}
                                />
                            </Grid>
                        )}
                    </React.Fragment>
                ))}
            </Grid>
            <Box mt={4}>
                {selectedStage === 'Portfolio' && (
                    <Portfolio
                        stageData={candidateData.jobApplication.stageStatuses.Portfolio}
                        candidateId={candidateData._id}
                        jobId={candidateData.jobApplication.jobId}
                        onViewPortfolio={() => handleViewPortfolio('Portfolio')}
                        onReject={() => handleReject('Portfolio')}
                        onMoveToNextRound={() => handleMoveToNextRound('Portfolio')}
                    />
                )}
            </Box>
        </Box>
    );
};

export default ApplicationStaging;
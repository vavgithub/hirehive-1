import React, { useState, useEffect } from 'react';
import { 
  Button, 
  Card, 
  CardContent, 
  CardActions, 
  Typography, 
  LinearProgress, 
  Select, 
  MenuItem, 
  Box,
  Tabs,
  Tab,
  Grid
} from '@mui/material';
import { Warning as WarningIcon } from '@mui/icons-material';

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

const StageCard = ({ stage, currentStage, stageStatus, onAssign, onViewPortfolio, onStatusChange, allStages, applicationDate }) => {
  const isActive = stage === currentStage;
  const isCompleted = allStages.indexOf(stage) < allStages.indexOf(currentStage);

  return (
    <Card 
      variant="outlined" 
      sx={{ 
        mb: 2, 
        opacity: isActive || isCompleted ? 1 : 0.5, 
        border: isActive ? '2px solid primary.main' : '1px solid grey.300'
      }}
    >
      <CardContent>
        <Typography variant="h6" component="div">
          {stage}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', my: 1 }}>
          {isActive ? (
            <WarningIcon color="warning" sx={{ mr: 1 }} />
          ) : isCompleted ? (
            <Typography variant="body2" color="success.main">Cleared</Typography>
          ) : null}
          <Typography variant="body2">
            {isActive 
              ? "Candidate's " + stage.toLowerCase() + " is under review."
              : isCompleted
              ? "This stage has been completed."
              : "This stage is not yet active."}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          Received on {new Date(applicationDate).toLocaleDateString()}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between' }}>
        <Box>
          {(isActive || isCompleted) && (
            <Button 
              variant="outlined" 
              size="small" 
              onClick={() => onViewPortfolio(stage)}
              sx={{ mr: 1 }}
            >
              View {stage}
            </Button>
          )}
          {isActive && (
            <Button 
              variant="contained" 
              size="small" 
              onClick={() => onAssign(stage)}
            >
              Assign {stage}
            </Button>
          )}
        </Box>
        {isActive && (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body2" sx={{ mr: 1 }}>
              Status:
            </Typography>
            <Select
              value={stageStatus.status}
              onChange={(e) => onStatusChange(stage, e.target.value)}
              size="small"
            >
              <MenuItem value="Not Assigned">Not Assigned</MenuItem>
              <MenuItem value="Under Review">Under Review</MenuItem>
              <MenuItem value="Reviewed">Reviewed</MenuItem>
              <MenuItem value="Cleared">Cleared</MenuItem>
              <MenuItem value="Rejected">Rejected</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Call Scheduled">Call Scheduled</MenuItem>
              <MenuItem value="No Show">No Show</MenuItem>
              <MenuItem value="Sent">Sent</MenuItem>
              <MenuItem value="Not Submitted">Not Submitted</MenuItem>
            </Select>
          </Box>
        )}
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

  const handleStatusChange = (stage, newStatus) => {
    // This function should update the status in your backend
    console.log(`Updating status for ${stage} to ${newStatus}`);
    
    if (newStatus === 'Cleared') {
      const nextStageIndex = stages.indexOf(stage) + 1;
      if (nextStageIndex < stages.length) {
        setCurrentStage(stages[nextStageIndex]);
        setSelectedStage(stages[nextStageIndex]);
      }
    }
  };

  const handleTabChange = (event, newValue) => {
    setSelectedStage(newValue);
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
                disabled={index > stages.indexOf(currentStage)}
                onClick={() => handleTabChange(null, stage)}
                sx={{
                  opacity: selectedStage === stage ? 1 : 0.7,
                  fontWeight: selectedStage === stage ? 'bold' : 'normal',
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
        {stages.map(stage => {
          const stageStatus = candidateData.jobApplication.stageStatuses[stage];
          const isCompleted = stages.indexOf(stage) < stages.indexOf(currentStage);
          const shouldDisplay = stage === selectedStage || stage === currentStage;

          return shouldDisplay ? (
            <StageCard
              key={stage}
              stage={stage}
              currentStage={currentStage}
              stageStatus={stageStatus}
              onAssign={handleAssign}
              onViewPortfolio={handleViewPortfolio}
              onStatusChange={handleStatusChange}
              allStages={stages}
              applicationDate={candidateData.jobApplication.applicationDate}
            />
          ) : null;
        })}
      </Box>
    </Box>
  );
};

export default ApplicationStaging;
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
  Box 
} from '@mui/material';
import { Warning as WarningIcon } from '@mui/icons-material';

const StageCard = ({ stage, currentStage, stageStatus, onAssign, onViewPortfolio, onStatusChange, allStages, applicationDate }) => {
  const isActive = stage === currentStage;
  const isCompleted = allStages.indexOf(stage) < allStages.indexOf(currentStage);

  return (
    <Card 
      variant="outlined" 
      sx={{ 
        mb: 2, 
        opacity: isActive ? 1 : 0.5, 
        border: isActive ? '2px solid primary.main' : '1px solid grey.300'
      }}
    >
      <CardContent>
        <Typography variant="h6" component="div">
          {stage}
        </Typography>
        {isActive && (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center', my: 1 }}>
              <WarningIcon color="warning" sx={{ mr: 1 }} />
              <Typography variant="body2">
                Candidate's {stage.toLowerCase()} has not yet been assigned to a reviewer.
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Received on {new Date(applicationDate).toLocaleDateString()}
            </Typography>
          </>
        )}
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between' }}>
        <Box>
          {isActive && (
            <>
              <Button 
                variant="outlined" 
                size="small" 
                onClick={() => onViewPortfolio(stage)}
                sx={{ mr: 1 }}
              >
                View {stage}
              </Button>
              <Button 
                variant="contained" 
                size="small" 
                onClick={() => onAssign(stage)}
              >
                Assign {stage}
              </Button>
            </>
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
  const [progress, setProgress] = useState(0);

  const stages = Object.keys(candidateData.jobApplication.stageStatuses);

  useEffect(() => {
    // Set current stage
    setCurrentStage(candidateData.jobApplication.currentStage || stages[0] || '');

    // Calculate progress
    const currentStageIndex = stages.indexOf(currentStage);
    setProgress((currentStageIndex / (stages.length - 1)) * 100);
  }, [candidateData, stages, currentStage]);

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
      }
    }
  };

  return (
    <Box>
      <LinearProgress variant="determinate" value={progress} sx={{ mb: 2 }} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        {stages.map((stage, index) => (
          <Typography 
            key={stage} 
            variant="body2" 
            sx={{ 
              color: index <= stages.indexOf(currentStage) ? 'primary.main' : 'text.disabled'
            }}
          >
            {stage}
          </Typography>
        ))}
      </Box>
      {stages.map(stage => (
        <StageCard
          key={stage}
          stage={stage}
          currentStage={currentStage}
          stageStatus={candidateData.jobApplication.stageStatuses[stage]}
          onAssign={handleAssign}
          onViewPortfolio={handleViewPortfolio}
          onStatusChange={handleStatusChange}
          allStages={stages}
          applicationDate={candidateData.jobApplication.applicationDate}
        />
      ))}
    </Box>
  );
};

export default ApplicationStaging;
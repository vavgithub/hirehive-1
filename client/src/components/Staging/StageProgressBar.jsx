import React from 'react';
import { LinearProgress, Typography, Box } from '@mui/material';
import { CircleAlertIcon, UnlockIcon } from 'lucide-react';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

const StageProgressBar = ({ stage, status, isActive }) => {
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

    const progress = getProgressValue(status);

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            maxWidth: 200,
            m: 1,
        }}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                mb: 1,
                color: isActive ? 'primary.main' : 'text.secondary',
            }}>
                {/* {status === 'Cleared' ? (
                    //   <CheckCircleIcon color="success" sx={{ mr: 1 }} />
                    <CircleAlertIcon />
                ) : (
                    <UnlockIcon />
                    //   <RadioButtonUncheckedIcon sx={{ mr: 1 }} />
                )}
                <Typography variant="body2" sx={{ fontWeight: isActive ? 'bold' : 'normal' }}>
                    {stage}
                </Typography> */}
            </Box>
            <LinearProgress
                variant="determinate"
                value={progress}
                sx={{
                    width: '100%',
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: 'background.paper',
                    '& .MuiLinearProgress-bar': {
                        backgroundColor: isActive ? 'primary.main' : 'grey.500',
                    },
                }}
            />
            {/* <Typography variant="caption" sx={{ mt: 0.5, color: 'text.secondary' }}>
                {status}
            </Typography> */}
        </Box>
    );
};

export default StageProgressBar;
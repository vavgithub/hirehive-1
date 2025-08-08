import React from 'react';
import { LinearProgress, Typography, Box } from '@mui/material';

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
            case 'Call Scheduled':
                return 20;
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
                    height: 4,
                    borderRadius: 4,
                    backgroundColor: 'var(--color-background-40)',
                    '& .MuiLinearProgress-bar': {
                        backgroundColor: isActive ? 'var(--color-accent-100)' : 'var(--color-accent-100)',
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
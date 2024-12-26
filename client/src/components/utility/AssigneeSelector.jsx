import React, { useState, useEffect } from 'react';
import {
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  CircularProgress,
  TextField,
  ListItemAvatar,
  ListItemText,
  InputAdornment,
  Box,
  Autocomplete,
} from '@mui/material';
import { fetchAvailableDesignReviewers } from '../../api/authApi';
import SearchIcon from '../../svg/SearchIcon';
// import SearchIcon from '@mui/icons-material/Search';

const AssigneeSelector = ({ mode = 'icon', value, onChange, onSelect, disabled = false , error}) => {
  const [reviewers, setReviewers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedReviewer, setSelectedReviewer] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch reviewers on component mount
  useEffect(() => {
    const loadReviewers = async () => {
      try {
        setIsLoading(true);
        const data = await fetchAvailableDesignReviewers();
        setReviewers(data);
      } catch (error) {
        console.error('Error fetching design reviewers:', error);
        setReviewers([]);
      } finally {
        setIsLoading(false);
      }
    };
    loadReviewers();
  }, []);

  // Update selected reviewer when value or reviewers change
  useEffect(() => {
    if (value && reviewers.length > 0) {
      const reviewer = reviewers.find(r => r._id === value || r._id === value._id);
      setSelectedReviewer(reviewer || null);
    } else {
      setSelectedReviewer(null);
    }
  }, [value, reviewers]);

  // Handle selection change
  const handleSelect = (reviewer) => {
    if (!disabled) {
      setSelectedReviewer(reviewer);
      if (onChange) onChange(reviewer);
      if (onSelect) onSelect(reviewer);
      handleClose();
    }
  };

  // Menu open and close handlers
  const handleClick = (event) => {
    if (!disabled) {
      setAnchorEl(event.currentTarget);
      setSearchTerm('');
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // Filtered reviewers based on search term
  const filteredReviewers = reviewers.filter(reviewer =>
    reviewer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Render for 'icon' mode
  if (mode === 'icon') {
    return (
      <>
        <IconButton sx={{padding : "0 8px"}} onClick={handleClick} size="small" disabled={disabled}>
          {selectedReviewer ? (
            <Avatar src={selectedReviewer.profilePicture} sx={{ width: 32, height: 32 }}>
              {selectedReviewer.name[0].toUpperCase()}
            </Avatar>
          ) : (
            // Render your own icon here
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="16" fill="#1B1C1D" />
              <path d="M18.6641 22V20.6667C18.6641 19.9594 18.3831 19.2811 17.883 18.7811C17.3829 18.281 16.7046 18 15.9974 18H11.3307C10.6235 18 9.94521 18.281 9.44511 18.7811C8.94501 19.2811 8.66406 19.9594 8.66406 20.6667V22M21.3307 13.3333V17.3333M23.3307 15.3333H19.3307M16.3307 12.6667C16.3307 14.1394 15.1368 15.3333 13.6641 15.3333C12.1913 15.3333 10.9974 14.1394 10.9974 12.6667C10.9974 11.1939 12.1913 10 13.6641 10C15.1368 10 16.3307 11.1939 16.3307 12.6667Z" stroke="white" strokeWidth="0.825" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          PaperProps={{
            style: { maxHeight: 300, width: '250px' },
          }}
          sx={{
            "& .MuiList-root": {
              backgroundColor: 'rgba(12, 13, 13, 1)',
              color: "white",
              font: "Outfit"
            }
          }}
          MenuListProps={{
            style: { paddingTop: 0, paddingBottom: 0 },
          }}
        >
          <Box sx={{ padding: 1 }}>
            <TextField
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              fullWidth
              variant="outlined"
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {/* <SearchIcon /> */}
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          {isLoading ? (
            <MenuItem>
              <CircularProgress size={24} />
            </MenuItem>
          ) : filteredReviewers.length > 0 ? (
            filteredReviewers.map((reviewer) => (
              <MenuItem
                key={reviewer._id}
                onClick={() => handleSelect(reviewer)}
              >
                <ListItemAvatar>
                  <Avatar src={reviewer.profilePicture} sx={{ width: 32, height: 32 }}>
                    {reviewer.name[0].toUpperCase()}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={reviewer.name} />
              </MenuItem>
            ))
          ) : (
            <MenuItem>No reviewers found</MenuItem>
          )}
        </Menu>
      </>
    );
  }

  // For 'default' mode
  return (
    <Autocomplete
      options={reviewers}
      getOptionLabel={(option) => option.name || ''}
      loading={isLoading}
      value={selectedReviewer}
      onChange={(event, newValue) => handleSelect(newValue)}
      ListboxProps={{
        sx: {
          backgroundColor: 'black', // Set the background color of the list
          "& .MuiInputBase-root": {
              padding: "0px !important", // Override the default padding
            },
        },
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder='Select Reviewer'
          variant="outlined" // Keep the variant as 'outlined' if you prefer
          InputLabelProps={{
            shrink: false, // Prevent the label from shrinking
            style: { display: 'none' }, // Hide the label visually
          }}
          sx={{
            "& .MuiInputBase-input": {
              color: "white",
              fontFamily: "Outfit",
              ...(error ? {border : "1px solid red"} : {})
            },
            "& .MuiOutlinedInput-root": {
              padding: "0px !important",
              "& fieldset": {
                border: "none",
              },
              "& .MuiAutocomplete-input": {  // Add this to target the Autocomplete input specifically
                padding: "0px 0px 0px 8px !important",  // Left padding of 8px, 0px for others
              }
            },
            "& .Mui-focused": {
              "& fieldset": {
                border: "1px solid rgb(24, 233, 208) !important",
                borderRadius : "0.75rem !important"
              },
            }
          }}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
            startAdornment: (
              <>
                {/* <Avatar src={selectedReviewer?.profilePicture} sx={{ width: 24, height: 24, marginRight: 1 }}>
                  {selectedReviewer ? selectedReviewer.name[0].toUpperCase() : (
                    // Render your own icon here
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                      <rect width="32" height="32" rx="16" fill="#1B1C1D" />
                      <path d="M18.6641 22V20.6667C18.6641 19.9594 18.3831 19.2811 17.883 18.7811C17.3829 18.281 16.7046 18 15.9974 18H11.3307C10.6235 18 9.94521 18.281 9.44511 18.7811C8.94501 19.2811 8.66406 19.9594 8.66406 20.6667V22M21.3307 13.3333V17.3333M23.3307 15.3333H19.3307M16.3307 12.6667C16.3307 14.1394 15.1368 15.3333 13.6641 15.3333C12.1913 15.3333 10.9974 14.1394 10.9974 12.6667C10.9974 11.1939 12.1913 10 13.6641 10C15.1368 10 16.3307 11.1939 16.3307 12.6667Z" stroke="white" strokeWidth="0.825" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </Avatar> */}
                {params.InputProps.startAdornment}
              </>
            ),
          }}
        />
      )}
      renderOption={(props, option) => (
        <MenuItem
          {...props}
          key={option._id}
          sx={{
            backgroundColor: 'black', // Set the background color of each option
            color: 'white',           // Set the text color of each option
            fontFamily: 'Outfit',
            '&:hover': {
              backgroundColor: 'gray', // Optional: Change background on hover
            },
            '&.Mui-selected': {
              backgroundColor: 'darkgray', // Optional: Change background when selected
            },
            '& .MuiOutlinedInput-input': {
              padding: '0px 10px',
            },
          }}
        >
          <ListItemAvatar>
            <Avatar src={option?.profilePicture} sx={{ width: 32, height: 32 }}>
              {option.name[0].toUpperCase()}
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={option.name} />
        </MenuItem>
      )}
    />

  );
};

export default AssigneeSelector;

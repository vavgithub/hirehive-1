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
import { fetchAllDesignReviewers, fetchAvailableDesignReviewers } from '../../services/auth.service';
import { useQuery } from '@tanstack/react-query';
import IconWrapper from '../Cards/IconWrapper';
import { Search, UserRoundPlus } from 'lucide-react';


const AssigneeSelector = ({ mode = 'icon', value, onChange, onSelect, disabled = false , error , selectedAnchor , closeSelectedAnchor , autoFill = false , previousAssigneeId = null, stackedValues = [], fullWidth = false }) => {
  const [reviewers, setReviewers] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  const [selectedReviewer, setSelectedReviewer] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch reviewers on component mount
  // useEffect(() => {
  //   const loadReviewers = async () => {
  //     try {
  //       setIsLoading(true);
  //       const data = await fetchAvailableDesignReviewers();
  //       setReviewers(data);
  //     } catch (error) {
  //       console.error('Error fetching design reviewers:', error);
  //       setReviewers([]);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //   loadReviewers();
  // }, []);


  const { data: designReviewers, isLoading } = useQuery({
    queryKey: ['getAllDesignReviewers'],
    queryFn: () => fetchAllDesignReviewers(),
  });

  useEffect(()=>{
    if(designReviewers && designReviewers?.data?.length > 0){
      setReviewers(designReviewers?.data)
    }else{
      setReviewers([])
    }
  },[designReviewers])

  useEffect(()=>{
    if(autoFill && previousAssigneeId){
      handleSelect(reviewers?.find(r => r._id === previousAssigneeId))
    }
  },[reviewers,autoFill,previousAssigneeId])

  // Update selected reviewer when value or reviewers change
  useEffect(() => {
    if (value && reviewers.length > 0) {
      const reviewer = reviewers.find(r => r._id === value || r._id === value._id);
      setSelectedReviewer(reviewer || (designReviewers?.admin?._id === (value || value?._id) ? designReviewers?.admin : null) || null);
    } else {
      setSelectedReviewer(null);
    }
  }, [value, reviewers , designReviewers]);

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
    if(closeSelectedAnchor){
      closeSelectedAnchor(null);
    }
    setAnchorEl(null);
  };
  // Filtered reviewers based on search term
  const filteredReviewers = reviewers?.length  > 0 ? reviewers.filter(reviewer =>
    `${reviewer.firstName + " " + reviewer?.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  // Render for 'icon' mode
  if (mode === 'icon') {
    const stackedReviewerObjects = (Array.isArray(stackedValues) ? stackedValues : [])
      .map((v) => {
        const id = typeof v === 'string' ? v : v?._id || v;
        return reviewers.find(r => r._id === id) || (designReviewers?.admin?._id === id ? designReviewers?.admin : null) || null;
      })
      .filter(Boolean);
    const stackedCount = Math.min(stackedReviewerObjects.length, 3);
    const STACK_AVATAR_SIZE = 32;
    const STACK_OVERLAP = 10; // how much each avatar overlaps the previous
    const stackedWidth = stackedCount * STACK_AVATAR_SIZE - Math.max(0, stackedCount - 1) * STACK_OVERLAP;

    return (
      <>
        <IconButton sx={{ margin: 0, padding: "0 0 0 0" }} onClick={handleClick} size="small" disabled={disabled}>
          {stackedReviewerObjects.length > 1 ? (
            <Box sx={{ display: 'flex', alignItems: 'center', height: STACK_AVATAR_SIZE, minWidth: stackedWidth }}>
              {stackedReviewerObjects.slice(0, 3).map((rev, idx) => (
                <Avatar
                  key={rev._id || idx}
                  src={rev.profilePicture}
                  sx={{
                    width: STACK_AVATAR_SIZE,
                    height: STACK_AVATAR_SIZE,
                    ml: idx === 0 ? 0 : `-${STACK_OVERLAP}px`,
                    border: '2px solid var(--color-background-100)',
                    bgcolor: rev?.profilePicture ? undefined : '#e0e0e0',
                    color: rev?.profilePicture ? undefined : '#111111',
                    fontSize: 12,
                  }}
                >
                  {rev?.firstName?.[0]?.toUpperCase?.() || '?'}
                </Avatar>
              ))}
            </Box>
          ) : selectedReviewer ? (
            <Avatar src={selectedReviewer.profilePicture} sx={{ width: 32, height: 32 }}>
              {selectedReviewer.firstName[0].toUpperCase()}
            </Avatar>
          ) : (
            <div className={'rounded-full bg-background-70 ' + (!disabled && 'hover-outline')}>
              <IconWrapper icon={UserRoundPlus} customIconSize={2}  size={3} />
            </div>
          )}
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          PaperProps={{
            style: { maxHeight: 300, width: '15.6rem' ,boxShadow: '3px 5px 50px rgba(25, 25, 25, 0.75)', borderRadius : "0.75rem",

            },
          }}

        >
          <Box sx={{
            position : "sticky",
            top : "0",
            zIndex : "15"
          }}>
            <TextField
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              fullWidth
              variant="outlined"
              size="small"
              sx={{
                boxSizing:"border-box",
                '& .MuiOutlinedInput-input' : {
                  height : "2.75rem !important",
                  padding : "0px 2.5rem"
                },
                '& .css-1n4twyu-MuiInputBase-input-MuiOutlinedInput-input' :{
                  height : "2.75rem !important",
                  padding : "0px 2.5rem"
                },
                '& .css-1ua80n0-MuiInputBase-input-MuiOutlinedInput-input' : {
                  height : "2.75rem !important",
                  padding : "0px 2.5rem"
                },
                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(24, 233, 208, 1) !important', // Change the outline color on focus
                },
              }}
              InputProps={{
                // startAdornment: (
                //   <InputAdornment style={{background : "transparent"}} position="start">
                //     <SearchIcon />
                //   </InputAdornment>
                // ),
                style : {
                  color : "var(--color-font-main)",
                  height : "2.75rem",
                  borderRadius : "0.75rem",
                }
              }}
            />
            <div className='absolute top-[0.6rem] left-2'>
              <IconWrapper icon={Search} size={0} customIconSize={3} isInActiveIcon />
            </div>
          </Box>
          {isLoading ? (
            <MenuItem>
              <CircularProgress size={24} />
            </MenuItem>
          ) : filteredReviewers.length > 0 ? (
            filteredReviewers.map((reviewer) => (
              <MenuItem
                selected={reviewer?._id === selectedReviewer?._id}
                sx={{
                  padding :"0.375rem 1rem", 
                  borderRadius : "0.75rem",
                }}
                key={reviewer._id}
                onClick={() => handleSelect(reviewer)}
              >
                <ListItemAvatar>
                  <Avatar src={reviewer.profilePicture} 
                  // sx={{ width: 32, height: 32 }}
                  >
                    {reviewer.firstName[0].toUpperCase()}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                primaryTypographyProps={{
                  component : 'span'
                }}
                // sx={{
                //   "& .MuiTypography-root": {
                //     fontFamily: "Outfit", // Apply the custom font explicitly to the Typography
                //   },
                // }}
                primary={reviewer?.firstName + " " + reviewer?.lastName} />
              </MenuItem>
            ))
          ) : (
            <MenuItem>No reviewers found</MenuItem>
          )}
        </Menu>
      </>
    );
  }

  //Render mode is dropdown only
  if (mode === 'dropdown') {
    return (
      <>
        <Menu
          anchorEl={selectedAnchor}
          open={Boolean(selectedAnchor)}
          onClose={handleClose}
          PaperProps={{
            style: { maxHeight: 300, width: '250px' ,boxShadow: '3px 5px 50px rgba(25, 25, 25, 0.75)', borderRadius : "0.75rem",padding : "0.5rem",

            },
          }}
         
        >
          <Box sx={{ position:"relative"}}>
            <TextField
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              fullWidth
              variant="outlined"
              size="small"
              sx={{
                boxSizing:"border-box",
                '& .MuiOutlinedInput-input' : {
                  height : "2.75rem !important",
                  padding : "0px 2.5rem"
                },
                '& .css-1n4twyu-MuiInputBase-input-MuiOutlinedInput-input' :{
                  height : "2.75rem !important",
                  padding : "0px 2.5rem"
                },
                '& .css-1ua80n0-MuiInputBase-input-MuiOutlinedInput-input' : {
                  height : "2.75rem !important",
                  padding : "0px 2.5rem"
                },
                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(24, 233, 208, 1) !important', // Change the outline color on focus
                },
              }}
              InputProps={{
                // startAdornment: (
                //   <InputAdornment style={{background : "transparent"}} position="start">
                //     <SearchIcon />
                //   </InputAdornment>
                // ),
                style : {
                  color : "var(--color-font-main)",
                  height : "2.75rem",
                  borderRadius : "0.75rem",
                }
              }}
            />
            <div className='absolute top-[0.6rem] left-2'>
              <IconWrapper icon={Search} size={0} customIconSize={3} isInActiveIcon />
            </div>
          </Box>
          {isLoading ? (
            <MenuItem>
              <CircularProgress size={24} />
            </MenuItem>
          ) : filteredReviewers.length > 0 ? (
            filteredReviewers.map((reviewer) => (
              <MenuItem
                selected={reviewer?._id === selectedReviewer?._id}
                sx={{
                  margin : "0.5rem 0px !important",
                  padding :"0.375rem 1rem", 
                  borderRadius : "0.75rem",
                }}
                key={reviewer._id}
                onClick={() => handleSelect(reviewer)}
              >
                <ListItemAvatar>
                  <Avatar src={reviewer.profilePicture} 
                  // sx={{ width: 32, height: 32 }}
                  >
                    {reviewer.firstName[0].toUpperCase()}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                primaryTypographyProps={{
                  component : 'span'
                }}
                primary={reviewer?.firstName + " " + reviewer?.lastName} />
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
      fullWidth={fullWidth}
      options={reviewers}
      getOptionLabel={(option) => option.firstName + " " + option.lastName || ''}
      loading={isLoading}
      value={selectedReviewer}
      onChange={(event, newValue) => handleSelect(newValue)}
      noOptionsText={
        <MenuItem
        >
          No reviewers found
        </MenuItem>
      }
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder='Select Reviewer'
          variant="outlined" // Keep the variant as 'outlined' if you prefer
          sx={{
              '& .MuiOutlinedInput-input' : {
                  backgroundColor : 'var(--color-background-80) !important',
              },
          }}
          InputLabelProps={{
            shrink: false, // Prevent the label from shrinking
            style: { display: 'none' }, // Hide the label visually
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
          selected={option?._id === selectedReviewer?._id}
          sx={{
            color: 'var(--color-font-main)',           // Set the text color of each option
            margin : "0.25rem 0px",
          }}
        >
          <ListItemAvatar>
            <Avatar src={option?.profilePicture} 
            // sx={{ width: 32, height: 32 }}
            >
              {option.firstName[0].toUpperCase()}
            </Avatar>
          </ListItemAvatar>
          <ListItemText
          primary={option?.firstName + " " + option?.lastName} />
        </MenuItem>
      )}
    />

  );
};

export default AssigneeSelector;

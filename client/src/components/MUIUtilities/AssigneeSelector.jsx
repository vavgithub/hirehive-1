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
import { fetchAllDesignReviewers, fetchAvailableDesignReviewers } from '../../api/authApi';
import { useQuery } from '@tanstack/react-query';
import IconWrapper from '../Cards/IconWrapper';
import { Search, UserRoundPlus } from 'lucide-react';


const AssigneeSelector = ({ mode = 'icon', value, onChange, onSelect, disabled = false , error , selectedAnchor , closeSelectedAnchor , autoFill = false , previousAssigneeId = null}) => {
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
    reviewer.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

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
            <div className={'rounded-full bg-background-70 ' + (!disabled && 'hover:bg-background-60')}>
              <IconWrapper icon={UserRoundPlus} customIconSize={2}  size={3} />
            </div>
          )}
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          PaperProps={{
            style: { maxHeight: 300, width: '250px' ,boxShadow: '3px 5px 50px rgba(25, 25, 25, 0.75)', borderRadius : "12px",padding : "8px",backgroundColor: 'black',

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
                  height : "44px !important",
                  padding : "0px 40px"
                },
                '& .css-1n4twyu-MuiInputBase-input-MuiOutlinedInput-input' :{
                  height : "44px !important",
                  padding : "0px 40px"
                },
                '& .css-1ua80n0-MuiInputBase-input-MuiOutlinedInput-input' : {
                  height : "44px !important",
                  padding : "0px 40px"
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
                  color : "white",
                  height : "44px",
                  borderRadius : "12px",
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
                  margin : "8px 0px !important",
                  padding :"6px 16px", 
                  borderRadius : "12px",
                }}
                key={reviewer._id}
                onClick={() => handleSelect(reviewer)}
              >
                <ListItemAvatar>
                  <Avatar src={reviewer.profilePicture} 
                  // sx={{ width: 32, height: 32 }}
                  >
                    {reviewer.name[0].toUpperCase()}
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
                primary={reviewer.name} />
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
          // PaperProps={{
          //   style: { maxHeight: 300, width: '250px' ,boxShadow: '3px 5px 50px rgba(25, 25, 25, 0.75)', borderRadius : "12px",padding : "8px",backgroundColor: 'rgba(12, 13, 13, 1)'},
          // }}
          // sx={{
          //   "& .MuiList-root": {
          //     backgroundColor: 'rgba(12, 13, 13, 1)',
          //     color: "white",
          //     font: "Outfit",
          //     padding : "0px "
          //   },
          // }}
        >
          <Box sx={{ position:"relative"}}>
            <TextField
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              fullWidth
              variant="outlined"
              size="small"
              // sx={{
              //   boxSizing:"border-box",
              //   '& .MuiOutlinedInput-input' : {
              //     height : "44px !important",
              //     padding : "0px 40px"
              //   },
              //   '& .css-1n4twyu-MuiInputBase-input-MuiOutlinedInput-input' :{
              //     height : "44px !important",
              //     padding : "0px 40px"
              //   },
              //   '& .css-1ua80n0-MuiInputBase-input-MuiOutlinedInput-input' : {
              //     height : "44px !important",
              //     padding : "0px 40px"
              //   },
              //   '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
              //     borderColor: 'rgba(24, 233, 208, 1) !important', // Change the outline color on focus
              //   },
              // }}
              // InputProps={{
              //   // startAdornment: (
              //   //   <InputAdornment style={{background : "transparent"}} position="start">
              //   //     <SearchIcon />
              //   //   </InputAdornment>
              //   // ),
              //   style : {
              //     color : "white",
              //     height : "44px",
              //     borderRadius : "12px",
              //   }
              // }}
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
                // sx={{
                //   margin : "8px 0px !important",
                //   padding :"8px 16px",
                //   borderRadius : "12px",
                //   ':hover' :{
                //     background :"rgba(35,36,37,1)"
                //   },
                //   ':hover .MuiTypography-root' :{
                //     color :"rgba(24,233,208,1)"
                //   },
                //   '&.Mui-selected': {
                //     background: "rgba(24,233,208,0.1) !important", // Red background for selected item
                //   },
                //   '&.Mui-selected:hover' : {
                //     background :"rgba(35,36,37,1) !important"
                //   },
                //   '&.Mui-selected span': {
                //     color: "rgba(24,233,208,1) !important", // Slightly darker red on hover
                //   },
                // }}
                key={reviewer._id}
                onClick={() => handleSelect(reviewer)}
              >
                <ListItemAvatar>
                  <Avatar src={reviewer.profilePicture} 
                  // sx={{ width: 32, height: 32 }}
                  >
                    {reviewer.name[0].toUpperCase()}
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
                primary={reviewer.name} />
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
      // ListboxProps={{
      //   sx: {
      //     padding : "0px !important",
      //     backgroundColor: 'black', // Set the background color of the list
      //     "& .MuiInputBase-root": {
      //         padding: "0px !important", // Override the default padding
      //       },
      //   },
      // }}
       // Override the default noOptionsText with a styled MenuItem
       // 1) Override Paper to ensure a black background
      //  componentsProps={{
      //   paper: {
      //     sx: {
      //       backgroundColor: 'black',
      //       color: 'white',
      //     },
      //   },
      // }}
      // 2) Customize the "no options" text
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
          InputLabelProps={{
            shrink: false, // Prevent the label from shrinking
            style: { display: 'none' }, // Hide the label visually
          }}
          // sx={{
          //   "& .MuiInputBase-input": {
          //     height: "44px", // Set explicit height
          //     maxHeight : "44px !important", // Add this to target the Autocomplete input specifically
          //     color: "white",
          //     fontFamily: "Outfit",
          //     boxSizing: "border-box",
          //     ...(error ? {border : "1px solid red"} : {})
          //   },
          //   "& .MuiOutlinedInput-root": {
          //     padding: "0px !important",
          //     "& fieldset": {
          //       border: "none",
          //     },
          //     "& .MuiAutocomplete-input": { 
          //       padding: "8px 16px !important",  // Left padding of 8px, 0px for others
          //     }
          //   },
          //   "& .Mui-focused": {
          //     "& fieldset": {
          //       border: "1px solid rgb(24, 233, 208) !important",
          //       borderRadius : "0.75rem !important"
          //     },
          //   }
          // }}
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
          selected={option?._id === selectedReviewer?._id}
          sx={{
            backgroundColor: 'black', // Set the background color of each option
            color: 'white',           // Set the text color of each option
            fontFamily: 'Outfit',
            margin : "4px 0px",
            // borderRadius : "12px",
            // ':hover' :{
            //   background :"rgba(35,36,37,1) !important"
            // },
            // ':hover .MuiTypography-root' :{
            //   color :"rgba(24,233,208,1)"
            // },
            // '&.Mui-selected': {
            //   background: "rgba(24,233,208,0.1) !important", // Red background for selected item
            // },
            // '&.Mui-selected:hover' : {
            //   background :"rgba(35,36,37,1) !important"
            // },
            // '&.Mui-selected span': {
            //   color: "rgba(24,233,208,1) !important", // Slightly darker red on hover
            // },
          }}
        >
          <ListItemAvatar>
            <Avatar src={option?.profilePicture} 
            // sx={{ width: 32, height: 32 }}
            >
              {option.name[0].toUpperCase()}
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            // sx={{
            //   "& .MuiTypography-root": {
            //     fontFamily: "Outfit", // Apply the custom font explicitly to the Typography
            //   },
            // }}
          primary={option.name} />
        </MenuItem>
      )}
    />

  );
};

export default AssigneeSelector;

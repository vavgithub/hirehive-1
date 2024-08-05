import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

//INPUT LABEL IS THE ACCORDIAN TEXT  
export default function BasicSelect({ label, value, onChange, list }) {
  // Provide a default empty array if list is undefined
  const items = list || [];

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth sx={{ color: 'white' }}>
        {/* <InputLabel>{label}</InputLabel> */}
        <Select
          value={value}
          label={label}
          onChange={onChange}
          sx={{
            color: 'white',
            '.MuiSvgIcon-root': {
              color: 'white',
            },
            '.MuiOutlinedInput-root': {
              '& fieldset': {
                border: 'none', // Remove the border for the fieldset
              },
            },
          }}
        >
          {items.map((item, index) => (
            <MenuItem key={index} value={item}>{item}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
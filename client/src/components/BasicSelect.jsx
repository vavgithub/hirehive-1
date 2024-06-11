import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect({ label, value, onChange, list }) {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel>{label}</InputLabel>
        <Select
          value={value}
          label={label}
          onChange={onChange}
        >
          {list.map((item, index) => (
            <MenuItem key={index} value={item}>{item}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

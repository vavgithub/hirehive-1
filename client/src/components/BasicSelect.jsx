import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect() {
  const [status, setStatus] = React.useState('');

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Stage</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={status}
          label="Status"
          onChange={handleChange}
        >
          <MenuItem value={"Portfolio"}>Portfolio</MenuItem>
          <MenuItem value={"Screening"}>Screening</MenuItem>
          <MenuItem value={"Design Task"}>Design Task</MenuItem>
          <MenuItem value={"Round 1"}>Round 1</MenuItem>
          <MenuItem value={"Round 2"}>Round 2</MenuItem>
          <MenuItem value={"Hired"}>Hired</MenuItem>

        </Select>
      </FormControl>
    </Box>
  );
}

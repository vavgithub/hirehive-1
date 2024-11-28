import * as React from 'react';
import dayjs from 'dayjs';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import TextField from '@mui/material/TextField';

const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-root': {
            backgroundColor: 'black',
            color: 'white',
            borderRadius:"12px",
            height: "44px", // Add this line
          },
          //  '& .MuiOutlinedInput-notchedOutline': {
          //  borderColor: 'teal',
          // },
          '& .MuiSvgIcon-root': {
            color: 'white',
          },
        },
      },
    },
    MuiPickersDay: {
      styleOverrides: {
        root: {
          color: 'white',
          '&.Mui-selected': {
            backgroundColor: 'teal',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: 'black',
          color: 'white',
        },
      },
    },
  },
});

export default function Datepicker({ onChange, value }) {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDatePicker
          value={value ? dayjs(value) : null}
          defaultValue={dayjs()}  //
          onChange={(newValue) => onChange(newValue)}
          sx={{
            '& .MuiInputBase-root': {
              height: '44px',
            },
            '& .MuiOutlinedInput-input': {
              padding: '0px 10px',
            },
          }} />
      </LocalizationProvider>
    </ThemeProvider>
  );
}

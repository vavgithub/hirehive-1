import * as React from 'react';
import dayjs from 'dayjs';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';
import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';

const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-root': {
            backgroundColor: 'black',
            color: 'white',
            borderRadius:"12px"
          },
          // '& .MuiOutlinedInput-notchedOutline': {
          //   borderColor: 'teal',
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

export default function Timepicker({ onChange, value }) {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopTimePicker
          value={value ? dayjs(`${value}`) : null}
          defaultValue={dayjs('2022-04-17T15:30')}
          onChange={(newValue) => onChange(newValue)} />
      </LocalizationProvider>
    </ThemeProvider>
  );
}
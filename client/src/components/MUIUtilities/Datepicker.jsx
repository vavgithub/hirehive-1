import React, { useEffect } from 'react';
import dayjs from 'dayjs';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import 'dayjs/locale/en-gb';
import IconWrapper from '../Cards/IconWrapper';
import { Calendar, ChevronDown } from 'lucide-react';

const theme = createTheme({
  typography: {
    fontFamily: 'Bricolage Grotesque', // Add font family globally
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-root': {
            backgroundColor: 'black',
            color: 'white',
            borderRadius:"0.75rem",
            height: "2.75rem", // Add this line
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
          color: 'rgba(128, 131, 137, 1);',
          '&.Mui-selected': {
            color:"rgb(24, 233, 208)",
            backgroundColor: 'rgba(24, 233, 208, 0.2) !important',
          },
          '&.Mui-selected:hover': {
            color:"rgb(24, 233, 208)",
            backgroundColor: 'rgba(24, 233, 208, 0.3) !important',
          },
          '&:hover': {
            backgroundColor: 'rgba(35, 36, 37, 1)',
          },
          '&.Mui-disabled': {
            color:"rgba(128, 131, 137, 0.5) !important",
          },
        }, 
      },
    },
    MuiDayCalendar: {
      styleOverrides: {
        weekDayLabel: {
          color: 'rgba(128, 131, 137, 1)',
        }
      }
    },
    MuiPickersCalendarHeader: {
      styleOverrides: {
        root:{
          '& .MuiPickersArrowSwitcher-button':{
            color : "rgba(128, 131, 137, 1);"
          }
        },
        switchViewButton: {
          color: "rgba(128, 131, 137, 1);"
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: 'black',
          color: 'white',
          borderRadius : "20px",
          fontFamily :"Outift, sans-serif"
        },
      },
    },
  },
});

export default function Datepicker({ onChange, value ,error }) {

  useEffect(()=>{
    onChange(dayjs())
  },[])

  return (
    // <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='en-gb'>
        <DesktopDatePicker
          value={value ? dayjs(value) : null}
          defaultValue={dayjs()}  //
          shouldDisableDate={(date) => date.isBefore(dayjs(), 'day')}
          slots={{
            openPickerIcon :()=> <IconWrapper icon={ChevronDown} size={0} customIconSize={5} isInActiveIcon />
          }}
          slotProps={{
            textField: {
              InputProps: { startAdornment: <IconWrapper icon={Calendar} size={0} isInActiveIcon={true} /> }   
            }
          }}
          onChange={(newValue) => onChange(newValue)}
          // sx={{
          //   '& .MuiInputBase-root': {
          //     height: '2.75rem',
          //     backgroundColor: "rgba(12,13,13,1)",
          //     ...(error ? {border : "1px solid red"} : {})
          //   },
          //   '& .MuiOutlinedInput-input': {
          //     padding: '0px 10px',
          //     ...(error ? {height : "42px"} : {})
          //   },
          //   "& .MuiOutlinedInput-root": {
          //     "& fieldset": {
          //       border: "none"
          //     },
          //   },
          //   "& .Mui-focused": {
          //     "& fieldset": {
          //       border: "1px solid rgb(24, 233, 208) !important",
          //       borderRadius : "0.75rem !important"
          //     },
          //   },
          // }}
           />
      </LocalizationProvider>
    // </ThemeProvider>
  );
}

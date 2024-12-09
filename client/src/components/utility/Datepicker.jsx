import * as React from 'react';
import dayjs from 'dayjs';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import DropDownIcon from '../../svg/DropDownIcon';
import CalenderIcon from '../../svg/Staging/CalenderIcon';

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

export default function Datepicker({ onChange, value }) {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDatePicker
          value={value ? dayjs(value) : null}
          defaultValue={dayjs()}  //
          slots={{
            openPickerIcon : DropDownIcon
          }}
          slotProps={{
            textField: {
              InputProps: { startAdornment: <CalenderIcon customStroke="#585B5F" /> }   
            }
          }}
          onChange={(newValue) => onChange(newValue)}
          sx={{
            '& .MuiInputBase-root': {
              height: '44px',
              backgroundColor: "rgba(12,13,13,1)",

            },
            '& .MuiOutlinedInput-input': {
              padding: '0px 10px',
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                border: "none"
              },
            },
            "& .Mui-focused": {
              "& fieldset": {
                border: "1px solid rgb(24, 233, 208) !important",
                borderRadius : "0.75rem !important"
              },
            }
          }} />
      </LocalizationProvider>
    </ThemeProvider>
  );
}

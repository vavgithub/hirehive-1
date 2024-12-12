import * as React from 'react';
import dayjs from 'dayjs';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';
import DropDownIcon from '../../svg/DropDownIcon';
import ClockIcon from '../../svg/Staging/ClockIcon';


const theme = createTheme({
  typography: {
    fontFamily: 'Bricolage Grotesque', // Add font family globally
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiPickersPopper-root':{
            transform : 'translate(802px, 400px)'
          },
          '& .MuiInputBase-root': {
            backgroundColor: 'black',
            color: 'white',
            borderRadius:"12px",
            height: "44px", // Add this line
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
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius:"12px",
          backgroundColor: 'black',
          color: 'white',
        },
      },
    },
    MuiPickersLayout:{
      styleOverrides:{
        root:{
          maxHeight: "18rem",
          padding: "24px"
        }
      }
    },
    MuiDialogActions:{
      styleOverrides: {
        root: {
          display : "flex",
          justifyContent: "center",
          '& .MuiButton-root': {
            color:"#ffffff",
            width: "100%",
            backgroundColor: "rgba(4, 95, 253, 1)"
          },
          '& .MuiButton-root:hover': {
            backgroundColor: "rgba(4, 95, 253, 1) !important"
            },
        },
      }
    },
    MuiMultiSectionDigitalClock: {
      styleOverrides: {
        root: {
          backgroundColor: 'black',
          color: 'rgba(128, 131, 137, 1)',
          maxHeight :"11rem",
          '& .MuiList-root':{
            width:"75px",
            border: "0",
            scrollbarWidth: "none", // For Firefox
            '-ms-overflow-style': "none", // For IE and Edge
            '&::-webkit-scrollbar': {
              display: "none", // For Chrome, Safari, and Edge
            },
          },
          '& .MuiButtonBase-root':{
            'margin-left': "0",
            'margin-right': "0",
            padding: "16px 24px",
            width : "100%"
          },
          '& .Mui-selected':{
            backgroundColor: "rgba(24, 233, 208, 0.1) !important",
            color : "rgb(24, 233, 208) !important"
          },
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
          slots={{
            openPickerIcon : DropDownIcon
          }}
          slotProps={{
            textField: {
              InputProps: { startAdornment: <ClockIcon customStroke="#585B5F" /> }   
            }
          }}
          value={value ? dayjs(`${value}`) : null}
          defaultValue={dayjs('2022-04-17T15:30')}
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
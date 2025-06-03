import React, { useEffect } from 'react';
import dayjs from 'dayjs';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import 'dayjs/locale/en-gb';
import IconWrapper from '../Cards/IconWrapper';
import { Calendar, ChevronDown } from 'lucide-react';

export default function Datepicker({ onChange, value ,error }) {

  useEffect(()=>{
    onChange(dayjs())
  },[])

  return (
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
           />
      </LocalizationProvider>
  );
}

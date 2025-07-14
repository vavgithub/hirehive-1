import React, { useEffect } from 'react';
import dayjs from 'dayjs';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import 'dayjs/locale/en-gb';
import IconWrapper from '../Cards/IconWrapper';
import { Calendar, ChevronDown } from 'lucide-react';

export default function Datepicker({ onChange, disableDate =  'before', value ,error ,hasDefault = true}) {

  useEffect(()=>{
    if(hasDefault){
      onChange(dayjs())
    }
  },[hasDefault])

  return (
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='en-gb'>
        <div className={error ? ' border !border-red-500 rounded-xl w-full' : 'w-full'}>
        <DesktopDatePicker
          value={value ? dayjs(value) : null}
          defaultValue={dayjs()}  //
          shouldDisableDate={(date) => disableDate === 'after' ? date.isAfter(dayjs(), 'day') : date.isBefore(dayjs(), 'day')}
          sx={{
            width : '100%'
          }}
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
        </div>
      </LocalizationProvider>
  );
}

import * as React from 'react';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';

export default function Datepicker({ onChange, value }) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoItem label="Date">
              <DesktopDatePicker   
              value={value ? dayjs(value) : null}
               defaultValue={dayjs('2022-04-17')} 
               sx={{color:"white"}}  
               onChange={(newValue) => onChange(newValue)} />
            </DemoItem>
           
        </LocalizationProvider>
      );
    }

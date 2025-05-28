import React, { useEffect } from 'react';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import 'dayjs/locale/en-gb';
import IconWrapper from '../Cards/IconWrapper';
import { Calendar, ChevronDown } from 'lucide-react';

export default function YearPicker({ onChange, value, error }) {

  useEffect(() => {
    if (!value) onChange(dayjs());
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
      <DesktopDatePicker
        views={['year']} // 👈 Only show year picker
        openTo="year"    // 👈 Default view
        value={value ? dayjs(value) : null}
        defaultValue={dayjs()}
        onChange={(newValue) => onChange(newValue)}
        slots={{
          openPickerIcon: () => (
            <IconWrapper icon={ChevronDown} size={0} customIconSize={5} isInActiveIcon />
          ),
        }}
        slotProps={{
          textField: {
            error: error ?? false,
            InputProps: {
              startAdornment: (
                <IconWrapper icon={Calendar} size={0} isInActiveIcon />
              ),
            },
          },
        }}
      />
    </LocalizationProvider>
  );
}

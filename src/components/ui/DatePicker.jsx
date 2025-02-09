import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker as DatePickerField } from '@mui/x-date-pickers/DatePicker';

import { TextField } from '@mui/material';

export const DatePicker = ({ label, value, onChange, minDate }) => (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <DatePickerField
      label={label}
      value={value}
      onChange={onChange}
      minDate={minDate}
      slots={{ textField: TextField }}
      slotProps={{
        textField: {
          variant: 'outlined',
          fullWidth: true,
          sx: { minWidth: 250 }
        }
      }}
    />
  </LocalizationProvider>
);

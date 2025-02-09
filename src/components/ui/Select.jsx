import { Select as SelectField, MenuItem, FormControl, InputLabel } from '@mui/material';

export const Select = ({ label, value, onChange, options, ...props }) => (
  <FormControl fullWidth variant="standard" size="small">
    <InputLabel>{label}</InputLabel>
    <SelectField
      value={value}
      onChange={onChange}
      disableUnderline
      {...props}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </SelectField>
  </FormControl>
);
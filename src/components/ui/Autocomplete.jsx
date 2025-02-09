import { Autocomplete as AutocompleteField, TextField } from '@mui/material';

export const Autocomplete = ({
  label,
  options,
  value,
  onChange,
  onInputChange
}) => (
  <AutocompleteField
    disablePortal
    options={options}
    getOptionLabel={(option) => option.suggestionTitle || option}
    renderOption={(props, option) => (
      <li {...props}>
        <div>
          <div>{option.suggestionTitle}</div>
          {option.subtitle && (
            <div sx={{ fontSize: '0.8em', color: 'white' }}>
              {option.subtitle}
            </div>
          )}
        </div>
      </li>
    )}
    sx={{ minWidth: {xs: '150px', md: '250px'} }}
    renderInput={(params) => <TextField {...params} label={label} fullWidth />}
    onChange={onChange}
    onInputChange={onInputChange}
    value={value}
  />
);

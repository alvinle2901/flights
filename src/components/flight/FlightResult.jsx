/* eslint-disable react/prop-types */
import React, { useState } from 'react';

import { FlightCard } from '../flight';
import {
  Box,
  Button,
  InputLabel,
  MenuItem,
  Select,
  FormControl
} from '@mui/material';
import { Icons } from '../ui/icons';

export const FlightResult = ({ flights }) => {
  const [airline, setAirline] = useState('');
  const [stops, setStops] = useState('');
  const [sorted, setSorted] = useState('priceUp');

  const airlines = flights.map(
    (flight) => flight.legs[0].carriers.marketing[0].name
  );

  if (sorted === 'priceDown') {
    flights = flights.sort(
      (a, b) => b.price.formatted.slice(1) - a.price.formatted.slice(1)
    );
  }

  if (sorted === 'priceUp') {
    flights = flights.sort(
      (a, b) => a.price.formatted.slice(1) - b.price.formatted.slice(1)
    );
  }

  if (airline) {
    flights = flights.filter(
      (flight) => flight.legs[0].carriers.marketing[0].name === airline
    );
  }
  if (flights.length === 0) {
    return <div>No flights match your origin and destination</div>;
  }

  if (stops == 1) {
    flights = flights.filter((flight) => flight.legs[0].segments.length === 1);
  } else if (stops == 2) {
    flights = flights.filter((flight) => flight.legs[0].segments.length === 2);
  }

  return (
    <Box>
      {/* Filters */}
      <Box
        sx={{
          display: 'flex',
          gap: 1,
          mb: 3,
          mt: { xs: 14, md: 5 },
          justifyContent: 'center',
          flexDirection: { xs: 'column', sm: 'row' },
          maxHeight: '40px'
        }}>
        <Button
          startIcon={<Icons.filter />}
          variant={
            sorted !== 'priceUp' || stops || airline ? 'contained' : 'outlined'
          }
          size="small"
          onClick={() => {
            setSorted('priceUp');
            setStops('');
            setAirline('');
          }}>
          All filters
        </Button>

        {/* Price sorted */}
        <Button
          variant="outlined"
          sx={{
            px: 2,
            border: '1px solid #ccc',
            '&:hover': {
              color: 'primary.main'
            }
          }}
          onClick={() =>
            setSorted(sorted === 'priceUp' ? 'priceDown' : 'priceUp')
          }>
          Price {(sorted === 'priceUp' || sorted === '') && <Icons.arrowUp />}
          {sorted === 'priceDown' && <Icons.arrowDown />}
        </Button>

        {/* Stops filter */}
        <FormControl sx={{ minWidth: '120px' }}>
          <InputLabel
            size="small"
            shrink={stops !== ''}
            sx={{
              fontSize: '14px',
              color: 'primary.main',
              textAlign: 'center'
            }}>
            Stops
          </InputLabel>
          <Select
            size="small"
            value={stops}
            onChange={(event) => setStops(event.target.value)}>
            <MenuItem value={''}>Any</MenuItem>
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
          </Select>
        </FormControl>

        {/* Airline filter */}
        <FormControl sx={{ minWidth: '120px' }}>
          <InputLabel
            size="small"
            shrink={airline !== ''}
            sx={{ fontSize: '14px', color: 'primary.main' }}>
            Airlines
          </InputLabel>
          <Select
            size="small"
            value={airline}
            onChange={(event) => setAirline(event.target.value)}
            autoWidth>
            <MenuItem value={''}>Any</MenuItem>
            {[...new Set(airlines)].map((airline, index) => (
              <MenuItem key={index} value={airline}>
                {airline}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Flights List */}
      <Box maxWidth="lg" sx={{ mt: { xs: 10, md: 4 } }}>
        {flights
          .sort(
            (a, b) => parseInt(b.price.formatted) - parseInt(a.price.formatted)
          )
          .map((flight, index) => (
            <FlightCard key={index} flight={flight} />
          ))}
      </Box>
    </Box>
  );
};

import { useEffect, useState, useMemo, useCallback } from 'react';
import { debounce } from '@mui/material/utils';

import { Icons } from '../ui/icons';
import { FlightOptions } from '../flight';
import { Autocomplete, DatePicker, IconButton, Button, Paper, Typography, Grid2 } from '../ui';

import {
  getAirportId,
  getAirportOptions,
  getFlightDetails
} from '../../services/flightService';
import { formatDate, formatLocation } from '../../utils/helpers';

export const FlightSearch = ({ setResults, setIsLoading }) => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [error, setError] = useState(null);
  const [departureDate, setDepartureDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [originOptions, setOriginOptions] = useState([]);
  const [destinationOptions, setDestinationOptions] = useState([]);

  const fetchAirportOptions = useMemo(
    () =>
      debounce(async (input, setOptions) => {
        try {
          const response = await getAirportOptions(input);
          setOptions(response);
        } catch (error) {
          console.log('Error fetching location', error);
          setOptions([]);
        }
      }, 400),
    []
  );

  // fetch location options
  const fetchOptions = useCallback(
    (inputValue, setter, selectedOption) => {
      if (inputValue === '') {
        setter(selectedOption ? [selectedOption] : []);
        return;
      }

      fetchAirportOptions(inputValue, (results) => {
        const options = selectedOption ? [selectedOption, ...results] : results;
        setter(options);
      });
    },
    [fetchAirportOptions]
  );

  useEffect(() => {
    fetchOptions(origin, setOriginOptions, origin);
  }, [origin]);

  useEffect(() => {
    fetchOptions(destination, setDestinationOptions, destination);
  }, [destination]);

  const handleDepartureDateChange = (date) => {
    setDepartureDate(date);
    if (date && returnDate && date.isAfter(returnDate)) {
      setError('Departure date cannot be later than return date');
    } else {
      setError(null);
    }
  };

  const handleSwap = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  const handleReturnDateChange = (date) => {
    setReturnDate(date);
    if (departureDate && date.isBefore(departureDate)) {
      setError('Return date cannot be earlier than departure date');
    } else {
      setError(null);
    }
  };

  const handleSearch = async (event) => {
    setResults([]);
    setIsLoading(true);
    event.preventDefault();

    const formattedDepartureDate = formatDate(departureDate);
    const formattedReturnDate = formatDate(returnDate);

    try {
      const originInfo = await getAirportId(formatLocation(origin));
      const destinationInfo = await getAirportId(formatLocation(destination));
      const flightDetails = await getFlightDetails(
        originInfo,
        destinationInfo,
        formattedDepartureDate,
        formattedReturnDate
      );
      const results = flightDetails.data.data.itineraries;
      setResults(results);
    } catch (error) {
      setError('Error fetching flight details');
      console.error(error);
    }

    setIsLoading(false);
  };

  return (
    <Paper
      sx={{
        mb: 3,
        p: 2,
        alignItems:'center',
        justifyContent:'center',
        position: 'relative',
        borderRadius: '15px',
        boxShadow:
          '0px 2px 6px rgba(0, 0, 0, 0.1), 0px -2px 6px rgba(0, 0, 0, 0.1), 2px 0px 6px rgba(0, 0, 0, 0.1), -2px 0px 6px rgba(0, 0, 0, 0.1)'
      }}>
      <FlightOptions />

      {/* Search Container */}
      <Grid2
        container
        spacing={2}
        sx={{ mb: 4 }}
        alignItems="stretch"
        justifyContent="space-between">
        {/* Departure & Destination */}
        <Grid2
          xs={12}
          md={7}
          container
          spacing={{ xs: 0, md: 2 }}
          alignItems="center">
          <Grid2 xs={5} sm={5}>
            <Autocomplete
              label="From"
              options={originOptions}
              value={origin}
              onChange={(event, newValue) => {
                setOrigin(newValue);
                setOriginOptions(
                  newValue ? [newValue, ...originOptions] : originOptions
                );
              }}
              onInputChange={(event, newInputValue) => {
                setOrigin(newInputValue);
              }}
            />
          </Grid2>

          <Grid2 xs={1} sm="auto">
            <IconButton onClick={handleSwap}>
              <Icons.swap />
            </IconButton>
          </Grid2>

          <Grid2 xs={5} sm={5}>
            <Autocomplete
              label="To"
              options={destinationOptions}
              value={destination}
              onChange={(event, newValue) => {
                setDestination(newValue);
                setDestinationOptions(
                  newValue
                    ? [newValue, ...destinationOptions]
                    : destinationOptions
                );
              }}
              onInputChange={(event, newInputValue) => {
                setDestination(newInputValue);
              }}
            />
          </Grid2>
        </Grid2>

        {/* Date Pickers */}
        <Grid2 xs={12} md={5} container spacing={2}>
          <Grid2 xs={12} sm={6}>
            <DatePicker
              label="Departure"
              value={departureDate}
              onChange={handleDepartureDateChange}
            />
          </Grid2>
          <Grid2 xs={12} sm={6}>
            <DatePicker
              label="Return"
              value={returnDate}
              onChange={handleReturnDateChange}
              minDate={departureDate}
            />
          </Grid2>
        </Grid2>
      </Grid2>

      {error && (
        <Typography color="error" variant="body2" sx={{ textAlign: 'center' }}>
          {error}
        </Typography>
      )}
      {/* Search Button */}
      <Button
        onClick={handleSearch}
        variant="contained"
        size="large"
        sx={{
          position: 'absolute',
          bottom: -20,
          left: '50%',
          transform: 'translate(-50%, 0%)',
          backgroundColor: '#1a73e8',
          borderRadius: '30px',
          px: 3,
          py: 1,
          boxShadow: 3,
          fontWeight: 'semibold'
        }}
        startIcon={<Icons.search />}>
        Search
      </Button>
    </Paper>
  );
}

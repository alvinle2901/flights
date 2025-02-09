import { useState } from 'react';

import { Select, Grid2 } from '../ui';
import { tripOptions, passengerOptions, classOptions } from '../../utils/constants';

export const FlightOptions = () => {
  const [tripType, setTripType] = useState('roundtrip');
  const [passengerCount, setPassengerCount] = useState('1');
  const [classType, setClassType] = useState('economy');

  return (
    <Grid2 container spacing={2} sx={{ mb: 2 }}>
      <Grid2 xs={12} sm={6} md={4}>
        <Select
          label="Trip Type"
          value={tripType}
          onChange={(e) => setTripType(e.target.value)}
          options={tripOptions}
        />
      </Grid2>

      <Grid2 xs={12} sm={6} md={4}>
        <Select
          label="Passengers"
          value={passengerCount}
          onChange={(e) => setPassengerCount(e.target.value)}
          options={passengerOptions}
        />
      </Grid2>

      <Grid2 xs={12} sm={6} md={4}>
        <Select
          label="Class"
          value={classType}
          onChange={(e) => setClassType(e.target.value)}
          options={classOptions}
        />
      </Grid2>
    </Grid2>
  );
};

/* eslint-disable react/prop-types */
import { useState } from 'react';

import { Box, LinearProgress } from '../ui';
import { FlightResult, FlightSearch } from '../flight';

export const Flights = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);

  return (
    <>
      {isLoading && <LinearProgress color="primary" sx={{ height: '2px' }} />}
      <Box
        sx={{ px: { xs: '5%', md: '12%' }, mt: '20px' }}
        bgcolor="background.default">
        <FlightSearch setIsLoading={setIsLoading} setResults={setResults} />

        {results.length > 0 && <FlightResult flights={results} />}
      </Box>
    </>
  );
};

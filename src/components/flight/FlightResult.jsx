/* eslint-disable react/prop-types */
import { Box } from '../ui';
import { FlightCard } from '../flight';
import { Filters } from '../Filters';

export const FlightResult = ({ flights }) => {
  return (
    <Box>
      {/* Filters */}
      <Filters flights={flights} />
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

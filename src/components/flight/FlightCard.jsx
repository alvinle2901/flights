import { useState } from 'react';
import { Button, Card, CardContent, Collapse, Typography, Box } from '../ui';
import { Icons } from '../ui/icons';

import { formatDuration, formatTime } from '../../utils/helpers';

export const FlightCard = ({ flight }) => {
  const [expanded, setExpanded] = useState(false);
  const handleExpansion = () => setExpanded((prev) => !prev);

  // Flight details
  const logo = flight.legs[0].carriers.marketing[0].logoUrl;
  const departureTime = formatTime(flight.legs[0].departure);
  const arrivalTime = formatTime(flight.legs[0].arrival);
  const airline = flight.legs[0].carriers.marketing[0].name;
  const duration = formatDuration(flight.legs[0].durationInMinutes);
  const originCode = flight.legs[0].origin.id;
  const destinationCode = flight.legs[0].destination.id;
  const numOfSegments = flight.legs[0].segments.length;
  const price = flight.price.formatted;
  const timeDeltaInDays = flight.legs[0].timeDeltaInDays;

  return (
    <Card
      sx={{ mb: 2, '&:hover': { cursor: 'pointer' }, px: { xs: 0, md: 1 } }}>
      <CardContent
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingLeft: 2
        }}
        onClick={handleExpansion}>
        <>
          <img src={logo} style={{ maxWidth: '40px', height: 'auto' }} />
          <Box
            sx={{
              display: { xs: expanded ? 'none' : 'flex-col', sm: 'flex' },
              gap: {xs: 0, md: 5}
            }}>
            <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
              <Typography variant="subtitle1">
                {departureTime} - {arrivalTime}
                {timeDeltaInDays > 0 && (
                  <span
                    style={{ position: 'relative', top: -5, fontSize: '10px' }}>
                    +{timeDeltaInDays}
                  </span>
                )}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  fontSize: '10px',
                  justifyContent: { xs: 'center', sm: 'flex-start' }
                }}>
                {airline}
              </Typography>
            </Box>
            <Box sx={{ textAlign: { xs: 'center', sm: 'right' } }}>
              <Typography variant="body2" color="text.secondary">
                {duration}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  fontSize: '10px',
                  justifyContent: { xs: 'center', sm: 'flex-start' }
                }}>
                {originCode} - {destinationCode}
              </Typography>
            </Box>
          </Box>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: { xs: 'none', md: 'block' },
              textAlign: { xs: 'center', sm: 'left' }
            }}>
            {numOfSegments === 0
              ? 'Direct'
              : `${numOfSegments} stop${numOfSegments > 1 ? 's' : ''}`}
          </Typography>
          {/* Price */}
          <Typography
            variant="h6"
            color="success"
            sx={{
              textAlign: { xs: 'center', sm: 'left' },
              fontSize: { xs: 15, md: 20 }
            }}>
            {price}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              textAlign: { xs: 'center', sm: 'left' },
              display: { xs: 'none', md: 'block' }
            }}>
            round trip
          </Typography>
        </>

        {expanded && (
          <Button variant="contained" sx={{ borderRadius: 5, py: 1 }}>
            Select flight
          </Button>
        )}
        <Icons.keyboardDown
          sx={{
            '&:hover': {
              borderRadius: '100%',
              backgroundColor: 'white',
              color: 'black',
              opacity: 0.5
            },
            marginTop: { xs: 1, sm: 0 }
          }}
        />
      </CardContent>

      {/* Expand Info */}
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            paddingX: 5,
            gap: 2
          }}>
          {/* Flight Details */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}>
              <Icons.circle color="#70757a" fontSize="15px" />
              <Icons.moreVert />
              <Icons.moreVert sx={{ mt: -0.7 }} />
              <Icons.circle color="#70757a" fontSize="15px" />
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: 0.5,
                ml: 5
              }}>
              <Typography>
                {departureTime} - {origin.name} ({originCode})
              </Typography>
              <Typography
                variant="subtitle"
                color="gray"
                sx={{ fontSize: '14px' }}>
                Travel time: {duration}
              </Typography>
              <Typography>
                {arrivalTime}
                <Box
                  sx={{
                    display: 'flex',
                    gap: 2,
                    fontSize: '11px',
                    color: 'grey'
                  }}>
                  {airline}
                  <span style={{ fontSize: 'inherit' }}>
                    Flight Number {flight.legs[0].segments[0].flightNumber}
                  </span>
                </Box>
              </Typography>
            </Box>
          </Box>

          {/* Services */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography
              sx={{
                display: 'flex',
                alignItems: 'center',
                fontSize: { xs: '10px', sm: '12px' }
              }}>
              <Icons.seat fontSize="small" /> Below average
              legroom (29in)
            </Typography>
            <Typography
              sx={{
                display: 'flex',
                alignItems: 'center',
                fontSize: { xs: '10px', sm: '12px' }
              }}>
              <Icons.usb fontSize="small" /> In-seat USB outlet
            </Typography>
          </Box>
        </CardContent>
      </Collapse>
    </Card>
  );
};

import { createTheme } from '@mui/material';
import { Icons } from '../components/ui/icons';

// Menu Items for Navbar
export const menuItems = [
  { text: 'Travel', icon: <Icons.travel /> },
  { text: 'Explore', icon: <Icons.explore /> },
  { text: 'Flights', icon: <Icons.flight /> },
  { text: 'Hotels', icon: <Icons.hotel /> },
  { text: 'Vacation rentals', icon: <Icons.home /> }
];

// Flight options
export const tripOptions = [
  { value: 'roundtrip', label: 'Round trip' },
  { value: 'oneway', label: 'One way' }
];

export const passengerOptions = [
  { value: '1', label: '1 passenger' },
  { value: '2', label: '2 passengers' }
];

export const classOptions = [
  { value: 'economy', label: 'Economy' },
  { value: 'business', label: 'Business' }
];

// Light theme config
export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1a73e8'
    },
    background: {
      default: '#ffffff'
    }
  },
  components: {
    MuiSelect: {
      styleOverrides: {
        select: {
          backgroundColor: '#ffffff',
          border: 0
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'capitalize',
          fontSize: '14px',
          padding: '6px 18px'
        }
      }
    }
  }
});
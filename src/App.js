import { ThemeProvider } from '@mui/material';

import { NavBar } from './components/ui';
import { Flights } from './components/flight';
import { lightTheme } from './utils/constants';

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <div className="App">
        <NavBar />
        <Flights />
      </div>
    </ThemeProvider>
  );
}

export default App;

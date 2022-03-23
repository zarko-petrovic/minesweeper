import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      contrastText: '#ffffff',
      main: '#153b71'
    },
    success: {
      contrastText: '#ffffff',
      main: '#4caf50'
    },
    error: {
      contrastText: '#ffffff',
      main: '#f44336'
    }
  },
});
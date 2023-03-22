import Switch from '@mui/material/Switch';
import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Typography } from '@mui/material';


// Adding Dark Mode button
export default function DarkModeSwitch() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const lightTheme = createTheme({
      palette: {
        mode: 'light',
        primary: {
          main: '#6A1B9A',
        },
        secondary: {
          main: '#4CAF50',
        },
        background: {
          default: '#D9D9D9',
        },
        text: {
          primary: '#F76F72',
          secondary: '#4CAF50',
        },
      },
    });
  
    const darkTheme = createTheme({
      palette: {
        mode: 'dark',
        primary: {
          main: '#007AFF',
        },
        secondary: {
          main: '#FF3B30',
        },
      },
    });
  
    const theme = isDarkMode ? darkTheme : lightTheme;
  
    const handleChange = () => {
      setIsDarkMode(!isDarkMode);
    };  

    return (
        <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        <Typography>
        <Switch
          checked={isDarkMode}
          onChange={handleChange}
          align="right" 
          />
        </Typography>
        </ThemeProvider>
    
    )
}
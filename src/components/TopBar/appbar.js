import * as React from 'react';
import DarkModeSwitch from '../darkmode';
import Toolbar from '@mui/material/Toolbar';
import { Typography } from '@mui/material';
import "./appbar.css";


// Adding App Bar as header and dark mode button container
export default function TopAppBar() {
  return (
    <Toolbar color='transparent' position="static" >
          <Typography id='header' variant="h4" component="div" sx={{ flexGrow: 1 }} position="center" align="center">
            Robot VS Reporters
          </Typography>
    <DarkModeSwitch />
    </Toolbar>
    
  );
}
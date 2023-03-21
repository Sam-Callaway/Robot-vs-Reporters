import * as React from 'react';
import DarkModeSwitch from './darkmode';
import Toolbar from '@mui/material/Toolbar';
import { Typography } from '@mui/material';

export default function TopAppBar() {
  return (
    <Toolbar color='transparent' position="static" >
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }} position="center" align="center">
            Robot VS Reporters
          </Typography>
    <DarkModeSwitch />
    </Toolbar>
  );
}
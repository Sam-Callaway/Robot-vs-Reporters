import React from "react";
import DarkModeSwitch from './darkmode';
import Toolbar from '@mui/material/Toolbar';
import { Typography } from '@mui/material';
import logo from './logo.svg';
import './App.css';

function LoadingScreen (){
return(
  <img src={logo} className="App-logo" alt="logo" />
)
}
export default LoadingScreen
import { Container, Row, Col } from "react-bootstrap";
import TopAppBar from "./appbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import RvsR from "./RvsR";
import React, { useState, useEffect } from 'react';
import GenerateDesc from "../utils/generateDesc";
import { Grid,Box,Button,Toolbar,Typography,Switch,Paper } from '@mui/material';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';


// Grid item styling
const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

function Homepage (props) {
    const [showRvsR, setShowRvsR] = useState(false);
    const [showHomepage, setShowHomepage] = useState(true);
    const [howToPlay, setHowToPlay] = useState(null);
    const [isDarkMode, setIsDarkMode] = useState(false);

  // Creating Dark Mode theme
    const lightTheme = createTheme({
      palette: {
        mode: 'light',
        primary: {
          main: '#007AFF',
        },
        secondary: {
          main: '#FF3B30',
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


    const handleStart = () => {
        setShowRvsR(true);
        setShowHomepage(false);
    }


    const handleHowToPlay = () => {
        setHowToPlay("The aim of the game is to test if you can tell which article description is written by the journalist. A news article title will show, and two descriptions. One description will be the journalist's description from the article, but the other will be generated using ChatGPT. Your job is to read both descriptions, and click on the one you think is the real article description. Good luck ! ");
    }

    

    return (

        <Container>
            {showHomepage &&
            <Container>
            <TopAppBar/>
            <Row>
                <Col>
                <Button onClick={handleStart}>Start</Button>
                </Col>
                <Col>
                <Button onClick={handleHowToPlay}>How To Play</Button>
                </Col>
            </Row>
            <h2>{howToPlay}</h2>
            </Container>}
            {showRvsR &&
             <Container>
                <RvsR />
                </Container>}
        </Container>
    )



}

export default Homepage;
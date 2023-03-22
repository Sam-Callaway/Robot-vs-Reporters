import { Button, Container, Row, Col } from "react-bootstrap";
import TopAppBar from "../TopBar/appbar.js";

import 'bootstrap/dist/css/bootstrap.min.css';
import "./Homepage.css";
import RvsR from "../RvsR/RvsR";
import React, { useState, useEffect } from 'react';
import imgNoBG from "./homepageNoBG.png";
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
            <Container className="d-flex justify-content-center align-items-center pt-4">
            <img src={imgNoBG} style={{maxHeight: "60vh", maxWidth: "40vh"}}/>
            </Container>
            <p className="text-muted d-flex justify-content-center align-items-center">Test your skills, determine which article is real</p>
            <Row>
                <Col className="d-flex justify-content-center align-items-center pt-4">
                 <Button onClick={handleStart}>Start</Button>
                <Button onClick={handleHowToPlay}>How To Play</Button>
                </Col>
            </Row>
            <Col >
            <p className="d-flex justify-content-center align-items-center pt-4">{howToPlay}</p>
            </Col>
            </Container>}
            {showRvsR &&
             <Container>
                <RvsR />
                </Container>}
        </Container>
    )

    // Button onClick={handleStart}>Start</Button>
    // </Col>
    // <Col>
    // <Button onClick={handleHowToPlay}>How To Play</Button>

}

export default Homepage;
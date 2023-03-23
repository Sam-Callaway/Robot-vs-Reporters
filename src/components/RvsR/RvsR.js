import React, { useState, useEffect } from 'react';
import GenerateDesc from "../../utils/generateDesc";
import newsscraper from '../../utils/newsscraper';
import TopAppBar from '../TopBar/appbar';
import env from 'react-dotenv';
import { Grid, Box, Button, Toolbar, Typography, Switch, Paper, Card, CardContent } from '@mui/material';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import LoadingScreen from "../LoadingScreen/LoadingScreen.js";
// Grid item styling

// // Grid item styling
// const Item = styled(Paper)(({ theme }) => ({
//     ...theme.typography.body2,
//     padding: theme.spacing(1),
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
//   }));


function RvsR(props) {
    // News API Data
    const [data, setData] = useState(null);
    const [content, setContent] = useState(null);
    const [title, setTitle] = useState(null);
    // Setting answer
    const [answer, setAnswer] = useState(null);
    const [rightOrWrong, setRightOrWrong] = useState(null);
    // Swapping description elements randomly
    const [isSwapped, setIsSwapped] = useState(false);
    // Generate random number for indice of title element
    const [number, setNumber] = useState(null);
    // Tracking scores
    let [robotScore, setRobotScore] = useState(0);
    let [reportScore, setReportScore] = useState(0);
    // Generate next round
    const [nextRound, setNextRound] = useState(null);
    const [gptLoaded, setGptLoaded] = useState(false)


    const gptIsLoaded = () => {
        setGptLoaded(true)
    }

    // Dark Mode 
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Creating Dark Mode theme
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
            default: '#fbf3e5',
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
          background: {
            default: '#000000',
          },
          text: {
            primary: '#13ED65',
            secondary: '#4CAF50',
          },
          button: {
            default: '#000000',
          },
        },
      });


    const theme = isDarkMode ? darkTheme : lightTheme;

    const handleChange = () => {
        setIsDarkMode(!isDarkMode);
    };

    useEffect(() => {
        fetch('https://newsdata.io/api/1/news?apikey=pub_19337c0d21c654df0435eff36fe6a5f093d8e&language=en')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setData(data);
                setContent(data.results[0].content.split(' ').slice(0, 80).join(' '));
                setTitle(data.results[0].title);
                setAnswer(answer);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);


    function checkAnswer(event) {
        const choice = event.target.id;

        if (choice === "journalist") {
            setRightOrWrong("Well done. You are smart");
            setReportScore(reportScore + 1);
        } else {
            setRightOrWrong("Wrong answer buddy");
            setRobotScore(robotScore + 1);
        }

        setNextRound("Load next title");
        handleGenerateNumber();

    }

    const handleGenerateNumber = () => {
        console.log(number)
        const randomNum = Math.floor(Math.random() * 9);
        if (randomNum === number) {
            if ((randomNum + 1) === 10) { setNumber(0) } else { setNumber(randomNum + 1) }
        } else {
            setNumber(randomNum);
        }

    };

    function handleNextRound() {
        setIsSwapped(Math.random() < 0.5);
        setContent(data.results[number].content.split(' ').slice(0, 80).join(' '));
        setTitle(data.results[number].title);
        setGptLoaded(false);
        return (
            <RvsR />
        )
    }

    let showRvsR = {}
    let showLoading = {}
    if (gptLoaded === false) {
        showRvsR = {
            display: 'none'
        };
    } else { showRvsR = {}; }

    if (gptLoaded === false) {
        showLoading = {};
    } else {
        showLoading = {
            display: 'none'
        }
    }



    return (
        <div>
            <ThemeProvider theme={theme}>
                <CssBaseline enableColorScheme />
                <Toolbar color='transparent' position="static" >
                    <Typography variant="h4" component="div" sx={{ flexGrow: 1 }} position="center" align="center">
                        Robot VS Reporters
                    </Typography>
                    <Typography>
                        <Switch
                            checked={isDarkMode}
                            onChange={handleChange}
                            align="right"
                        />

                    </Typography>
                </Toolbar>
                <div style={showLoading}>
                    <LoadingScreen title={title} />
                </div>
                {data && (
                    <div style={showRvsR}>
                        <h2 className="title d-flex justify-content-center align-items-center">Article Title: {title}</h2>
                        <Box sx={{ flexGrow: 1 }}>

                            {isSwapped ? (
                                <>
                                    <Grid
                                        container
                                        justifyContent="center"
                                        alignItems="stretch"
                                        colums={12}
                                        spacing={4}
                                    >
                                        <Grid item xs={6}>
                                            <Card variant="outlined"sx={{ height: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                                <h2> Description: </h2>
                                                <p className="content">{content}</p>
                                                <Button variant="outlined" onClick={checkAnswer} id="journalist"> This is the real description!</Button>
                                            </Card>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Card variant="outlined"sx={{ height: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                                <GenerateDesc gptIsLoaded={gptIsLoaded} title={title} />
                                                <Button variant="outlined" onClick={checkAnswer} id="chatGPT">This is the real description!</Button>
                                            </Card>
                                        </Grid>
                                    </Grid>
                                </>
                            ) : (
                                <>
                               <Grid
                                    container
                                    justifyContent="center"
                                    alignItems="stretch"
                                    spacing={2}
                                >
                                    <Grid item xs={6}>
                                        <Card variant="outlined" sx={{ height: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
                                            <GenerateDesc gptIsLoaded={gptIsLoaded} title={title} />
                                            <Button onClick={checkAnswer} variant="outlined" id="chatGPT">This is the real description!</Button>
                                        </Card>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Card variant="outlined" sx={{ height: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
                                            <h2> Description: </h2>
                                            <p className="content">{content}</p>
                                            <Button onClick={checkAnswer} variant="outlined" id="journalist"> This is the real description!</Button>
                                        </Card>
                                    </Grid>
                                </Grid>
                            </>)}
                            <Grid
                                container
                                justifyContent="center"
                                columns={12}
                                sx={{ paddingTop: "20px" }}
                            >
                                <Grid item xs={12}>
                                    <Card variant="outlined" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                        <h2 className='d-flex align-items-center justify-content-center'>{rightOrWrong}</h2>
                                        <h2 className='d-flex align-items-center justify-content-center'>Robots: {robotScore} vs  Reporters: {reportScore}</h2>
                                        <Button variant="outlined" onClick={handleNextRound} >{nextRound}</Button>
                                    </Card>
                                </Grid>
                            </Grid>
                        </Box>
                    </div>

                )}
            </ThemeProvider>
        </div>
    );
}

export default RvsR;
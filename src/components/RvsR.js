import React, { useState, useEffect } from 'react';
import GenerateDesc from "../utils/generateDesc";
import newsscraper from '../utils/newsscraper';
import TopAppBar from './appbar';
import env from 'react-dotenv';
import { Grid,Box,Button,Toolbar,Typography,Switch,Paper } from '@mui/material';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import LoadingScreen from "./LoadingScreen";
// Grid item styling
const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));


function RvsR(props) {
    // News API Data
    const [data, setData] = useState(null);
    const [content, setContent] = useState(null);
    const [title, setTitle] = useState(null);
    // Setting answer
    const [answer, setAnswer] = useState(null);
    const [rightOrWrong, setRightOrWrong] = useState(null);
    // Swapping description elements randomly
    const [isSwapped, setIsSwapped] = useState(Math.random() < 0.5);
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

    useEffect(() => {
        fetch('https://newsdata.io/api/1/news?apikey=pub_19332709e568981e985f21187a879f94062f3&language=en')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setData(data);
                setContent(data.results[7].content.split(' ').slice(7, 80).join(' '));
                setTitle(data.results[7].title);
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
        const randomNum = Math.floor(Math.random() * 10);
        setNumber(randomNum);

    };

    function handleNextRound() {
        
            setContent(data.results[number].content.split(' ').slice(0, 80).join(' '));
            setTitle(data.results[number].title);
            setGptLoaded(false);
            return (
                <RvsR />
            )
        


    }

    let showRvsR = {}
    let showLoading = {}
    if(gptLoaded === false){
        showRvsR = {
           display: 'none'
        };
    } else{showRvsR = {};}
    
    if(gptLoaded === false){
        showLoading = {};
    } else{showLoading = {
        display: 'none'}}



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
            <LoadingScreen />
            </div>
            {data && (
                <div style={showRvsR}>
                    <h2 className="title">{title}</h2>
                    <Box sx={{ flexGrow:1}}>
                    <Grid 
                    container
                    justifyContent="center"
                    alignItems="stretch"
                    > 
                    {isSwapped ? (
                            <Grid item xs={12}>
                            <Item>
                            <h2> Description: </h2>
                            <p className="content">{content}</p>
                            <Button variant="outlined" onClick={checkAnswer} id="journalist"> This is the real description!</Button>
                            <GenerateDesc gptIsLoaded={gptIsLoaded} title={title}/>
                            <Button onClick={checkAnswer} id="chatGPT">This is the real description!</Button>
                            </Item>
                            </Grid> 
                    ) : (
                            <Grid xs={12}>
                            <Item>
                            <GenerateDesc gptIsLoaded={gptIsLoaded} title={title}/>
                            <Button onClick={checkAnswer} id="chatGPT">This is the real description!</Button>
                            <h2> Description: </h2>
                            <p className="content">{content}</p>
                            <Button onClick={checkAnswer} id="journalist"> This is the real description!</Button>
                            </Item>    
                            </Grid>
                        )}
                    <Grid xs={12}>
                    <Item>
                    <h2 className='d-flex align-items-center justify-content-center'>{rightOrWrong}</h2>
                    <h2 className='d-flex align-items-center justify-content-center'>Robots: {robotScore} vs  Reporters: {reportScore}</h2>
                    <Button onClick={handleNextRound}>{nextRound}</Button>
                    </Item>
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
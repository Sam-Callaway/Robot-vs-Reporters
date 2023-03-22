import React, { useState, useEffect } from 'react';
import GenerateDesc from './utils/generateDesc';
import newsscraper from './utils/newsscraper';
import TopAppBar from './components/appbar';
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

function App() {
  const [data, setData] = useState(null);
  const [content, setContent] = useState(null);
  const [title, setTitle] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [rightOrWrong, setRightOrWrong] = useState(null);
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
    fetch('https://newsdata.io/api/1/news?apikey=pub_19329994fcef97e0eb51e74b308e05517567e&language=en')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setData(data);
        setContent(data.results[4].content);
        setTitle(data.results[4].title);
        setAnswer(answer);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);


  function checkAnswer(event) {
    const choice = event.target.id;

    if (choice === "journalist"){
      setRightOrWrong("Well done. You are smart");
    } else {
      setRightOrWrong("Wrong answer buddy");
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
      {data && (
        <div>
          <h2 className="title">{data.results[1].title}</h2>
            <Box sx={{ flexGrow:1}}>
              <Grid container columns={12}>
              <Grid xs={6} onClick={checkAnswer}>
              <Item >
              <GenerateDesc title={title} />
              <Button onClick={checkAnswer} id="realjournalist" variant="outlined">I am REAL!</Button>
              </Item>
              </Grid> 
              <Grid xs={6} >
               <Item>
               <h2>Journalist Description: </h2>
              <p className="content">{content}</p>
              <Button onClick={checkAnswer} id="journalist" variant="outlined">No! This is the real description!</Button>
              </Item> 
              </Grid> 
              </Grid>
              <Grid item xs={12}>
              <h2 align='center'>{rightOrWrong}</h2>
              </Grid>
              </Box>
        </div>
      )}
          </ThemeProvider>
    </div>
  );
}

export default App;
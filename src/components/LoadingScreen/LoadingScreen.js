import React, {useEffect, useState} from "react";
import DarkModeSwitch from '../darkmode';
import Toolbar from '@mui/material/Toolbar';
import { Typography } from '@mui/material';
import logo from './logo.svg';
import './LoadingScreen.css';

function LoadingScreen (props){
    
    const [message, setMessage] = useState("")
    const loadingScreenMessages = [
        "Man vs Machine - the long debated topic is unfolding in front of us.",
        "Will we all be replaced by AI? (probably not while it takes this long to get a response)",
        "Is creativity dead?",
        "ChatGPT wrote most of these",
        "The proliferation of fake news underscores the need for responsible AI development.",
        "AI-generated fake news: because the internet wasn't already confusing enough.",
        "When it comes to AI taking over jobs, let's just hope they don't replace comedians.",
        "How do we ensure that everyone benefits from automation?",
        "Robots taking over jobs - it's like a game of musical chairs, but instead of chairs, it's careers."
    ]
    const newMessage = () => {
        let nextMessage = loadingScreenMessages[(Math.floor(Math.random() * 9) + 0)]
        console.log(nextMessage)
        setMessage(nextMessage)}
    useEffect(() => {
        newMessage();
      },[props.title]);
return(
    <div>
        <div className="d-flex justify-content-center align-items-center" style={{height: "60vh"}}>
        <img src={logo} className="App-logo" alt="logo" />
        </div>
        <div className="d-flex justify-content-center align-items-center" style={{height: "10vh"}}>
        <h4 >{message}</h4>
        </div>
    </div>
    )
}
export default LoadingScreen
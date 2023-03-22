import React, { useState, useEffect} from "react";
import DarkModeSwitch from '../darkmode';
import Toolbar from '@mui/material/Toolbar';
import { Typography } from '@mui/material';


function LoadingScreen() {

    const [loadingMsg, setLoadingMsg] = useState(null);

    const loadingTitles = ["Man vs Machine - the long debated topic is unfolding in front of us.", "Will we all be replaced by AI? (probably not while it takes this long to get a response)", "Is creativity dead?", "Should we all have listened to Elon Musk years ago?"];

    useEffect(() => {
        setLoadingMsg(loadingTitles[Math.floor(Math.random() * 4)]);
      }, []); 


    return (
        <div className="d-flex justify-content-center align-items-center" style={{height: "110vh"}}>
            <h4 >{loadingMsg}</h4>
        </div>
    )
}
export default LoadingScreen
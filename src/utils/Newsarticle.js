import React, { useState, useEffect } from 'react';
import axios from 'axios';
import env from 'react-dotenv';


function Newsarticle(props){
  console.log("running scraper")
  console.log(props)
  const [paragraphsArr, setParagraphsArr] = useState([]);
      if(props.articleURL === ''){return;}
        console.log("Contacting web server to retrieve "+props.articleURL)
        const key = env.REACT_APP_scraperKey;  
      // URL of the scraperAPI
        const fetchurl = "https://scraperapi-twz1.onrender.com/"
        // Fetch the article content
        axios.get(fetchurl, {
          params: {
            url: props.articleURL,
            key: key
          }
      
        })
          .then(response => { 
            setParagraphsArr(response.data)

          })
          return (
            <div>
              {paragraphsArr.map(paragraph => (
                <p>{paragraph}</p>
              ))}
            </div>
          );
  
        }




export default Newsarticle;
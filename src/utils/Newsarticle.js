import React, { useState, useEffect } from 'react';
import axios from 'axios';
import env from 'react-dotenv';


function Newsarticle(){
const [articleTitle, setArticleTitle] = useState('')
const [articleURL, setArticleURL] = useState('')
const [articleContent, setArticleContent] = useState()


  fetch('https://newsdata.io/api/1/news?apikey=pub_19285cce4ce7dea610f3df1a8b4a1ef875aa1&language=en&country=gb,us,ca,nz,au')
    .then(response => response.json())
    .then(data => {
      setArticleTitle(data.results[0].title)
      setArticleURL(data.results[0].link)
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });

    useEffect(
      () => {
        if(articleURL === ''){return;}
        console.log("Contacting web server")
        const key = env.REACT_APP_scraperKey;  
      // URL the scraperAPI
        const fetchurl = "https://scraperapi-twz1.onrender.com/"
        // Fetch the article content
        axios.get(fetchurl, {
          params: {
            url: articleURL,
            key: key
          }
      
        })
          .then(response => {setArticleContent(response.data);
            console.log(articleContent);
            console.log(response.data);
            console.log(articleTitle);
            console.log(articleURL);
          })
      },
      [articleURL]
    );

}

export default Newsarticle;
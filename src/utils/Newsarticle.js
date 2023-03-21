import React, { useState, useEffect } from 'react';
import axios from 'axios';
import env from 'react-dotenv';


function Newsarticle(){
const [articleTitle, setArticleTitle] = useState('')
const [articleURL, setArticleURL] = useState('')
const [articleContent, setArticleContent] = useState([])


  fetch('https://newsdata.io/api/1/news?apikey=pub_189185d557591cb72662c5b99d3dc385d3f91&language=en&country=gb,us,ca,nz,au')
    .then(response => response.json())
    .then(data => {
      console.log(data);
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
          })
      },
      [articleURL]
    );



}

export default Newsarticle;
import React from 'react';
import * as cheerio from 'cheerio';



function newsscraper(articleUrl){
// URL of the article to fetch
  

  // Fetch the article content
  fetch(articleUrl)
    .then(response => response.text()) // Convert response to text
    .then(html => {
      // Parse the HTML response using DOMParser
      const $ = cheerio.load(html)
      

      // Do something with the article text
      console.log($('p').text());
    })
    .catch(error => console.error(error)); // Handle any errors
}

export default newsscraper;
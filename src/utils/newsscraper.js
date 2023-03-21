
import axios from 'axios';
import env from 'react-dotenv';


function newsscraper(articleUrl){
  console.log("Contacting web server")
  const key = env.REACT_APP_scraperKey;  
// URL the scraperAPI
  const fetchurl = "https://scraperapi-twz1.onrender.com/"
  // Fetch the article content
  axios.get(fetchurl, {
    params: {
      url: articleUrl,
      key: key
    }
  })
    .then(response => {console.log(response.data);
    })
    
}

export default newsscraper;
import React, { useState } from 'react';
import axios from 'axios';
import env from 'react-dotenv';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from '@mui/material';

function GenerateDesc(props) {
  // Getters/setters for article header and description
  // const [articleHeader, setArticleHeader] = useState('');
  const [description, setDescription] = useState('');

  const OPENAI_KEY = env.REACT_APP_OPENAI_KEY;

  // Generate description function
  const handleGenerateDescription = async () => {
    try {
      console.log(OPENAI_KEY);
      // Create axios post request to chatGPT api
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          // Determine api settings
          "model": "gpt-3.5-turbo",
          "messages": [{"role": "user", "content": `Generate an article description from from the following header: ${props.title}!`}],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${OPENAI_KEY}`,
          },
        }
      );
      console.log(response);
      // Storing required response as variable
      const generatedText = response.data.choices[0].message.content;
      // SetDescription method with response from API
      setDescription(generatedText);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <br />
      <Button onClick={handleGenerateDescription} variant="outlined">Generate Description</Button>
      <br />
      {description && (
    <div>    
    <h2>ChatGPT Description:</h2>
    <p>{description}</p>
    </div>
      )}
    </div>
  );
}

export default GenerateDesc;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import env from 'react-dotenv';
import { Button, Col, Container, Row } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';


function GenerateDesc(props) {
  // Getters/setters for article header and description
  // const [articleHeader, setArticleHeader] = useState('');
  const [description, setDescription] = useState('');

  const OPENAI_KEY = env.REACT_APP_OPENAI_KEY;

  // Generate description function
  useEffect(() => {
    const handleGenerateDescription = async () => {
      try {
        const response = await axios.post(
          'https://api.openai.com/v1/chat/completions',
          {
            "model": "gpt-3.5-turbo",
            "messages": [{"role": "user", "content": `Generate a 80 word article description in the style of a journalist from from the following header: ${props.title}!`}],
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${OPENAI_KEY}`,
            },
          }
        );
        const generatedText = response.data.choices[0].message.content;
        setDescription(generatedText);
      } catch (error) {
        console.error(error);
      }
    };

    handleGenerateDescription();
  }, [props.title, OPENAI_KEY]);

  return (
    <div>
      
      {description && (
        <>
          <h2> Description:</h2>
          <p>{description}</p>
        </>
      )}
    </div>
  );
}

export default GenerateDesc;
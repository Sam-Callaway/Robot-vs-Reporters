import React, { useState } from 'react';
import axios from 'axios';

function App() {
  // Getters/setters for article header and description
  const [articleHeader, setArticleHeader] = useState('');
  const [description, setDescription] = useState('');


  const OPENAI_KEY="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"
  // Generate description function
  const handleGenerateDescription = async () => {
    try {

      // Create axios post request to chatGPT api
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          // Determine api settings
          "model": "gpt-3.5-turbo",
          "messages": [{"role": "user", "content": `Generate an article description from from the following header: ${articleHeader}!`}],
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
      <label htmlFor="articleHeader">Enter news article header:</label>
      {/* Input for the news article */}
      <input
        type="text"
        id="articleHeader"
        value={articleHeader}
        onChange={(event) => setArticleHeader(event.target.value)}
      />
      <br />
      <button onClick={handleGenerateDescription}>Generate Description</button>
      <br />
      {description && (
        <>
          <h2>Generated Description:</h2>
          <p>{description}</p>
        </>
      )}
    </div>
  );
}

export default App;
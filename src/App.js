import React, { useState, useEffect } from 'react';
import GenerateDesc from './utils/generateDesc';
import TopAppBar from './components/appbar';
import { Col, Row } from 'react-bootstrap';
import env from 'react-dotenv';


function App() {
  const [data, setData] = useState(null);
  const [title, setTitle] = useState(null);

  useEffect(() => {
    fetch('https://newsdata.io/api/1/news?apikey=pub_189185d557591cb72662c5b99d3dc385d3f91&language=en')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setData(data);
        setTitle(data.results[1].title);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <TopAppBar />
      <div>
      {data && (
        <div>
          <h2 className="title">{data.results[1].title}</h2>
        
          <GenerateDesc title={title}/> 
          
            <h2>Journalist Description: </h2>
            <p className="content">{data.results[4].content}</p>
        </div>
      )}
      </div>
    </div>
  );
}

export default App;
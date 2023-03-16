import React, { useState, useEffect } from 'react';
import GenerateDesc from './utils/generateDesc';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('https://newsdata.io/api/1/news?apikey=pub_189185d557591cb72662c5b99d3dc385d3f91&language=en')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setData(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      {data && (
        <div>
          <GenerateDesc/>
          <h2 className="title">{data.results[4].title}</h2>
          <p className="content">{data.results[4].content}</p>
        </div>
      )}
    </div>
  );
}

export default App;
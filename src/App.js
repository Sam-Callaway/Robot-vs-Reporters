import React, { useState, useEffect } from 'react';
import GenerateDesc from './utils/generateDesc';
import env from 'react-dotenv';
import { Button, Col, Container, Row } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [data, setData] = useState(null);
  const [content, setContent] = useState(null);
  const [title, setTitle] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [rightOrWrong, setRightOrWrong] = useState(null);

  useEffect(() => {
    fetch('https://newsdata.io/api/1/news?apikey=pub_189185d557591cb72662c5b99d3dc385d3f91&language=en')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setData(data);
        setContent(data.results[4].content);
        setTitle(data.results[4].title);
        setAnswer(answer);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);


  function checkAnswer(event) {
    const choice = event.target.id;

    if (choice === "journalist"){
      setRightOrWrong("Well done. You are smart");
    } else {
      setRightOrWrong("Wrong answer buddy");
    }
  }

  return (
    <div>
      {data && (
        <div>
          <h2 className="title">{data.results[4].title}</h2>
          <Row>
            <Col>
              <GenerateDesc title={title} />
              <Button onClick={checkAnswer} id="chatGPT">This is the real description!</Button>
            </Col>
            <Col>
              <h2>Journalist Description: </h2>
              <p className="content">{content}</p>
              <Button onClick={checkAnswer} id="journalist">No! This is the real description!</Button>
            </Col>
          </Row>

          <h2>{rightOrWrong}</h2>

        </div>
      )}
    </div>
  );
}

export default App;
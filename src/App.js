import React, { useState, useEffect } from 'react';
import GenerateDesc from './utils/generateDesc';
import newsAPI from './utils/NewsAPI';
import Newsarticle from './utils/Newsarticle';
import TopAppBar from './components/appbar';
import env from 'react-dotenv';
import { Button, Col, Container, Row } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [articleTitle, setArticleTitle] = useState('')
  const [articleURL, setArticleURL] = useState('')
  const [data, setData] = useState(null);
  const [content, setContent] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [rightOrWrong, setRightOrWrong] = useState(null);
  const [isSwapped, setIsSwapped] = useState(Math.random() < 0.5);


  useEffect(() => {
    fetch('https://newsdata.io/api/1/news?apikey=pub_19285cce4ce7dea610f3df1a8b4a1ef875aa1&language=en')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setData(data);
        setArticleURL(data.results[0].link)
        setArticleTitle(data.results[0].title)
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
      <TopAppBar />
      {data && (
        <div>
          <h2 className="title">{articleTitle}</h2>
          <Row>
            {isSwapped ? (
              <>
                <Col>
                  <Newsarticle articleURL={articleURL} className="content" />
                  <Button onClick={checkAnswer} id="journalist">No! This is the real description!</Button>
                </Col>
                <Col>
                  <GenerateDesc title={articleTitle} />
                  <Button onClick={checkAnswer} id="chatGPT">This is the real description!</Button>
                </Col>
              </>
            ) : (
              <>
                <Col>
                  <GenerateDesc title={articleTitle} />
                  <Button onClick={checkAnswer} id="chatGPT">This is the real description!</Button>
                </Col>
                <Col>
                  <Newsarticle articleURL={articleURL} className="content" />
                  <Button onClick={checkAnswer} id="journalist">No! This is the real description!</Button>
                </Col>
              </>
            )}
          </Row>
          <h2>{rightOrWrong}</h2>
        </div>
      )}
    </div>
  );
}

export default App;
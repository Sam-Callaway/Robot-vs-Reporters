import React, { useState, useEffect } from 'react';
import GenerateDesc from "../../utils/generateDesc";
import newsscraper from '../../utils/newsscraper';
import TopAppBar from '../TopBar/appbar';
import env from 'react-dotenv';
import { Button, Col, Container, Row } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

function RvsR() {
    // News API Data
    const [data, setData] = useState(null);
    const [content, setContent] = useState(null);
    const [title, setTitle] = useState(null);
    // Setting answer
    const [answer, setAnswer] = useState(null);
    const [rightOrWrong, setRightOrWrong] = useState(null);
    // Swapping description elements randomly
    const [isSwapped, setIsSwapped] = useState(Math.random() < 0.5);
    // Generate random number for indice of title element
    const [number, setNumber] = useState(null);
    // Tracking scores
    let [robotScore, setRobotScore] = useState(0);
    let [reportScore, setReportScore] = useState(0);
    // Generate next round
    const [nextRound, setNextRound] = useState(null);

    useEffect(() => {
        fetch('https://newsdata.io/api/1/news?apikey=pub_19332709e568981e985f21187a879f94062f3&language=en')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setData(data);
                setContent(data.results[7].content.split(' ').slice(7, 80).join(' '));
                setTitle(data.results[7].title);
                setAnswer(answer);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);


    function checkAnswer(event) {
        const choice = event.target.id;

        if (choice === "journalist") {
            setRightOrWrong("Well done. You are smart");
            setReportScore(reportScore + 1);
        } else {
            setRightOrWrong("Wrong answer buddy");
            setRobotScore(robotScore + 1);
        }

        setNextRound("Load next title");
        handleGenerateNumber();
       
    }

    const handleGenerateNumber = () => {
        const randomNum = Math.floor(Math.random() * 10);
        setNumber(randomNum);

    };

    function handleNextRound() {
        
            setContent(data.results[number].content.split(' ').slice(0, 80).join(' '));
            setTitle(data.results[number].title);

            return (
                <RvsR />
            )
        


    }


    return (
        <div>
            <TopAppBar />
            {data && (
                <div>
                    <h2 className="title">{title}</h2>
                    <Row>
                        {isSwapped ? (
                            <>
                                <Col>
                                    <h2> Description: </h2>
                                    <p className="content">{content}</p>
                                    <Button onClick={checkAnswer} id="journalist"> This is the real description!</Button>
                                </Col>
                                <Col>
                                    <GenerateDesc title={title} />
                                    <Button onClick={checkAnswer} id="chatGPT">This is the real description!</Button>
                                </Col>
                            </>
                        ) : (
                            <>
                                <Col>
                                    <GenerateDesc title={title} />
                                    <Button onClick={checkAnswer} id="chatGPT">This is the real description!</Button>
                                </Col>
                                <Col>
                                    <h2> Description: </h2>
                                    <p className="content">{content}</p>
                                    <Button onClick={checkAnswer} id="journalist"> This is the real description!</Button>
                                </Col>
                            </>
                        )}
                    </Row>
                    <h2 className='d-flex align-items-center justify-content-center'>{rightOrWrong}</h2>
                    <h2 className='d-flex align-items-center justify-content-center'>Robots: {robotScore} vs  Reporters: {reportScore}</h2>
                    <Button onClick={handleNextRound}>{nextRound}</Button>
                </div>
            )}
        </div>
    );
}

export default RvsR;
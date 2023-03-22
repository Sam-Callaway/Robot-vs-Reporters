import { Button, Container, Row, Col } from "react-bootstrap";
import TopAppBar from "./appbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import RvsR from "./RvsR";
import React, { useState, useEffect } from 'react';
import GenerateDesc from "../utils/generateDesc";



function Homepage (props) {
    const [showRvsR, setShowRvsR] = useState(false);
    const [showHomepage, setShowHomepage] = useState(true);


    const handleStart = () => {
        setShowRvsR(true);
        setShowHomepage(false);
    }

    return (

        <Container>
            {showHomepage &&
            <Container>
            <TopAppBar/>
            <Row>
                <Col>
                <Button onClick={handleStart}>Start</Button>
                </Col>
                <Col>
                <Button>How To Play</Button>
                </Col>
            </Row></Container>}
            {showRvsR &&
             <Container>
                <RvsR />
                </Container>}
        </Container>
    )



}

export default Homepage;
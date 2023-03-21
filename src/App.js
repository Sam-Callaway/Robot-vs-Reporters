import React, { useState, useEffect } from 'react';
import GenerateDesc from './utils/generateDesc';
import { Col, Row } from 'react-bootstrap';
import env from 'react-dotenv';
import Newsarticle from './utils/Newsarticle';

function App() {

  Newsarticle()
  return (
    <div>

        <div>
            <h2>Journalist Description: </h2>

        </div>

    </div>
  );
}

export default App;
import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';


function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('https://api.nytimes.com/svc/search/v2/articlesearch.json?q=bitcoin&api-key=R1a31F4tBjCUaM2ho8GtIFsrSdtXt30M')
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
          <h2 className="article">{data.response.docs[0].abstract}</h2>
          <p className="header">{data.response.docs[0].snippet}</p>
        </div>
      )}
    </div>
  );
}


//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//         <h2 className='header'></h2>
//         <p className='paragraph'></p>
//       </header>
//     </div>
//   );
// }

export default App;

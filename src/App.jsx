import { useState, useEffect } from 'react'

import axios from 'axios';
import './App.css'

import Header from './Components/Header/Header.jsx';

function App() {
  const [count, setCount] = useState(0)
  
  const [launches, setLaunches] = useState([]);

  useEffect(() => {
    axios.get('https://dogapi.dog/api/v2/breeds')
      .then(response => {
        console.log(response.data.data);
        
        setLaunches(response.data.data);
        console.log(launches);
        
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <>
      <div>
        <Header></Header>
        <ul>
          {launches.map(element => (
            <li key={element.id}>
              {element.attributes.name} - {element.attributes.description}
            </li>
          ))}
        </ul>
      </div>
      
    </>
  )
}

export default App

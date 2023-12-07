import React from 'react'
import { useEffect, useState } from 'react'
import './App.css'
import '../public/data.json'

function App() {
  const [count, setCount] = useState(0)
  const [ data, setData ] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/');
        const data = await response.json();
        setData(data);
        console.log(data.name)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);

  return (
    <>
      <div>
        <h2>Attempting to get data from back end</h2>
        <p>The data recieved: {data.name}</p>
      </div>
    </>
  )
}

export default App

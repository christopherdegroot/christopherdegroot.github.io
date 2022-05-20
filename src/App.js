import React, { useEffect, useState } from 'react';
import {
  Box,
  Image,
  Badge,
} from '@chakra-ui/react';
import axios from 'axios';

function App() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);


  const getData = function(search) {
    setLoading(true);
    axios.get(`https://pokeapi.co/api/v2/pokemon/ditto`)
    .then((res)=>{
      console.log(res.data)
      setData(res.data)
      setLoading(false)
    })
  }

useEffect(()=>{
  getData()
},[])

if (loading) return <p>Loading...</p>
if (!data) return <p>No data</p>

  return (
    <>
    </>
  );
}

export default App;

import React, { useEffect } from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from '@chakra-ui/react';
import axios from 'axios';

function App() {

useEffect(()=>{
  axios.get(`https://pokeapi.co/api/v2/`)
  .then((res)=>{
    console.log(res.data)
  })
},[])


  return (
   <>
   </>
  );
}

export default App;

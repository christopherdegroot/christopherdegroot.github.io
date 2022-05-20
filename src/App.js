import React, { useEffect, useState } from 'react';
import { Text, HStack, Input, Button, VStack, Box, Image, Badge } from '@chakra-ui/react';
import axios from 'axios';
import PokeCard from './components/PokeCard';

function App() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [error, setError] = useState(false);

  const getData = function(search) {
    setLoading(true);
    if (search) {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${search}`).then(res => {
      console.log(res.data);
      setData(res.data);
      setLoading(false);
    })
    .catch(function (error) {
      console.log('logging error', error)
      setLoading(false);
      setError(true);
    })
  }
    else
    axios.get(`https://pokeapi.co/api/v2/pokemon/zapdos`).then(res => {
      console.log(res.data);
      setData(res.data);
      setLoading(false);
    })
  };

  useEffect(() => {
    getData();
  }, []);


  if (loading) return <p>Loading...</p>;
  if (!data) return <p>No data</p>;
  if(error) return <p>Not found in Pokedex, please refresh and try again</p>

  return (
    <VStack pt='2em'>
      <HStack w='md'>
       <Input onChange={e=>setSearchValue(e.target.value)} placeholder='Search Pokedex'></Input>
        <Button onClick={()=>{getData(searchValue)}}>Search</Button>
      </HStack>
      <PokeCard data={data}></PokeCard>
    </VStack>
  );
}

export default App;

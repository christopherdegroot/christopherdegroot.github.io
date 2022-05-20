import React, { useEffect, useState } from 'react';
import { Input, Button, VStack, Box, Image, Badge } from '@chakra-ui/react';
import axios from 'axios';
import PokeCard from './components/PokeCard';

function App() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [searchValue, setSearchValue] = useState('');

  const getData = function(search) {
    setLoading(true);
    axios.get(`https://pokeapi.co/api/v2/pokemon/zapdos`).then(res => {
      console.log(res.data);
      setData(res.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    getData();
  }, []);


  if (loading) return <p>Loading...</p>;
  if (!data) return <p>No data</p>;

  return (
    <VStack pt='2em'>
      <Input></Input>
      <Button>Search</Button>
      <PokeCard data={data}></PokeCard>
    </VStack>
  );
}

export default App;

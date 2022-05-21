import React, { useEffect, useState } from 'react';
import { HStack, Input, Button, VStack } from '@chakra-ui/react';
import axios from 'axios';
import PokeCard from './components/PokeCard';

function App() {
  // state management
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [error, setError] = useState(false);


  // function for calling API
  const getData = function (search) {
    // begin by setting loading to true
    setLoading(true);

    // randomly pick a number between 1-898 to be used to display a random pokemon upon page load
    const randomPokemonId = Math.floor(Math.random() * 898 + 1);

    // if a search term (that is to say, a specific pokemon is being requested) it will execute an axios call with that specific pokemon requested
    if (search) {
      axios
        .get(`https://pokeapi.co/api/v2/pokemon/${search}`)
        .then(res => {
          setData(res.data);
          setLoading(false);
        })
        .catch(function (error) {
          console.log('logging error', error);
          setLoading(false);
          setError(true);
        });
    // otherwise default axios call with random pokemon id gets called
    } else
      axios
        .get(`https://pokeapi.co/api/v2/pokemon/${randomPokemonId}`)
        .then(res => {
          setData(res.data);
          setLoading(false);
        });
  };

  // getData is called upon page load in a useEffect to avoid side effects
  useEffect(() => {
    getData();
  }, []);

  // exit clauses for returning basic HTML page if any of these states exist
  if (loading) return <p>Loading...</p>;
  if (!data) return <p>No data</p>;
  if (error) return <p>Not found in Pokedex, please refresh and try again</p>;

  // final return
  return (
    <VStack pt="2em">
      <HStack w="md">
        <Input
          onChange={e => setSearchValue(e.target.value.toLowerCase())}
          placeholder="Search Pokedex"
        ></Input>
        <Button
          onClick={() => {
            getData(searchValue);
          }}
        >
          Search
        </Button>
      </HStack>
      <PokeCard data={data}></PokeCard>
    </VStack>
  );
}

export default App;

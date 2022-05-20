import React, { useEffect, useState } from 'react';
import { Box, Image, Badge } from '@chakra-ui/react';
import axios from 'axios';

function App() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const getData = function (search) {
    setLoading(true);
    axios.get(`https://pokeapi.co/api/v2/pokemon/ditto`).then(res => {
      console.log(res.data);
  console.log('logging url for image sprite', res.data.sprites.back_default)
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
    <>
      <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
        <Image src={data.sprites.back_default} alt={data.sprites.back_default} />
        <Box p="6">
          <Box display="flex" alignItems="baseline">
            <Badge borderRadius="full" px="2" colorScheme="teal">
              New
            </Badge>
            <Box
              color="gray.500"
              fontWeight="semibold"
              letterSpacing="wide"
              fontSize="xs"
              textTransform="uppercase"
              ml="2"
            >
              beds &bull; baths
            </Box>
          </Box>

          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            noOfLines={1}
          ></Box>

          <Box>
            <Box as="span" color="gray.600" fontSize="sm">
              / wk
            </Box>
          </Box>

          <Box display="flex" mt="2" alignItems="center">
            <Box as="span" ml="2" color="gray.600" fontSize="sm"></Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default App;

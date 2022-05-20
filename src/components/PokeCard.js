import { Collapse, Button, HStack, Box, Image, Badge, Text, Slider, SliderFilledTrack, SliderTrack } from '@chakra-ui/react';
import React, { useState } from 'react';

export default function PokeCard(props) {
  const [show, setShow] = useState(false)
  const handleToggle = () => setShow(!show)

const parsedAbilities = props.data.abilities.map((ability)=>{
  return <p>{ability.ability.name}</p>
})

const parsedStats = props.data.stats.map(stat => {
  return (
    <Box key={stat.stat.name}>
      <HStack>
    <Text>
      {stat.stat.name.charAt(0).toUpperCase() + stat.stat.name.slice(1)} 
    </Text>
    <Text fontWeight={'medium'}>{stat.base_stat}</Text>
    </HStack>
    <Slider defaultValue={stat.base_stat}>
    <SliderTrack>
      <SliderFilledTrack />
    </SliderTrack>
  </Slider>
  </Box>
  );
});

const parsedTypes = props.data.types.map((type)=>{
  let typeColors = {"normal": "#a7a778", "fire": "#f08030", "water": "#6890f0", "grass": "#78c850", "electric": "#f8d030", "ice": "#98d8d8", "fighting": "#872e2d", "poison": "#a040a0", "ground": "#e0c068", "flying": "#a890f0", "psychic": "#f75887", "bug": "#a8b820", "rock": "#b8a038", "ghost": "#705898", "dark": "#705848", "dragon": "#7038f8", "steel": "#b8b8d0",  "fairy": "#f0b6bc"}
  let badgeColor = '';
  for (const typeColor in typeColors) {
    if (type.type.name === typeColor)
    badgeColor = typeColors[type.type.name]
  }
 return <Badge key={type.type.name} mx="2px" borderRadius="full" px="2" bgColor={badgeColor}>{type.type.name}</Badge>
})

  return (
    <Box
      key={props.data.id}
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
    >
      <Box p="6">
        <HStack>
      <Image
        src={props.data.sprites.front_default}
        alt={props.data.sprites.front_default}
      />
      <Box>
        <Text fontSize={'2xl'}>
          {props.data.name.charAt(0).toUpperCase() + props.data.name.slice(1)}
        </Text>
        <Box display="flex" alignItems="baseline">
          
            {parsedTypes}
          
          
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            {props.data.height / 10} meters &bull; {props.data.weight / 10} kg
          </Box>
        </Box>
        </Box>
        </HStack>
        <Text fontSize={'xl'} fontWeight={'semibold'}>Abilities</Text>
         {parsedAbilities}
         <Collapse in={show}>
         <Text fontSize={'xl'} fontWeight={'semibold'}>Base stats</Text>
         <Box px='0.5rem'>{parsedStats}</Box>
      </Collapse>
      <Button size='sm' onClick={handleToggle} mt='1rem'>
      {show ? 'Hide' : 'Show'} Stats 
      </Button>
        
        <Box>
          <Box as="span" color="gray.600" fontSize="sm"></Box>
        </Box>

        <Box display="flex" mt="2" alignItems="center">
          <Box as="span" ml="2" color="gray.600" fontSize="sm"></Box>
        </Box>
      </Box>
    </Box>
  )
}
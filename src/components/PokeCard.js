import {
  Collapse,
  Button,
  HStack,
  Box,
  Image,
  Badge,
  Text,
  Slider,
  SliderFilledTrack,
  SliderTrack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';

export default function PokeCard(props) {
  // state management for button
  const [show, setShow] = useState(false);
  const handleToggle = () => setShow(!show);

  // parses abilities from props to be used to create a list of abilities in the pokemon's display card
  const parsedAbilities = props.data.abilities.map(ability => {
    return (
      <Text key={ability.ability.name}>
        •{' '}
        {ability.ability.name.charAt(0).toUpperCase() +
          ability.ability.name.slice(1)}
      </Text>
    );
  });

  // parses stats from props to be used to create a list of stats in the pokemon's display card
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

  // parses types from props to be used to create a list of types in the pokemon's display card as a badge -- will render correct color used by actual Pokemon Pokedex as badge color
  const parsedTypes = props.data.types.map(type => {
    let typeColors = {
      normal: '#a7a778',
      fire: '#f08030',
      water: '#6890f0',
      grass: '#78c850',
      electric: '#f8d030',
      ice: '#98d8d8',
      fighting: '#872e2d',
      poison: '#a040a0',
      ground: '#e0c068',
      flying: '#a890f0',
      psychic: '#f75887',
      bug: '#a8b820',
      rock: '#b8a038',
      ghost: '#705898',
      dark: '#705848',
      dragon: '#7038f8',
      steel: '#b8b8d0',
      fairy: '#f0b6bc',
    };

    // assigns badge color variable to matching hex code from typeColors object above
    let badgeColor = '';
    for (const typeColor in typeColors) {
      if (type.type.name === typeColor) badgeColor = typeColors[type.type.name];
    }
    return (
      <Badge
        key={type.type.name}
        mr="2px"
        borderRadius="full"
        px="2"
        bgColor={badgeColor}
      >
        {type.type.name}
      </Badge>
    );
  });

  // create list of sprites from props
  let spriteList = [];
  for (const sprite in props.data.sprites) {
    spriteList.push(props.data.sprites[sprite]);
  }

  // parses sprite list and returns a list of Image components if the sprite url exists 
  const parsedSprites = spriteList.map(sprite => {
    if (typeof sprite === 'string' && sprite != null)
      return <Image key={sprite} src={sprite} />;
    else return null;
  });

  // removes null entries and creates final sprite list to be used in carousel
  const spritesListFinal = [];
  parsedSprites.map(sprite => {
    if (sprite) spritesListFinal.push(sprite);
    return spritesListFinal;
  });

  return (
    <Box
      w={'md'}
      key={props.data.id}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
    >
      <Box p="6">
        <HStack>
          <Carousel
            infiniteLoop={true}
            showStatus={false}
            showThumbs={false}
            width={200}
          >
            <Image src={props.data.sprites.front_default}></Image>
            {spritesListFinal.reverse()}
          </Carousel>
          <Box>
            <Text mb="5px" fontSize={'2xl'}>
              {props.data.name.charAt(0).toUpperCase() +
                props.data.name.slice(1)}
            </Text>
            <Box display="flex" alignItems="baseline">
              {parsedTypes}
            </Box>
            <Box
              color="gray.500"
              fontWeight="semibold"
              letterSpacing="wide"
              fontSize="xs"
              textTransform="uppercase"
              pt="5px"
            >
              {props.data.height / 10} meters &bull; {props.data.weight / 10} kg
            </Box>
          </Box>
        </HStack>
        <Text fontSize={'xl'} fontWeight={'semibold'}>
          Abilities
        </Text>
        {parsedAbilities}
        <Collapse in={show}>
          <Text fontSize={'xl'} fontWeight={'semibold'}>
            Base stats
          </Text>
          <Box px="0.5rem">{parsedStats}</Box>
        </Collapse>
        <Button size="sm" onClick={handleToggle} mt="1rem">
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
  );
}

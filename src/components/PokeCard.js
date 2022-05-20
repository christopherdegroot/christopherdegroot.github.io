import { Box, Image, Badge } from '@chakra-ui/react';

export default function PokeCard(props) {


const parsedAbilities = props.data.abilities.map((ability)=>{
  return <p>{ability.ability.name}</p>
})

const parsedStats = props.data.stats.map((stat)=>{
  return <p>{stat.stat.name}, {stat.base_stat}</p>
})

  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
        <Image src={props.data.sprites.back_default} alt={props.data.sprites.back_default} />
        <Box p="6">
            {props.data.name.charAt(0).toUpperCase() + props.data.name.slice(1)}
          <Box display="flex" alignItems="baseline">
            <Badge borderRadius="full" px="2" colorScheme="teal">
              {props.data.types[0].type.name}
            </Badge>
            <Box
              color="gray.500"
              fontWeight="semibold"
              letterSpacing="wide"
              fontSize="xs"
              textTransform="uppercase"
              ml="2"
            >
              {props.data.height/10} meters &bull; {props.data.weight/10} kg
            </Box>
          </Box>

          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            noOfLines={1}
            ></Box>
            {parsedAbilities}
            {parsedStats}
          <Box>
            <Box as="span" color="gray.600" fontSize="sm">
            </Box>
          </Box>

          <Box display="flex" mt="2" alignItems="center">
            <Box as="span" ml="2" color="gray.600" fontSize="sm"></Box>
          </Box>
        </Box>
      </Box>
  )
}
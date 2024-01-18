import { Box, Card, Chip, Typography } from "@mui/material";
import { Pokemon } from "../types/Pokemon";
import { COLORS } from "../utils/colors";
import formatStr from "../utils/formatStr";
import { useAppDispatch } from "../store/store";
import { setSelectedPokemon } from "../store/slices/pokeSlice";
import React from "react";

type Props = {
  pokemon: Pokemon,
}
const PokemonCard: React.FC<Props> = ({ pokemon }) => {
  const dispatch = useAppDispatch();

  const handleSelect = () => {
    dispatch(setSelectedPokemon(pokemon));
    window.scrollTo(0,0);
  }

  return (
    <Card 
      onClick={handleSelect}
      sx={{
        width: '200px',
        display:'flex',
        flexDirection:'column',
        boxShadow: 5,
        gap: 1,
        p:1,
        cursor: 'pointer',
      }}
    >
      <img src={pokemon.sprite} style={{width: '100%'}}/>
      <Typography variant="h6" textAlign={'center'}>{formatStr(pokemon.name)}</Typography>
      <Box sx={{display: 'flex', gap: 0.5}}>
        {pokemon.types.map(type => (
          <Chip key={type} label={type} sx={{ backgroundColor: COLORS[type] }}/>
        ))}
      </Box>
    </Card>
  )
}

export default React.memo(PokemonCard, (prev, next) => {
  return prev.pokemon.id === next.pokemon.id
});
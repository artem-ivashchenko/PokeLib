import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Pokemon } from "../../types/Pokemon";

type PokeState = {
  selectedPokemon: Pokemon | null,
  pokemons: Pokemon[];
  nextUrl: string;
  loading: boolean,
};

const initialState: PokeState = {
  selectedPokemon: null,
  pokemons: [],
  nextUrl: "https://pokeapi.co/api/v2/pokemon/?limit=12",
  loading: false,
};

export const fetchPokemons = createAsyncThunk(
  "poke/fetch",
  async (nextUrl: string) => {
    try {
      const responseAllPokemons = await fetch(nextUrl);
      
      const allPokemons = await responseAllPokemons.json();
      const { next, results } = allPokemons;

      const resultPokemons: Pokemon[] = await Promise.all(
        results.map(async (result: { name: string; url: string }) => {
          const response = await fetch(result.url);
          const pokemon = await response.json();

          return {
            id: pokemon.id,
            name: pokemon.name,
            sprite: pokemon.sprites.front_default,
            types: pokemon.types.map(
              (item: { slot: number; type: { [key: string]: string } }) =>
                item.type.name
            ),
            stats: [
              ...pokemon.stats.map(
                (item: {
                  base_stat: number;
                  effort: number;
                  stat: { name: string; url: string };
                }) => {
                  return [item.stat.name, item.base_stat];
                }
              ),
              ["total-moves", pokemon.moves.length],
              ["weight", pokemon.weight],
            ].sort((a, b) => a[0].localeCompare(b[0])),
          } as Pokemon;
        })
      );

      return { next, resultPokemons };
    } catch (error) {
      console.log(error);
    }
  }
);

export const pokeSLice = createSlice({
  name: "poke",
  initialState,
  reducers: {
    setSelectedPokemon: (state, action) => {
      state.selectedPokemon = action.payload;
    },
    clearSelectedPokemon:(state) => {
      state.selectedPokemon = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPokemons.pending, (state) => {
      state.loading = true;
    })
    builder.addCase(fetchPokemons.fulfilled, (state, action) => {
      state.pokemons = [
        ...state.pokemons,
        ...(action.payload?.resultPokemons || []),
      ]
      state.nextUrl = action.payload?.next;
      state.loading = false;
    });
    builder.addCase(fetchPokemons.rejected, (state) => {
      state.loading = false;
    })
  },
});

export const { setSelectedPokemon,clearSelectedPokemon } = pokeSLice.actions;
export default pokeSLice.reducer;

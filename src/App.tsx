import { useEffect } from "react";
import { fetchPokemons } from "./store/slices/pokeSlice";
import { useAppDispatch, useAppSelector } from "./store/store";
import Header from "./components/Header";
import { Stack } from "@mui/material";
import Main from "./components/Main";
import { fetchFilters } from "./store/slices/filterSlice";

function App() {
  const nextUrl = useAppSelector((state) => state.poke.nextUrl);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPokemons(nextUrl));
    dispatch(fetchFilters());
  }, []);

  return (
    <Stack minHeight='100vh'>
      <Header />
      <Main />
    </Stack>
  );
}

export default App;

import {
  Alert,
  Button,
  Card,
  CircularProgress,
  Container,
  Fab,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../store/store";
import PokemonCard from "./PokemonCard";
import { fetchPokemons } from "../store/slices/pokeSlice";
import DetailCard from "./DetailCard";
import { useMemo } from "react";

const Main: React.FC = () => {
  const { pokemons, nextUrl, selectedPokemon, loading } = useAppSelector(
    (state) => state.poke
  );
  const { selectedFilter } = useAppSelector((state) => state.filters);
  const dispatch = useAppDispatch();

  const visibleItems = useMemo(() => {
    return selectedFilter
      ? pokemons.filter((pokemon) => pokemon.types.includes(selectedFilter))
      : pokemons;
  }, [pokemons, selectedFilter]);

  const handleNextPage = () => {
    dispatch(fetchPokemons(nextUrl));
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexGrow: 1,
        marginBottom: 3,
      }}
    >
      <Card
        sx={{
          display: "flex",
          boxShadow: 5,
          flexGrow: 1,
          p: 3,
        }}
      >
        <Grid container spacing={2} sx={{ flexGrow: 1}}>
          <Grid item xs={12} md={5} sx={{ display: "flex" }}>
            {selectedPokemon ? (
              <DetailCard pokemon={selectedPokemon} />
            ) : (
              <Alert
                severity="info"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  height: "max-content",
                }}
              >
                <Typography variant="h6">
                  Click on any pokemon to see it's details!
                </Typography>
              </Alert>
            )}
          </Grid>
          <Grid item xs={12} md={7}>
            {!visibleItems.length && selectedFilter && (
              <Alert
                severity="warning"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  height: "max-content",
                }}
              >
                <Typography variant="h6">
                  Seems like there are no results
                </Typography>
              </Alert>
            )}
            <Stack
              direction="row"
              gap={2}
              sx={{ flexWrap: "wrap", justifyContent: "center" }}
            >
              {visibleItems.map((pokemon) => (
                <PokemonCard key={pokemon.id} pokemon={pokemon} />
              ))}

              {loading ? (
                <CircularProgress />
              ) : (
                !selectedFilter && (
                  <Button
                    onClick={handleNextPage}
                    variant="outlined"
                    sx={{
                      width: {
                        xs: "100%",
                        md: "200px",
                      },
                      marginInline: "auto",
                    }}
                  >
                    Load more
                  </Button>
                )
              )}
            </Stack>
          </Grid>
        </Grid>
      </Card>

      <Stack
        direction="row"
        gap={1}
        sx={{ position: "fixed", bottom: {xs: 15, md: 30}, right:  {xs: 15, md: 30} }}
      >
        <Fab color="primary" onClick={() => window.scrollTo(0, 0)}>
          &uarr;
        </Fab>

        <Fab
          color="primary"
          onClick={() =>
            window.scrollTo(0, document.documentElement.scrollHeight)
          }
        >
          &darr;
        </Fab>
      </Stack>
    </Container>
  );
};

export default Main;

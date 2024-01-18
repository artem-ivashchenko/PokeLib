import {
  Box,
  Button,
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../store/store";
import { clearFilter, setFilter } from "../store/slices/filterSlice";
import { clearSelectedPokemon } from "../store/slices/pokeSlice";
import { useEffect } from "react";

const Header: React.FC = () => {
  const { filterTypes, selectedFilter } = useAppSelector(
    (state) => state.filters
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(clearSelectedPokemon())
  }, [selectedFilter])
  
  const handleChange = (e: SelectChangeEvent<string>) => {
    dispatch(setFilter(e.target.value));
  };

  const clear = () => {
    dispatch(clearFilter());
  }

  return (
    <Card
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: 5,
        m: { xs: 1, sm: 3},
        p: { xs: 2, sm: 3 },
        backgroundImage: `url('banner.jpg')`,
        backgroundSize: "cover",
      }}
    >
      <Card
        sx={{
          p: 2,
          gap: {xs: 1, sm: 2},
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              aspectRatio: "1/1",
              width: { xs: "40px", sm: '60px' },
            }}
          >
            <img src="favicon.png" style={{ width: "100%", height: "100%" }} />
          </Box>
          <Typography variant="h6" textAlign='center' sx={{ fontSize: {xs: '14px', sm: '20px'}}}>
            PokeLib - your pocket encyclopedia!
          </Typography>
        </Box>

        {!!filterTypes.length && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Typography variant="h6">Filters:</Typography>

            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="select">Type</InputLabel>
              <Select
                labelId="select"
                value={selectedFilter}
                onChange={handleChange}
                label="Age"
              >
                {filterTypes.map((filter) => (
                  <MenuItem key={filter} value={filter}>
                    {filter}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

           {selectedFilter && (
             <Button variant="outlined" onClick={clear}>Clear</Button>
           )}
          </Box>
        )}
      </Card>
    </Card>
  );
};

export default Header;

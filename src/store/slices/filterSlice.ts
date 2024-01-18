import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type FilterState = {
  filterTypes: string[],
  selectedFilter: string,
};

const initialState: FilterState = {
  filterTypes: [],
  selectedFilter: ''
};

export const fetchFilters = createAsyncThunk('filter/get', async () => {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/type')
    const filters = await response.json();

    return filters.results.map((item: {name: string, url: string}) => item.name);
  } catch (error) {
    console.log(error);
  }
})

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.selectedFilter = action.payload;
    },
    clearFilter: (state) => {
      state.selectedFilter = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFilters.fulfilled, (state, action) => {
      state.filterTypes = action.payload
    })
  }
})

export default filterSlice.reducer;
export const {setFilter,clearFilter} = filterSlice.actions;
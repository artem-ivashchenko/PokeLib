import { configureStore } from '@reduxjs/toolkit'
import pokeReducer from './slices/pokeSlice';
import filterReducer from './slices/filterSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const store = configureStore({
  reducer: {
    poke: pokeReducer,
    filters: filterReducer,
  },
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
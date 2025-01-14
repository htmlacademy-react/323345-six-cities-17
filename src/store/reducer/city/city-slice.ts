import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CityNameType } from '../../../shared/types';
import { InitialCityType } from './initial-city-type';

const initialState: InitialCityType = {
  activeCity: 'Paris',
};

export const citySlice = createSlice({
  name: 'citySlice',
  initialState,
  reducers: {
    changeActiveCity(state, { payload }: PayloadAction<CityNameType>) {
      state.activeCity = payload;
    },
  },
});

export const { changeActiveCity } = citySlice.actions;

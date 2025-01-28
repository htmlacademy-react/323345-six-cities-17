import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CityNameType } from '../../../shared/types';
import { InitialCityType } from './index';

const initialState: InitialCityType = {
  activeCity: 'Paris',
};

const citySlice = createSlice({
  name: 'citySlice',
  initialState,
  reducers: {
    changeActiveCity(state, { payload }: PayloadAction<CityNameType>) {
      state.activeCity = payload;
    },
  },
});

export const { changeActiveCity } = citySlice.actions;
export { citySlice };

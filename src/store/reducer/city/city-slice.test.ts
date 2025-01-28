import { CityNameType } from '../../../shared/types';
import { citySlice } from './index';

describe('sitySlice', () => {
  const emptyAction = { type: '' };
  const expectedState = { activeCity: <CityNameType>'Paris' };

  it('should return initial state when empty action', () => {
    const result = citySlice.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should return default initial state whith empty action and undefined state', () => {
    const result = citySlice.reducer(undefined, emptyAction);
    expect(expectedState).toEqual(result);
  });
});

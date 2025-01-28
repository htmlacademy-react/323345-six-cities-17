import { combineReducers, createSlice } from '@reduxjs/toolkit';

describe('appReducer', () => {
  it('should return initial state whith empty action and should include citySlice, commentsSlice, favoriteSlice, offersSlice, userSlice', () => {
    const emptyAction = { type: '' };
    const expectedAppReducerState = {
      citySlice: {
        activeCity: 'Paris',
      },
      commentsSlice: {
        comments: [],
        isLoading: false,
      },
      favoriteSlice: {
        favoriteOffers: [],
        isLoading: false,
      },
      offersSlice: {
        activeOffer: null,
        offers: [],
        nearPoints: [],
        isLoading: true,
      },
      userSlice: {
        authorizationStatus: 'UNKNOWN',
        user: {
          name: null,
          isPro: false,
          email: null,
          token: null,
        },
        isLoading: false,
      },
    };
    const mockCitySlice = createSlice({
      name: 'citySlice',
      initialState: {
        activeCity: 'Paris',
      },
      reducers: {},
    });
    const mockCommentsSlice = createSlice({
      name: 'commentsSlice',
      initialState: {
        comments: [],
        isLoading: false,
      },
      reducers: {},
    });
    const mockFavoriteSlice = createSlice({
      name: 'favoriteSlice',
      initialState: {
        favoriteOffers: [],
        isLoading: false,
      },
      reducers: {},
    });
    const mockOffersSlice = createSlice({
      name: 'offersSlice',
      initialState: {
        activeOffer: null,
        offers: [],
        nearPoints: [],
        isLoading: true,
      },
      reducers: {},
    });
    const mockUserSlice = createSlice({
      name: 'userSlice',
      initialState: {
        authorizationStatus: 'UNKNOWN',
        user: {
          name: null,
          isPro: false,
          email: null,
          token: null,
        },
        isLoading: false,
      },
      reducers: {},
    });
    const mockAppReducer = combineReducers({
      citySlice: mockCitySlice.reducer,
      commentsSlice: mockCommentsSlice.reducer,
      favoriteSlice: mockFavoriteSlice.reducer,
      offersSlice: mockOffersSlice.reducer,
      userSlice: mockUserSlice.reducer,
    });
    const result = mockAppReducer(undefined, emptyAction);

    expect(result).toEqual(expectedAppReducerState);
  });
});

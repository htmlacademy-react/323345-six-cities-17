import { datatype } from 'faker';
import {
  changeActiveOffer,
  offersSlice,
  updateCurrentOffer,
  updateNearPoints,
  updateOffers,
} from './index';
import { InitialOffersType } from './index';
import { CurrentOfferType, OfferType } from '../../../shared/types';
import {
  fetchCurrentOfferAction,
  fetchNearPointsAction,
  fetchOffersAction,
} from './actions/offers-slice-actions';

describe('offersSlice', () => {
  const mockOffer: OfferType = {
    id: 'bc02547a-d034-41d3-992a-bae6b346ccd5',
    title: 'Tile House',
    type: 'hotel',
    price: 146,
    previewImage: 'https://16.design.htmlacademy.pro/static/hotel/8.jpg',
    city: {
      name: 'Dusseldorf',
      location: {
        latitude: 51.225402,
        longitude: 6.776314,
        zoom: 13,
      },
    },
    location: {
      latitude: 51.210402,
      longitude: 6.798314,
      zoom: 16,
    },
    isFavorite: false,
    isPremium: true,
    rating: 4.6,
  };
  let expectedState: InitialOffersType;
  beforeEach(() => {
    expectedState = {
      activeOffer: null,
      offers: [],
      currentOffer: undefined,
      nearPoints: [],
      isLoading: true,
    };
  });

  describe('should return initial state whith empty action and undefined state', () => {
    const emptyAction = { type: '' };
    it('should return initial state when empty action', () => {
      const result = offersSlice.reducer(expectedState, emptyAction);
      expect(expectedState).toEqual(result);
    });

    it('should return default initial state whith empty action and undefined state', () => {
      const result = offersSlice.reducer(undefined, emptyAction);
      expect(expectedState).toEqual(result);
    });
  });

  it('should set "changeActiveOffer" to a new value for activeOffer', () => {
    const mockActiveOffer = datatype.uuid();
    expectedState = { ...expectedState, activeOffer: mockActiveOffer };

    const result = offersSlice.reducer(
      undefined,
      changeActiveOffer(mockActiveOffer)
    );
    expect(expectedState).toEqual(result);
  });

  it('should set "updateCurrentOffer" to a new value for currentOffer', () => {
    const mockCurrentOffer: CurrentOfferType = {
      id: 'b3e9fb68-a196-4daa-b4e1-ebddb9eefe4d',
      title: 'The house among olive ',
      description:
        'I rent out a very sunny and bright apartment only 7 minutes walking distance to the metro station. The apartment has a spacious living room with a kitchen, one bedroom and a bathroom with mit bath. A terrace can be used in summer.',
      type: 'house',
      price: 240,
      images: [
        'https://16.design.htmlacademy.pro/static/hotel/5.jpg',
        'https://16.design.htmlacademy.pro/static/hotel/2.jpg',
        'https://16.design.htmlacademy.pro/static/hotel/12.jpg',
        'https://16.design.htmlacademy.pro/static/hotel/11.jpg',
        'https://16.design.htmlacademy.pro/static/hotel/16.jpg',
        'https://16.design.htmlacademy.pro/static/hotel/18.jpg',
      ],
      city: {
        name: 'Paris',
        location: {
          latitude: 48.85661,
          longitude: 2.351499,
          zoom: 13,
        },
      },
      location: {
        latitude: 48.858610000000006,
        longitude: 2.330499,
        zoom: 16,
      },
      goods: [
        'Fridge',
        'Washing machine',
        'Air conditioning',
        'Breakfast',
        'Dishwasher',
        'Wi-Fi',
        'Kitchen',
        'Coffee machine',
        'Cable TV',
      ],
      host: {
        isPro: true,
        name: 'Angelina',
        avatarUrl:
          'https://16.design.htmlacademy.pro/static/host/avatar-angelina.jpg',
      },
      isPremium: false,
      isFavorite: true,
      rating: 2.2,
      bedrooms: 4,
      maxAdults: 10,
    };
    expectedState = { ...expectedState, currentOffer: mockCurrentOffer };

    const result = offersSlice.reducer(
      undefined,
      updateCurrentOffer(mockCurrentOffer)
    );
    expect(expectedState).toEqual(result);
  });

  it('should set "updateOffers" to a new value for offers', () => {
    const newMockOffer = {
      ...mockOffer,
      title: `newMockTitle + ${mockOffer.title}`,
    };
    const mockInitialState = { ...expectedState, offers: [mockOffer] };
    expectedState = { ...expectedState, offers: [newMockOffer] };

    const result = offersSlice.reducer(
      mockInitialState,
      updateOffers(newMockOffer)
    );

    expect(expectedState).toEqual(result);
  });

  it('should set "updateNearPoints" to a new value for nearPoints', () => {
    const newMockOffer = {
      ...mockOffer,
      title: `newMockTitle + ${mockOffer.title}`,
    };
    const mockInitialState = { ...expectedState, nearPoints: [mockOffer] };
    expectedState = { ...expectedState, nearPoints: [newMockOffer] };

    const result = offersSlice.reducer(
      mockInitialState,
      updateNearPoints(newMockOffer)
    );

    expect(expectedState).toEqual(result);
  });

  describe('checks the validity of "fetchOffersAction" in pending, fulfilled, rejected state', () => {
    it('should set "isLoading" to "true" with "fetchOffersAction.pending" ', () => {
      const resultState = { ...expectedState, isLoading: true };
      const result = offersSlice.reducer(
        expectedState,
        fetchOffersAction.pending
      );
      expect(resultState).toEqual(result);
    });

    it('should set "mockOffer" to array with "offers" and set "isLoading" to "false" with "fetchOffersAction.fulfilled" ', () => {
      const resultState = {
        ...expectedState,
        offers: [mockOffer],
        isLoading: false,
      };
      const result = offersSlice.reducer(
        undefined,
        fetchOffersAction.fulfilled([mockOffer], '', undefined)
      );
      expect(resultState).toEqual(result);
    });

    it('should set "isLoading" to "false" with "fetchOffersAction.rejected" ', () => {
      const result = offersSlice.reducer(undefined, fetchOffersAction.rejected);
      const resultState = { ...expectedState, isLoading: false };
      expect(resultState).toEqual(result);
    });
  });

  describe('checks the validity of "fetchNearPointsAction" in pending, fulfilled, rejected state', () => {
    it('should set "isLoading" to "true" with "fetchNearPointsAction.pending" ', () => {
      const resultState = { ...expectedState, isLoading: true };
      const result = offersSlice.reducer(
        expectedState,
        fetchNearPointsAction.pending
      );
      expect(resultState).toEqual(result);
    });

    it('should set "mockOffer" to array with "nearPoints" and set "isLoading" to "false" with "fetchNearPointsAction.fulfilled" ', () => {
      const resultState = {
        ...expectedState,
        nearPoints: [mockOffer],
        isLoading: false,
      };
      const mockOfferId = datatype.uuid();
      const result = offersSlice.reducer(
        undefined,
        fetchNearPointsAction.fulfilled([mockOffer], '', mockOfferId)
      );
      expect(resultState).toEqual(result);
    });

    it('should set "isLoading" to "false" with "fetchNearPointsAction.rejected" ', () => {
      const result = offersSlice.reducer(
        undefined,
        fetchNearPointsAction.rejected
      );
      const resultState = { ...expectedState, isLoading: false };
      expect(resultState).toEqual(result);
    });
  });

  describe('checks the validity of "fetchCurrentOfferAction" in pending, fulfilled, rejected state', () => {
    it('should set "isLoading" to "true" with "fetchCurrentOfferAction.pending" ', () => {
      const resultState = { ...expectedState, isLoading: true };
      const result = offersSlice.reducer(
        expectedState,
        fetchCurrentOfferAction.pending
      );
      expect(resultState).toEqual(result);
    });

    it('should set "mockOffer" to array with "nearPoints" and set "isLoading" to "false" with "fetchCurrentOfferAction.fulfilled" ', () => {
      const mockCurrentOffer: CurrentOfferType = {
        id: '2c2f6e12-7e68-49a1-957a-2a29b2e2597b',
        title: 'Loft Studio in the Central Area',
        description:
          'Peaceful studio in the most wanted area in town. Quiet house Near of everything. Completely renovated. Lovely neighbourhood, lot of trendy shops, restaurants and bars in a walking distance.',
        type: 'room',
        price: 171,
        images: [
          'https://16.design.htmlacademy.pro/static/hotel/18.jpg',
          'https://16.design.htmlacademy.pro/static/hotel/14.jpg',
          'https://16.design.htmlacademy.pro/static/hotel/19.jpg',
          'https://16.design.htmlacademy.pro/static/hotel/3.jpg',
          'https://16.design.htmlacademy.pro/static/hotel/7.jpg',
          'https://16.design.htmlacademy.pro/static/hotel/4.jpg',
        ],
        city: {
          name: 'Paris',
          location: {
            latitude: 48.85661,
            longitude: 2.351499,
            zoom: 13,
          },
        },
        location: {
          latitude: 48.834610000000005,
          longitude: 2.335499,
          zoom: 16,
        },
        goods: [
          'Breakfast',
          'Coffee machine',
          'Dishwasher',
          'Laptop friendly workspace',
        ],
        host: {
          isPro: true,
          name: 'Angelina',
          avatarUrl:
            'https://16.design.htmlacademy.pro/static/host/avatar-angelina.jpg',
        },
        isPremium: false,
        isFavorite: false,
        rating: 2,
        bedrooms: 1,
        maxAdults: 2,
      };
      const resultState = {
        ...expectedState,
        currentOffer: mockCurrentOffer,
        isLoading: false,
      };
      const mockOfferId = datatype.uuid();
      const result = offersSlice.reducer(
        undefined,
        fetchCurrentOfferAction.fulfilled(mockCurrentOffer, '', mockOfferId)
      );
      expect(resultState).toEqual(result);
    });

    it('should set "isLoading" to "false" with "fetchCurrentOfferAction.rejected" ', () => {
      const result = offersSlice.reducer(
        undefined,
        fetchCurrentOfferAction.rejected
      );
      const resultState = { ...expectedState, isLoading: false };
      expect(resultState).toEqual(result);
    });
  });
});

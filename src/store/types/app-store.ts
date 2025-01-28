import { AuthStatus } from '../../shared/consts';
import { CommentType, OfferType, CityNameType } from '../../shared/types';

export type AppStore = {
  authorizationStatus: AuthStatus;
  userName: undefined | string;
  activeCity: CityNameType;
  activeOffer: string | undefined;
  offers: OfferType[];
  comments: CommentType[];
  favoriteOffers: OfferType[];
  isLoading: boolean;
  error: string | null | boolean;
};

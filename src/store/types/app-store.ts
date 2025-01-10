import { AuthStatus } from '../../shared/consts/auth-status';
import { CommentType, OfferType } from '../../shared/types';
import { CityNameType } from '../../shared/types';

export type AppStore = {
  AuthorizationStatus: AuthStatus;
  userName: undefined | string;
  activeCity: CityNameType;
  activeOffer: string | undefined;
  offers: OfferType[];
  comments: CommentType[];
  favoriteOffers: OfferType[];
  isLoading: boolean;
  error: string | null;
};

import { CityNameType } from '../../shared/types/types';

export type AppStore = {
  auth: boolean;
  activeCity: CityNameType;
  activeOffer: string | undefined;
};

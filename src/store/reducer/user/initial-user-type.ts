import { AuthStatus } from '../../../shared/consts';
import { UserType } from '../../../shared/types';

type InitialUserType = {
  authorizationStatus: AuthStatus;
  user: UserType;
  isLoading: boolean;
};

export type { InitialUserType };

import { AuthStatus } from '../../../shared/consts/auth-status';
import { UserType } from '../../../shared/types/types/user-type';

export type InitialUserType = {
  authorizationStatus: AuthStatus;
  user: UserType;
  isLoading: boolean;
  error: boolean;
};

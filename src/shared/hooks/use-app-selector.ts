import { TypedUseSelectorHook, useSelector } from 'react-redux';

import { AppState } from '../../store/types/app-state';

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

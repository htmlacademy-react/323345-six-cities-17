import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { AppState } from '../../store/types/app-state';

export const UseAppSelector: TypedUseSelectorHook<AppState> = useSelector;

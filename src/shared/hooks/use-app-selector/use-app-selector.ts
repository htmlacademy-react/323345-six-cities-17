import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { AppState } from '../../../store/types/app-state';

const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export default useAppSelector;

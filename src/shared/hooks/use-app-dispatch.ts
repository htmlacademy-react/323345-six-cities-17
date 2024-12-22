import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/types/app-state';

export const useAppDispatch = () => useDispatch<AppDispatch>();

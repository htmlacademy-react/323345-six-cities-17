import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/types/app-state';

export const UseAppDispatch = () => useDispatch<AppDispatch>();

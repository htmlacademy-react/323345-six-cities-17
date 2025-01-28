import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store/types/app-state';

const useAppDispatch = () => useDispatch<AppDispatch>();

export default useAppDispatch;

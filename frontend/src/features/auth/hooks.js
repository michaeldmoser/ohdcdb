import { useSelector } from 'react-redux';
import { selectToken } from './slice';

export const useAuth = () => useSelector(selectToken);

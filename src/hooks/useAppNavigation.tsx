import {useNavigation} from '@react-navigation/native';
import type {TStackNavigation} from '../interfaces/TStackNavigation';

const useAppNavigation = () => useNavigation<TStackNavigation>();

export default useAppNavigation;

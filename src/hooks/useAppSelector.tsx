import {TypedUseSelectorHook, useSelector} from 'react-redux';
import store from '../slices/store';

export type RootState = ReturnType<typeof store.getState>;

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default useAppSelector;

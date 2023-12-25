import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type TRootStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type TStackNavigation = NativeStackNavigationProp<TRootStackParamList>;

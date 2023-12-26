import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type TRootStackParamList = {
  Login: undefined;
  Register: undefined;
  Payment: undefined;
  Home: undefined;
  HomeScreen: undefined;
  TopUpScreen: undefined;
};

export type TStackNavigation = NativeStackNavigationProp<TRootStackParamList>;

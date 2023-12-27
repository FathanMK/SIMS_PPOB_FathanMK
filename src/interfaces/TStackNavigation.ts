import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type TRootStackParamList = {
  Login: undefined;
  Register: undefined;
  Payment: {
    service_code: string;
    service_icon: string;
    service_name: string;
    service_tariff: string;
  };
  Home: undefined;
  HomeScreen: undefined;
  TopUpScreen: undefined;
};

export type TStackNavigation = NativeStackNavigationProp<TRootStackParamList>;

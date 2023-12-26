import {useEffect} from 'react';
import Provider from './src/provider';
import SplashScreen from 'react-native-splash-screen';

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return <Provider />;
}

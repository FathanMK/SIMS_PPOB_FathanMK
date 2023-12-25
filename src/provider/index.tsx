import {NavigationContainer} from '@react-navigation/native';
import {GluestackUIProvider} from '@gluestack-ui/themed';
import Router from '../router';
import { config } from '../../config/gluestack-ui.config';

export default function Provider() {
  return (
    <GluestackUIProvider config={config}>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
    </GluestackUIProvider>
  );
}

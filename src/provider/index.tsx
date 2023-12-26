import {NavigationContainer} from '@react-navigation/native';
import {GluestackUIProvider} from '@gluestack-ui/themed';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {Provider as ReduxProvider} from 'react-redux';
import Router from '../router';
import {config} from '../../config/gluestack-ui.config';
import store from '../slices/store';

const queryClient = new QueryClient();

export default function Provider() {
  return (
    <ReduxProvider store={store}>
      <GluestackUIProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <NavigationContainer>
            <Router />
          </NavigationContainer>
        </QueryClientProvider>
      </GluestackUIProvider>
    </ReduxProvider>
  );
}

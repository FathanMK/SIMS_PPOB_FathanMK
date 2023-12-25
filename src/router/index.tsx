import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/Login/LoginScreen';
import RegisterScreen from '../screens/Register/RegisterScreen';

const Stack = createNativeStackNavigator();

export default function Router() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}

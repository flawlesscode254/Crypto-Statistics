import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import AppStack from './stacks/AppStack';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" />
      <AppStack />
    </NavigationContainer>
  );
}
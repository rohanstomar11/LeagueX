import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from './src/screens/splash';
import PlayerView from './src/screens/playerview';
import PlayerSelection from './src/screens/playerselection';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="SplashScreen">
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="PlayerViewScreen" component={PlayerView} />
        <Stack.Screen
          name="PlayerSelectionScreen"
          component={PlayerSelection}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

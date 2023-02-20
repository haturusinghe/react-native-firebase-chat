/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import * as React from 'react';
import {Text, View} from 'react-native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {LoginPage} from './src/screens/LoginPage';
import {ForgotPasswordPage} from './src/screens/ForgotPassword';
import {routes} from './src/constants';

function HomeScreen() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen one</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name={routes.home} component={HomeScreen} />
        <Stack.Screen
          name={routes.login}
          component={LoginPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={routes.forgotPassword}
          component={ForgotPasswordPage}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

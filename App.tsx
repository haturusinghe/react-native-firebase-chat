/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import * as React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {LoginPage} from './src/screens/LoginPage';
import {ForgotPasswordPage} from './src/screens/ForgotPassword';
import {routes} from './src/constants';
import {HomeScreen} from './src/screens/Home';
import {BottomTabs} from './src/components/BottomTabs';
import {NewsDetails} from './src/screens/NewsDetails';
import {EventScheduleDetails} from './src/screens/EventScheduleDetails';
import {Participants} from './src/screens/Participants';
import {Profile} from './src/screens/Profile';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name={routes.home}
          component={BottomTabs}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={routes.login}
          component={LoginPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={routes.forgotPassword}
          component={ForgotPasswordPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={routes.newsDetails}
          component={NewsDetails}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={routes.scheduleDetails}
          component={EventScheduleDetails}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={routes.participants}
          component={Participants}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={routes.profile}
          component={Profile}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

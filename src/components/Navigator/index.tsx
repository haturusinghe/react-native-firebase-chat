import * as React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {ForgotPasswordPage} from '../../screens/ForgotPassword';
import {routes} from '../../constants';
import BottomTabs from '../../components/BottomTabs';
import {NewsDetails} from '../../screens/NewsDetails';
import {EventScheduleDetails} from '../../screens/EventScheduleDetails';
import {Participants} from '../../screens/Participants';
import {Profile} from '../../screens/Profile';
import {SubDirectory} from '../../screens/SubDirectory';
import {About} from '../../screens/About';
import {CompanyProfile} from '../../screens/ComapyProfile';
import {Chat} from '../../screens/Chat';
import {checkUser} from '../../store/user';
import {useAppDispatch} from '../../hooks/useRedux';
import LoginPage from '../../screens/LoginPage';
import {StoryDetails} from '../../screens/StoryDetails';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {EventMenu} from '../../screens/EventMenu';
import {SponsorList} from '../../screens/SponsorList';

const Stack = createNativeStackNavigator();

export const Navigator = () => {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(checkUser());
  }, []);

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
        <Stack.Screen
          name={routes.subDirectory}
          component={SubDirectory}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={routes.about}
          component={About}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={routes.companyProfile}
          component={CompanyProfile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={routes.chat}
          component={Chat}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={routes.storyDetails}
          component={StoryDetails}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={routes.eventMenu}
          component={EventMenu}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={routes.sponsorList}
          component={SponsorList}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

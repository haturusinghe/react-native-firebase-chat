import * as React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {ForgotPasswordPage} from '../../screens/ForgotPassword';
import {routes} from '../../constants';
import BottomTabs from '../../components/BottomTabs';
import NewsDetails from '../../screens/NewsDetails';
import {EventScheduleDetails} from '../../screens/EventScheduleDetails';
import {Participants} from '../../screens/Participants';
import {Profile} from '../../screens/Profile';
import {MemberList} from '../../screens/MemberList';
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
import {SessionList} from '../../screens/SessionList';
import {ActivityIndicator, Linking, SafeAreaView} from 'react-native';
import {MemberProfile} from '../../screens/MemberProfile';
import {ComapanyProfileRepresentives} from '../../screens/CompanyProfileRepresentived';
import {BoardMemberList} from '../../screens/BoardMemberList';
import {OfficeBearerList} from '../../screens/OfficeBearerList';
import {createNavigationContainerRef} from '@react-navigation/native';
import UpdateProfile from '../../screens/UpdateProfile';

const Stack = createNativeStackNavigator();

export const Navigator = () => {
  const dispatch = useAppDispatch();
  const navigationRef = createNavigationContainerRef();

  React.useEffect(() => {
    dispatch(checkUser());
  }, []);

  function navigate(name: string, params: any) {
    if (navigationRef.isReady()) {
      navigationRef.navigate(name, params);
    }
  }

  React.useEffect(() => {
    Linking.getInitialURL().then(url => {
      handleDeepLinking(url);
    });
    Linking.addEventListener('url', event => {
      handleDeepLinking(event.url);
    });

    return () => {
      // Linking.removeSubscription(sub);
    };
  }, []);

  const handleDeepLinking = (url: any) => {
    const route = url?.replace(/.*?:\/\//g, '');
    const routeName = route?.split('/')[0];
    const params = route?.split('/')[1];
    if (routeName) {
      navigate(routeName, {isFromNotification: true, id: params});
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator>
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
            name={routes.memberList}
            component={MemberList}
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
          <Stack.Screen
            name={routes.sessionList}
            component={SessionList}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={routes.memberProfile}
            component={MemberProfile}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={routes.campanyProfileRepresentives}
            component={ComapanyProfileRepresentives}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={routes.boardMemberList}
            component={BoardMemberList}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={routes.officeBearers}
            component={OfficeBearerList}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={routes.updateProfile}
            component={UpdateProfile}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

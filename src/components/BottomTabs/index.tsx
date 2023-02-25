import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {EventSchedule} from '../../screens/EventSchedule';
import {ForgotPasswordPage} from '../../screens/ForgotPassword';
import {HomeScreen} from '../../screens/Home';
import {NotificationPage} from '../../screens/NotificationPage';

const Tab = createBottomTabNavigator();

export const BottomTabs = () => {
  return (
    <Tab.Navigator initialRouteName="hel">
      <Tab.Screen
        name="hel"
        component={HomeScreen}
        options={{
          title: 'Feed',
          headerShown: false,
          tabBarIcon: ({color}) => {
            return <Icon name="home" />;
          },
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={EventSchedule}
        options={{
          title: 'Calendar',
          headerShown: false,
          tabBarIcon: ({color}) => {
            return <Icon name="event" />;
          },
        }}
      />
      <Tab.Screen
        name="notifications"
        component={NotificationPage}
        options={{
          title: 'Notifications',
          headerShown: false,
          tabBarIcon: ({color}) => {
            return <Icon name="notifications" />;
          },
        }}
      />
      <Tab.Screen
        name="Community"
        component={ForgotPasswordPage}
        options={{
          title: 'Community',
          headerShown: false,
          tabBarIcon: ({color}) => {
            return <Icon name="groups" />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

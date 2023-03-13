import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {withAuth} from '../../hoc/withAuth';
import {Directory} from '../../screens/Directory';
import {EventSchedule} from '../../screens/EventSchedule';
import HomeScreen from '../../screens/Home';
import {NotificationPage} from '../../screens/NotificationPage';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator initialRouteName="hel">
      <Tab.Screen
        name="hel"
        component={HomeScreen}
        options={{
          title: 'Feed',
          headerShown: false,
          tabBarIcon: () => {
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
          tabBarIcon: () => {
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
          tabBarIcon: () => {
            return <Icon name="notifications" />;
          },
        }}
      />
      <Tab.Screen
        name="Community"
        component={Directory}
        options={{
          title: 'Community',
          headerShown: false,
          tabBarIcon: () => {
            return <Icon name="groups" />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default withAuth(BottomTabs);

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {colors} from '../../constants';
import {withAuth} from '../../hoc/withAuth';
import {Directory} from '../../screens/Directory';
import {EventSchedule} from '../../screens/EventSchedule';
import HomeScreen from '../../screens/Home';
import {MySchedule} from '../../screens/MySchedule';
import {NotificationPage} from '../../screens/NotificationPage';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="News"
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused, color, size}) => {
          let iconName: string = 'home';
          if (route.name === 'News') {
            iconName = 'rss';
          } else if (route.name === 'Events') {
            iconName = 'credit-card-outline';
          } else if (route.name === 'My Schedule') {
            iconName = 'dns-outline';
          } else if (route.name === 'notifications') {
            iconName = 'bell-outline';
          } else if (route.name === 'Community') {
            iconName = 'account-group-outline';
          }
          return (
            <Icon
              name={iconName}
              size={size}
              color={color}
              type="material-community"
            />
          );
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.white,
        tabBarStyle: {
          paddingVertical: 5,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          backgroundColor: 'black',
          position: 'absolute',
          height: 50,
        },
        tabBarLabelStyle: {paddingBottom: 3},
      })}>
      <Tab.Screen name="News" component={HomeScreen} />
      <Tab.Screen name="Events" component={EventSchedule} />
      <Tab.Screen name="My Schedule" component={MySchedule} />
      <Tab.Screen name="notifications" component={NotificationPage} />
      <Tab.Screen name="Community" component={Directory} />
    </Tab.Navigator>
  );
};

export default withAuth(BottomTabs);

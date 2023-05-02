import {StackActions, useNavigation} from '@react-navigation/native';
import moment from 'moment';
import * as React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Avatar, Text} from 'react-native-elements';
import {routes} from '../../constants';
import {styles} from './style';

export interface INotification {
  _id: string;
  title: string;
  description: string;
  type: string;
  news?: string;
  createdAt: string;
  users?: {
    _id: string;
    viewed: boolean;
    user: string;
  };
}

export const NotificationElement = ({
  notification,
}: {
  notification: INotification;
}) => {
  console.log(notification.users);

  const navigation = useNavigation();
  const navigateProfilePage = () => {
    // TODO change the url and the data based on the notification Type(for now we only have one type)
    navigation.dispatch({
      ...StackActions.push(routes.newsDetails, {
        id: notification.news,
        isFromNotification: true,
        notificationId: notification._id,
      }),
    });
  };
  const timeDiff = moment(new Date()).diff(
    moment(notification.createdAt),
    'hours',
  );
  return (
    <TouchableOpacity style={styles.card} onPress={navigateProfilePage}>
      <View style={styles.row}>
        <View style={styles.content}>
          <Text style={styles.title}>{notification.title}</Text>
          <Text style={styles.text}>{notification.description}</Text>
        </View>
        <View style={styles.flexEnd}>
          <Text style={styles.time}>
            {timeDiff >= 24
              ? Math.floor(timeDiff / 24) +
                ` day${Math.floor(timeDiff / 24) > 1 ? 's' : ''} ago`
              : timeDiff + ' hours ago'}
          </Text>
        </View>
        {!notification?.users?.viewed && (
          <Avatar size={8} containerStyle={styles.avatar} rounded />
        )}
      </View>
    </TouchableOpacity>
  );
};

import {StackActions, useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-elements';
import {routes} from '../../constants';
import {styles} from './style';

export const NotificationElement = () => {
  const navigation = useNavigation();
  const navigateProfilePage = () => {
    navigation.dispatch({
      ...StackActions.push(routes.profile),
    });
  };
  return (
    <TouchableOpacity style={styles.card} onPress={navigateProfilePage}>
      <View style={styles.row}>
        <View style={styles.content}>
          <Text style={styles.title}>Event Updated</Text>
          <Text style={styles.text}>
            Mid term board meeting schedule changed
          </Text>
        </View>
        <View style={styles.flexEnd}>
          <Text style={styles.time}>5 hours ago</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

import {StackActions, useNavigation} from '@react-navigation/native';
import moment from 'moment';
import * as React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Icon, Text} from 'react-native-elements';
import {colors, routes} from '../../constants';
import {styles} from './style';

export const ScheduleElement = () => {
  const navigation = useNavigation();
  const navigateDetailsPage = () => {
    navigation.dispatch({
      ...StackActions.push(routes.newsDetails),
    });
  };
  return (
    <TouchableOpacity style={styles.card} onPress={navigateDetailsPage}>
      <Text style={styles.title}>{'Season 2: Cross border contracting'}</Text>
      <View style={styles.row}>
        <Text style={styles.date}>
          Date : {moment(new Date()).format('MMMM DD, YYYY')}
        </Text>
        <Text style={styles.date}>{'Location : Taj Mahal hotel, India'}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.date}>
          Time : {moment(new Date()).format('mm: ss')}
        </Text>
        <Text style={styles.date}>{'Duration : two hoursm'}</Text>
      </View>
      <View style={[styles.row, styles.forMoreDetails]}>
        <Text style={styles.forMoreDetailsText}>For more Details</Text>
        <Icon
          name="arrow-circle-o-right"
          type="font-awesome"
          size={18}
          color={colors.black}
        />
      </View>
    </TouchableOpacity>
  );
};

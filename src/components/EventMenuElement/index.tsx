import {StackActions, useNavigation} from '@react-navigation/native';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-elements';
import {routes} from '../../constants';
import {Event} from '../../store/event';
import {styles} from './style';

export const EventMenuElement = ({
  id,
  title,
  subTitle,
  startTime,
  endTime,
}: {
  id: string;
  title?: string;
  subTitle?: string;
  startTime?: string;
  endTime?: string;
}) => {
  const [dateString, setDateString] = useState('');
  const navigation = useNavigation();
  const navigateDetailsPage = () => {
    navigation.dispatch({
      ...StackActions.push(routes.newsDetails, {id: id}),
    });
  };
  // TODO change the date string if month or year is diff

  return (
    <TouchableOpacity style={styles.card} onPress={navigateDetailsPage}>
      <View style={styles.dateRangeSection}>
        <Text style={styles.dateRange}>{subTitle}</Text>
      </View>
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subTitle}>{`${moment(startTime).format(
          'DD',
        )} - ${moment(endTime).format('DD')} ${moment(startTime).format(
          'MMMM YYYY',
        )}`}</Text>
      </View>
    </TouchableOpacity>
  );
};

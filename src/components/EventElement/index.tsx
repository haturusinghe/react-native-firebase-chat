import {StackActions, useNavigation} from '@react-navigation/native';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-elements';
import {colors, routes} from '../../constants';
import {Event} from '../../store/event';
import {styles} from './style';

export const EventElement = ({
  data: event,
  isPast = false,
}: {
  data: Event;
  isPast?: boolean;
}) => {
  const [dateString, setDateString] = useState('');
  const navigation = useNavigation();
  const navigateDetailsPage = () => {
    navigation.dispatch({
      ...StackActions.push(routes.eventMenu, {id: event._id, isPast}),
    });
  };
  useEffect(() => {
    // TODO change the date string if month or year is diff
    if (
      new Date(event.startTime).getMonth() ===
        new Date(event.endTime).getMonth() &&
      new Date(event.startTime).getFullYear() ===
        new Date(event.endTime).getFullYear()
    ) {
      setDateString(
        `${new Date(event.startTime).getDay().toString()} - ${new Date(
          event.endTime,
        )
          .getDay()
          .toString()} ${moment(event.startTime).format('MMMM')}`,
      );
    }
  }, []);

  return (
    <TouchableOpacity style={styles.card} onPress={navigateDetailsPage}>
      <View
        style={[
          styles.dateRangeSection,
          {backgroundColor: isPast ? colors.grey : colors.primary},
        ]}>
        <Text style={styles.dateRange}>
          {`${moment(event.startTime).format('DD')} - ${moment(
            event.endTime,
          ).format('DD')}`}
        </Text>
        <Text style={styles.dateRangeMonth}>
          {moment(event.startTime).format('MMMM YYYY')}
        </Text>
      </View>
      <View>
        <Text style={styles.title}>{event.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

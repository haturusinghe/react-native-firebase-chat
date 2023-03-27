import {StackActions, useNavigation} from '@react-navigation/native';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Icon, Text} from 'react-native-elements';
import {colors, routes} from '../../constants';
import {Event} from '../../store/event';
import {styles} from './style';

export const EventMenuElement = ({
  id,
  title,
  subTitle,
  startTime,
  endTime,
  url,
  isPast,
}: {
  id: string;
  title?: string;
  subTitle?: string;
  startTime?: string;
  endTime?: string;
  url: string;
  isPast: boolean;
}) => {
  const navigation = useNavigation();
  const navigateDetailsPage = () => {
    navigation.dispatch({
      ...StackActions.push(url, {id: id, isPast}),
    });
  };
  // TODO change the date string if month or year is diff

  return (
    <TouchableOpacity style={styles.card} onPress={navigateDetailsPage}>
      <View
        style={[
          styles.dateRangeSection,
          {backgroundColor: isPast ? colors.grey : colors.primary},
        ]}>
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
      <View style={styles.flexEnd}>
        <Icon
          name="caret-right"
          type="font-awesome"
          size={25}
          color={colors.black}
        />
      </View>
    </TouchableOpacity>
  );
};

import {StackActions, useNavigation} from '@react-navigation/native';
import moment from 'moment';
import * as React from 'react';
import {TouchableOpacity} from 'react-native';
import {Text} from 'react-native-elements';
import {routes} from '../../constants';
import {styles} from './style';

export const FeedElement = ({
  id,
  title,
  date,
}: {
  id: string;
  title: string;
  date: string;
}) => {
  const navigation = useNavigation();
  const navigateDetailsPage = () => {
    navigation.dispatch({
      ...StackActions.push(routes.newsDetails, {id: id}),
    });
  };
  return (
    <TouchableOpacity style={styles.card} onPress={navigateDetailsPage}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.date}>{moment(date).format('MMMM DD, YYYY')}</Text>
    </TouchableOpacity>
  );
};

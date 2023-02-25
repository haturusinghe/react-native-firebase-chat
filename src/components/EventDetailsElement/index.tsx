import {StackActions, useNavigation} from '@react-navigation/native';
import moment from 'moment';
import * as React from 'react';
import {View} from 'react-native';
import {Chip, Icon, Text} from 'react-native-elements';
import {colors, routes} from '../../constants';
import {styles} from './style';

export const EventDetailsElement = () => {
  const navigation = useNavigation();
  const navigateParticipantPage = () => {
    navigation.dispatch({
      ...StackActions.push(routes.participants),
    });
  };
  return (
    <View style={styles.card}>
      <View style={styles.titleRow}>
        <Text style={styles.title}>{'Season 2: Cross border contracting'}</Text>
        <Icon name="file" type="font-awesome" size={18} color={colors.black} />
      </View>
      <Text style={styles.description}>
        <Text style={styles.descriptionTitle}>Description</Text>User shall be
        able to click on the “Accept”, “Tentative” or “Decline” button and
        declare their preference.  When a user clicks on “Accept”, “Tentative”
        or “Decline” buttons, those event cards will be appearing in “My
        Schedule” tab.  By clicking black button next to Decline button, user
        shall be able to view the other users who have Accepted or
      </Text>
      <View style={styles.row}>
        <Text style={styles.date}>
          <Text style={styles.textWeight}>Date :</Text>{' '}
          {moment(new Date()).format('MMMM DD, YYYY')}
        </Text>
        <Text style={styles.date}>
          <Text style={styles.textWeight}>Location :</Text>
          {'Taj Mahal hotel, India'}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.date}>
          <Text style={styles.textWeight}>Time :</Text>{' '}
          {moment(new Date()).format('mm: ss')}
        </Text>
        <Text style={styles.date}>
          {' '}
          <Text style={styles.textWeight}>Duration :</Text>
          two hours
        </Text>
      </View>
      <Text style={styles.date}>
        <Text style={styles.textWeight}>Organizer :</Text>
        {'Mr. some organizer'}
      </Text>
      <Text style={styles.date}>
        <Text style={styles.textWeight}>Speaker :</Text>
        {'Mr. Some name'}
      </Text>
      <Text style={styles.date}>
        <Text style={styles.textWeight}>Attendees :</Text>
        {'Open to all members'}
      </Text>
      <View style={[styles.row, styles.buttonSet]}>
        <Chip
          title="Accept"
          type="outline"
          iconRight={true}
          icon={
            <Icon
              name="check"
              type="font-awesome"
              size={18}
              color={colors.success}
            />
          }
          titleStyle={{color: colors.success}}
          buttonStyle={{borderColor: colors.success}}
        />
        <Chip
          title="Tentative"
          type="outline"
          iconRight={true}
          icon={
            <Icon
              name="question"
              type="font-awesome"
              size={18}
              color={colors.primary_dark}
            />
          }
          titleStyle={{color: colors.primary_dark}}
          buttonStyle={{borderColor: colors.primary_dark}}
        />
        <Chip
          title="Decline"
          type="outline"
          iconRight={true}
          icon={
            <Icon
              name="ban"
              type="font-awesome"
              size={18}
              color={colors.error}
            />
          }
          titleStyle={{color: colors.error}}
          buttonStyle={{borderColor: colors.error}}
        />
        <Chip
          //   title="Decline"
          iconRight={true}
          icon={
            <Icon
              name="group"
              type="font-awesome"
              size={18}
              color={colors.white}
            />
          }
          titleStyle={{color: colors.error}}
          buttonStyle={{
            borderColor: colors.error,
            backgroundColor: colors.black,
          }}
          onPress={navigateParticipantPage}
        />
      </View>
    </View>
  );
};

import {StackActions, useNavigation} from '@react-navigation/native';
import moment from 'moment';
import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Chip, Icon, Text} from 'react-native-elements';
import {colors, routes} from '../../constants';
import {useAppSelector} from '../../hooks/useRedux';
import {Session, sessionUserStatusType, UserSession} from '../../store/event';
import {SessionButtonSet} from '../SessionButtonSet';
import {styles} from './style';

export const SessionListElement = ({
  data: session,
  index,
  eventId,
  isPast,
}: {
  data: Session;
  eventId: string;
  index: number;
  isPast: boolean;
}) => {
  const {user} = useAppSelector(store => store.user);
  const [isVisible, setIsVisible] = useState(false);

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        setIsVisible(!isVisible);
      }}>
      <View style={styles.row}>
        <View
          style={[
            styles.dateRangeSection,
            {backgroundColor: isPast ? colors.grey : colors.primary},
          ]}>
          <Text
            style={[
              styles.dateRange,
              session.isMandatory ? styles.TextRed : {},
            ]}>
            {moment(session.startTime).format('DD')}
          </Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>{`Session ${index + 1} : ${
            session.title
          }`}</Text>
          {session.isMandatory && (
            <Text style={styles.subTitle}>{'Participation Required'}</Text>
          )}
        </View>
        <View style={styles.flexEnd}>
          <Icon
            name={isVisible ? 'caret-up' : 'caret-down'}
            type="font-awesome"
            size={25}
            color={colors.black}
          />
        </View>
      </View>
      {isVisible && (
        <View style={styles.subContent}>
          <Text style={styles.SubContentText}>
            <Text style={styles.title}>Description: </Text>
            {session.description}
          </Text>
          <Text style={[styles.marginTop, styles.SubContentText]}>
            <Text style={styles.title}>Date: </Text>
            {moment(session.startTime).format('MMMM DD, YYYY')}
          </Text>
          <View style={[styles.row, styles.marginTop]}>
            <Text style={[styles.flexOne, styles.SubContentText]}>
              <Text style={styles.title}>Time: </Text>
              {`${moment(session.startTime).format('hh: mm a')} - ${moment(
                session.endTime,
              ).format('hh: mm a')}`}
            </Text>
            <Text style={[styles.flexOne, styles.SubContentText]}>
              <Text style={styles.title}>Duration: </Text>
              {moment(
                moment(session.endTime).diff(moment(session.startTime)),
              ).format('hh: mm')}
            </Text>
          </View>
          <Text style={[styles.marginTop, styles.SubContentText]}>
            <Text style={styles.title}>Location: </Text>
            {session.location}
          </Text>
          <Text style={[styles.marginTop, styles.SubContentText]}>
            <Text style={styles.title}>Address: </Text>
            {session.address}
          </Text>
          {session.isMandatory ? (
            <Text style={[styles.marginTop, styles.SubContentText]}>
              <Text style={styles.title}>No of Seats :</Text>
              {session.seats}
            </Text>
          ) : (session.seats - (session.acceptedCount || 0) > 0 ||
              session.usersession.filter(
                (usersession: UserSession) => usersession.user === user?._id,
              )[0]?.status === sessionUserStatusType.accept) &&
            !isPast ? (
            <View>
              <View style={[styles.SeatCard, styles.marginTop]}>
                <Text style={styles.SubContentText}>
                  <Text style={styles.title}>Total Available of Seats :</Text>
                  {session.seats - (session.acceptedCount || 0)}
                </Text>
                <View style={[styles.row, styles.marginTop]}>
                  <Icon
                    name="calendar"
                    type="font-awesome"
                    size={35}
                    color={colors.black}
                  />
                  <View style={styles.seatContent}>
                    <Text style={styles.SubContentText}>
                      Seats are available
                    </Text>
                    <Text style={styles.seatTitle}>
                      Confirm your participation for a reservation
                    </Text>
                  </View>
                </View>
              </View>
              <SessionButtonSet
                sessionId={session._id}
                eventId={eventId}
                isPast={isPast}
              />
            </View>
          ) : (
            <></>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

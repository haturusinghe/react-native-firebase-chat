import {StackActions, useNavigation} from '@react-navigation/native';
import moment from 'moment';
import * as React from 'react';
import {View} from 'react-native';
import {Chip, Icon, Text} from 'react-native-elements';
import {API_ROUTES, colors, HTTP_TYPES, routes} from '../../constants';
import {useMutation} from '../../hooks/useMutate';
import {useAppDispatch, useAppSelector} from '../../hooks/useRedux';
import {Session, sessionUserStatusType, UserSession} from '../../store/event';
import {updateSession} from '../../store/mySchedule';
import {DownloadFile} from '../DownloadFile';
import {LoadingWrapper} from '../LoadingWrapper';
import {styles} from './style';

export const EventDetailsElement = ({session}: {session: Session}) => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const isPast =
    moment(session.startTime).isBefore(moment()) || session.isMandatory;
  const {user} = useAppSelector(store => store.user);
  const [userSession, setUserSession] = React.useState(
    session.usersession.find(
      (userSession: UserSession) => userSession.user === user?._id,
    ) || null,
  );

  React.useEffect(() => {
    setUserSession(
      session.usersession.find(
        (userSession: UserSession) => userSession.user === user?._id,
      ) || null,
    );
  }, [session]);

  const {loading, mutate} = useMutation({
    url: API_ROUTES.EVENTS.UPDATE_USER_SESSION_BY_ID,
  });

  const navigateParticipantPage = () => {
    navigation.dispatch({
      ...StackActions.push(routes.participants, {id: session._id}),
    });
  };
  const updateState = async (type: sessionUserStatusType) => {
    const res = await mutate(
      {sessionUserId: userSession?._id, status: type},
      HTTP_TYPES.PUT,
    );
    if (res.success) {
      dispatch(updateSession(res.data.sessionUser));
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.titleRow}>
        <Text style={styles.title}>{session.title}</Text>
        {/* <Icon name="file" type="font-awesome" size={18} color={colors.black} /> */}
        <DownloadFile url="this is the url" />
      </View>
      <View style={styles.row}>
        <Text style={styles.date}>
          <Text style={styles.textWeight}>Date :</Text>{' '}
          {moment(new Date(session.startTime)).format('MMMM DD, YYYY')}
        </Text>
        <Text style={styles.date}>
          <Text style={styles.textWeight}>Location :</Text>
          {session.location}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.date}>
          <Text style={styles.textWeight}>Time :</Text>{' '}
          {moment(new Date(session.startTime)).format('mm: ss')}
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
      {session.isMandatory && (
        <Text style={styles.date}>
          <Text style={styles.textWeight}>Attendees :</Text>
          {'Open to all members'}
        </Text>
      )}
      {/* <SessionButtonSet /> */}
      <LoadingWrapper loading={loading}>
        <View style={[styles.row, styles.buttonSet]}>
          <Chip
            title="Accept"
            disabled={isPast}
            onPress={() => updateState(sessionUserStatusType.accept)}
            type={
              userSession?.status === sessionUserStatusType.accept
                ? 'solid'
                : 'outline'
            }
            iconRight={true}
            icon={
              <Icon
                name="check"
                type="font-awesome"
                size={18}
                color={
                  userSession?.status === sessionUserStatusType.accept
                    ? colors.white
                    : colors.success
                }
              />
            }
            titleStyle={{
              color:
                userSession?.status === sessionUserStatusType.accept
                  ? colors.white
                  : colors.success,
            }}
            buttonStyle={{
              borderColor: colors.success,
              borderWidth: 2,
              backgroundColor:
                userSession?.status === sessionUserStatusType.accept
                  ? colors.success
                  : colors.white,
            }}
          />
          <Chip
            title="Tentative"
            disabled={isPast}
            onPress={() => updateState(sessionUserStatusType.tentative)}
            type={
              userSession?.status === sessionUserStatusType.tentative
                ? 'solid'
                : 'outline'
            }
            iconRight={true}
            icon={
              <Icon
                name="question"
                type="font-awesome"
                size={18}
                color={
                  userSession?.status === sessionUserStatusType.tentative
                    ? colors.white
                    : colors.primary_dark
                }
              />
            }
            titleStyle={{
              color:
                userSession?.status === sessionUserStatusType.tentative
                  ? colors.white
                  : colors.primary_dark,
            }}
            buttonStyle={{
              borderColor: colors.primary_dark,
              borderWidth: 2,
              backgroundColor:
                userSession?.status === sessionUserStatusType.tentative
                  ? colors.primary_dark
                  : colors.white,
            }}
          />
          <Chip
            title="Decline"
            disabled={isPast}
            onPress={() => updateState(sessionUserStatusType.decline)}
            type={
              userSession?.status === sessionUserStatusType.decline
                ? 'solid'
                : 'outline'
            }
            iconRight={true}
            icon={
              <Icon
                name="ban"
                type="font-awesome"
                size={18}
                color={
                  userSession?.status === sessionUserStatusType.decline
                    ? colors.white
                    : colors.error
                }
              />
            }
            titleStyle={{
              color:
                userSession?.status === sessionUserStatusType.decline
                  ? colors.white
                  : colors.error,
            }}
            buttonStyle={{
              borderColor: colors.error,
              borderWidth: 2,
              backgroundColor:
                userSession?.status === sessionUserStatusType.decline
                  ? colors.error
                  : colors.white,
            }}
          />
          <Chip
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
      </LoadingWrapper>
    </View>
  );
};

import {StackActions, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {Chip, Icon} from 'react-native-elements';
import {API_ROUTES, colors, HTTP_TYPES, routes} from '../../constants';
import {useMutation} from '../../hooks/useMutate';
import {useAppDispatch, useAppSelector} from '../../hooks/useRedux';
import {
  Event,
  Session,
  sessionUserStatusType,
  sessionUserUpdate,
  UserSession,
} from '../../store/event';
import {LoadingType, LoadingWrapper} from '../LoadingWrapper';
import {styles} from './style';

export const SessionButtonSet = ({
  sessionId,
  eventId,
}: {
  sessionId: string;
  eventId: string;
}) => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const {user} = useAppSelector(store => store.user);
  const {data: event} = useAppSelector(store => store.events);
  const [userState, setUserState] = useState<sessionUserStatusType>(
    event
      .find((event: Event) => event._id === eventId)
      ?.sessions?.find((session: Session) => session._id === sessionId)
      ?.usersession?.find(
        (userSession: UserSession) => userSession.user === user?._id,
      )?.status || sessionUserStatusType.pending,
  );
  const {loading, mutate} = useMutation({
    url: API_ROUTES.EVENTS.UPDATE_USER_SESSION,
  });

  const navigateParticipantPage = () => {
    navigation.dispatch({
      ...StackActions.push(routes.participants, {id: sessionId}),
    });
  };

  useEffect(() => {
    setUserState(
      event
        .find((event: Event) => event._id === eventId)
        ?.sessions?.find((session: Session) => session._id === sessionId)
        ?.usersession?.find(
          (userSession: UserSession) => userSession.user === user?._id,
        )?.status || sessionUserStatusType.pending,
    );
  }, [event]);

  const updateState = async (newState: sessionUserStatusType) => {
    if (newState !== userState) {
      const res = await mutate(
        {
          eventId,
          sessionId,
          status: newState,
        },
        HTTP_TYPES.PUT,
      );
      if (res.success) {
        dispatch(
          sessionUserUpdate({
            eventId,
            sessionId,
            userSession: res.data.sessionUser,
          }),
        );
      }
    }
  };

  return (
    <LoadingWrapper type={LoadingType.PAGE_LOAD} loading={loading}>
      <View style={[styles.row, styles.buttonSet]}>
        <Chip
          title="Accept"
          onPress={() => updateState(sessionUserStatusType.accept)}
          type={
            userState === sessionUserStatusType.accept ? 'solid' : 'outline'
          }
          iconRight={true}
          icon={
            <Icon
              name="check"
              type="font-awesome"
              size={18}
              color={
                userState === sessionUserStatusType.accept
                  ? colors.white
                  : colors.success
              }
            />
          }
          titleStyle={{
            color:
              userState === sessionUserStatusType.accept
                ? colors.white
                : colors.success,
          }}
          buttonStyle={{
            borderColor: colors.success,
            borderWidth: 2,
            backgroundColor:
              userState === sessionUserStatusType.accept
                ? colors.success
                : colors.white,
          }}
        />
        <Chip
          title="Tentative"
          onPress={() => updateState(sessionUserStatusType.tentative)}
          type={
            userState === sessionUserStatusType.tentative ? 'solid' : 'outline'
          }
          iconRight={true}
          icon={
            <Icon
              name="question"
              type="font-awesome"
              size={18}
              color={
                userState === sessionUserStatusType.tentative
                  ? colors.white
                  : colors.primary_dark
              }
            />
          }
          titleStyle={{
            color:
              userState === sessionUserStatusType.tentative
                ? colors.white
                : colors.primary_dark,
          }}
          buttonStyle={{
            borderColor: colors.primary_dark,
            borderWidth: 2,
            backgroundColor:
              userState === sessionUserStatusType.tentative
                ? colors.primary_dark
                : colors.white,
          }}
        />
        <Chip
          title="Decline"
          onPress={() => updateState(sessionUserStatusType.decline)}
          type={
            userState === sessionUserStatusType.decline ? 'solid' : 'outline'
          }
          iconRight={true}
          icon={
            <Icon
              name="ban"
              type="font-awesome"
              size={18}
              color={
                userState === sessionUserStatusType.decline
                  ? colors.white
                  : colors.error
              }
            />
          }
          titleStyle={{
            color:
              userState === sessionUserStatusType.decline
                ? colors.white
                : colors.error,
          }}
          buttonStyle={{
            borderColor: colors.error,
            borderWidth: 2,
            backgroundColor:
              userState === sessionUserStatusType.decline
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
  );
};

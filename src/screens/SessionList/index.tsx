import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import {EventElement} from '../../components/EventElement';
import {LoadingWrapper} from '../../components/LoadingWrapper';
import {MyHeader} from '../../components/MyHeader';
import {ParticipantElement} from '../../components/ParticipantElement';
import {SessionListElement} from '../../components/SessionListElement';
import {routes} from '../../constants';
import {useAppDispatch, useAppSelector} from '../../hooks/useRedux';
import {Event, loadSponsors, Session, Sponsor} from '../../store/event';

export const SessionList = ({route}: any) => {
  const {id, isPast} = route.params;
  const {data: events, loading} = useAppSelector((store: any) =>
    isPast ? store.pastEvents : store.events,
  );
  const [event, setEvent] = useState<Event | undefined>(
    events.find((element: Event) => element._id === id),
  );
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   dispatch(loadSponsors({_id: id}));
  // }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <MyHeader title="Event Sessions" backenable={true} />
      <ScrollView>
        <LoadingWrapper loading={loading}>
          <View>
            {event && <EventElement data={event} isPast={isPast} />}
            {event &&
              event.sessions?.map((session: Session, index: number) => (
                <SessionListElement
                  key={index}
                  data={session}
                  index={index}
                  eventId={event._id}
                  isPast={isPast}
                />
              ))}
          </View>
        </LoadingWrapper>
      </ScrollView>
    </SafeAreaView>
  );
};

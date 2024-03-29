import React, {useState} from 'react';
import {ScrollView} from 'react-native';
import {EventMenuElement} from '../../components/EventMenuElement';
import {MyHeader} from '../../components/MyHeader';
import {routes} from '../../constants';
import {useAppSelector} from '../../hooks/useRedux';
import {Event} from '../../store/event';

export const EventMenu = ({route}: any) => {
  const {id, isPast} = route.params;
  const {data: events} = useAppSelector(store =>
    isPast ? store.pastEvents : store.events,
  );
  const [event, setEvent] = useState<Event | undefined>(
    events.find(element => element._id === id),
  );

  return (
    <ScrollView>
      <MyHeader title="Events" backenable={true} />

      <EventMenuElement
        key={1}
        id={id}
        title={event?.title}
        subTitle="Event Schedule"
        startTime={event?.startTime}
        endTime={event?.endTime}
        url={routes.sessionList}
        isPast={isPast}
      />
      <EventMenuElement
        key={2}
        id={id}
        title={event?.title}
        subTitle="Sponsors"
        startTime={event?.startTime}
        endTime={event?.endTime}
        url={routes.sponsorList}
        isPast={isPast}
      />
    </ScrollView>
  );
};

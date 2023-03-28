import * as React from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import {EventDetailsElement} from '../../components/EventDetailsElement';
import {MyHeader} from '../../components/MyHeader';

export const EventScheduleDetails = () => {
  return (
    <SafeAreaView>
      <MyHeader title="Event Schedule Details" />
      <ScrollView>{/* <EventDetailsElement /> */}</ScrollView>
    </SafeAreaView>
  );
};

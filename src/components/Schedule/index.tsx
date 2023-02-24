import * as React from 'react';
import {View} from 'react-native';
import {CalendarFilterButton} from '../CalendarFilterButton';
import {ScheduleElement} from '../ScheduleElement';

export const Schedule = () => {
  return (
    <View>
      <CalendarFilterButton />
      <ScheduleElement />
      <ScheduleElement />
      <ScheduleElement />
      <ScheduleElement />
      <ScheduleElement />
      <ScheduleElement />
      <ScheduleElement />
    </View>
  );
};

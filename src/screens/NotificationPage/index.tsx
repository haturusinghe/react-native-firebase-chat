import * as React from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import {MyHeader} from '../../components/MyHeader';
import {NotificationElement} from '../../components/NotificationElement';
import {ParticipantElement} from '../../components/ParticipantElement';

export const NotificationPage = () => {
  return (
    <SafeAreaView>
      <MyHeader title="Notifications" />
      <ScrollView>
        <NotificationElement />
        <NotificationElement />
        <NotificationElement />
        <NotificationElement />
        <NotificationElement />
        <NotificationElement />
      </ScrollView>
    </SafeAreaView>
  );
};

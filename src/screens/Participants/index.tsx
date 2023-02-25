import * as React from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import {MyHeader} from '../../components/MyHeader';
import {ParticipantElement} from '../../components/ParticipantElement';

export const Participants = () => {
  return (
    <SafeAreaView>
      <MyHeader title="Participants" />
      <ScrollView>
        <ParticipantElement />
        <ParticipantElement />
        <ParticipantElement />
        <ParticipantElement />
        <ParticipantElement />
        <ParticipantElement />
      </ScrollView>
    </SafeAreaView>
  );
};

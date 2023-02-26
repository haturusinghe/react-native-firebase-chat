import * as React from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import {MyHeader} from '../../components/MyHeader';
import {ParticipantElement} from '../../components/ParticipantElement';

export const Participants = () => {
  return (
    <SafeAreaView>
      <MyHeader title="Participants" />
      <ScrollView>
        <ParticipantElement
          title="Mr. Rabi Sighj"
          subTitle="President"
          text="Pacific Formwork Pvt Ltd"
          imageUrl="https://images.unsplash.com/photo-1490730141103-6cac27aaab94?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
        />
        <ParticipantElement
          title="Mr. Rabi Sighj"
          subTitle="President"
          text="Pacific Formwork Pvt Ltd"
          imageUrl="https://images.unsplash.com/photo-1490730141103-6cac27aaab94?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
        />
        <ParticipantElement
          title="Mr. Rabi Sighj"
          subTitle="President"
          text="Pacific Formwork Pvt Ltd"
          imageUrl="https://images.unsplash.com/photo-1490730141103-6cac27aaab94?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
        />
        <ParticipantElement
          title="Mr. Rabi Sighj"
          subTitle="President"
          text="Pacific Formwork Pvt Ltd"
          imageUrl="https://images.unsplash.com/photo-1490730141103-6cac27aaab94?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
        />
        <ParticipantElement
          title="Mr. Rabi Sighj"
          subTitle="President"
          text="Pacific Formwork Pvt Ltd"
          imageUrl="https://images.unsplash.com/photo-1490730141103-6cac27aaab94?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

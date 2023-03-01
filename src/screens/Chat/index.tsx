import {useRoute} from '@react-navigation/native';
import * as React from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import {ChatElement} from '../../components/ChatElement';
import {MyHeader} from '../../components/MyHeader';

export const Chat = () => {
  const route = useRoute<any>();
  return (
    <SafeAreaView>
      <MyHeader title={'Chat'} />
      <ScrollView>
        <ChatElement
          round={route?.params?.round}
          url={route?.params?.url}
          title="Mr. Rabi Sighj"
          subTitle="Hello how are you"
          text="04:34pm"
          imageUrl="https://images.unsplash.com/photo-1490730141103-6cac27aaab94?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
        />
        <ChatElement
          round={route?.params?.round}
          url={route?.params?.url}
          title="Mr. Rabi Sighj"
          subTitle="Thank you!!"
          text="12:30pm"
          imageUrl="https://images.unsplash.com/photo-1490730141103-6cac27aaab94?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
        />
        <ChatElement
          round={route?.params?.round}
          url={route?.params?.url}
          title="Mr. Rabi Sighj"
          subTitle="Thank you!!"
          text="12:30pm"
          imageUrl="https://images.unsplash.com/photo-1490730141103-6cac27aaab94?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
        />
        <ChatElement
          round={route?.params?.round}
          url={route?.params?.url}
          title="Mr. Rabi Sighj"
          subTitle="Thank you!!"
          text="12:30pm"
          imageUrl="https://images.unsplash.com/photo-1490730141103-6cac27aaab94?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
        />
        <ChatElement
          round={route?.params?.round}
          url={route?.params?.url}
          title="Mr. Rabi Sighj"
          subTitle="Thank you!!"
          text="12:30pm"
          imageUrl="https://images.unsplash.com/photo-1490730141103-6cac27aaab94?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
        />
        <ChatElement
          round={route?.params?.round}
          url={route?.params?.url}
          title="Mr. Rabi Sighj"
          subTitle="Thank you!!"
          text="12:30pm"
          imageUrl="https://images.unsplash.com/photo-1490730141103-6cac27aaab94?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
        />
        <ChatElement
          round={route?.params?.round}
          url={route?.params?.url}
          title="Mr. Rabi Sighj"
          subTitle="Thank you!!"
          text="12:30pm"
          imageUrl="https://images.unsplash.com/photo-1490730141103-6cac27aaab94?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

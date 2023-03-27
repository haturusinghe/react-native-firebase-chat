import React, {useEffect} from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import {LoadingType, LoadingWrapper} from '../../components/LoadingWrapper';
import {MyHeader} from '../../components/MyHeader';
import {ParticipantElement} from '../../components/ParticipantElement';
import {API_ROUTES} from '../../constants';
import {useQuery} from '../../hooks/useQuery';

export const Participants = ({route}: any) => {
  const {id: sessionId} = route.params;
  const {data, loading}: {data: any; loading: boolean} = useQuery({
    url: `${API_ROUTES.EVENTS.GET_PARTICIPANTS}/${sessionId}`,
  });

  return (
    <SafeAreaView style={{flex: 1}}>
      <MyHeader title="Participants" />
      <ScrollView style={{flex: 1}}>
        <LoadingWrapper loading={loading} type={LoadingType.PAGE_LOAD}>
          {data?.sessionUsers?.length > 0 &&
            data.sessionUsers.map((sessionUser: any) => (
              <ParticipantElement
                key={sessionUser._id}
                title={sessionUser?.user[0]?.name || ''}
                subTitle="President"
                text="Pacific Formwork Pvt Ltd"
                imageUrl="https://images.unsplash.com/photo-1490730141103-6cac27aaab94?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              />
            ))}
        </LoadingWrapper>
      </ScrollView>
    </SafeAreaView>
  );
};

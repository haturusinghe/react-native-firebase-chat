import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import {Text} from 'react-native-elements';
import {shallowEqual, useSelector} from 'react-redux';
import {LoadingWrapper} from '../../components/LoadingWrapper';
import {MyHeader} from '../../components/MyHeader';
import {ParticipantElement} from '../../components/ParticipantElement';
import {routes} from '../../constants';
import {useAppDispatch, useAppSelector} from '../../hooks/useRedux';
import {Event, loadSponsors, Sponsor} from '../../store/event';
import {store} from '../../store/store';

export const SponsorList = ({route}: any) => {
  const {id} = route.params;
  const {data, loading} = useAppSelector((store: any) => store.events);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadSponsors({_id: id}));
  }, []);

  return (
    <SafeAreaView>
      <MyHeader title="Sponsors" />
      <ScrollView>
        <LoadingWrapper loading={loading}>
          <View>
            {!loading &&
              data
                .find((element: Event) => element._id === id)
                ?.sponsors?.map((sponsor: Sponsor) => (
                  <ParticipantElement
                    key={sponsor._id}
                    title={sponsor.company.name}
                    subTitle={sponsor.status}
                    imageUrl={sponsor.company.image}
                    round={false}
                    url={routes.companyProfile}
                    params={sponsor.company}
                  />
                ))}
          </View>
        </LoadingWrapper>
      </ScrollView>
    </SafeAreaView>
  );
};

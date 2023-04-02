import React, {useEffect} from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import {LoadingWrapper} from '../../components/LoadingWrapper';
import {MyHeader} from '../../components/MyHeader';
import {ParticipantElement} from '../../components/ParticipantElement';
import {routes} from '../../constants';
import {useAppDispatch, useAppSelector} from '../../hooks/useRedux';
import {Event, loadSponsors, Sponsor} from '../../store/event';
import {loadPastSponsors} from '../../store/pastEvents';

export const SponsorList = ({route}: any) => {
  const {id, isPast} = route.params;
  const {data, loading} = useAppSelector((store: any) =>
    isPast ? store.pastEvents : store.events,
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(isPast ? loadPastSponsors({_id: id}) : loadSponsors({_id: id}));
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <MyHeader title="Sponsors" />
      <LoadingWrapper loading={loading}>
        <ScrollView>
          {!loading &&
            data
              ?.find((element: Event) => element._id === id)
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
        </ScrollView>
      </LoadingWrapper>
    </SafeAreaView>
  );
};

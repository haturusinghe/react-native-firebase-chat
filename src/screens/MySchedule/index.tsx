import React, {useEffect} from 'react';
import {RefreshControl, SafeAreaView, ScrollView} from 'react-native';
import {Text} from 'react-native-elements';
import {CalendarFilterButton} from '../../components/CalendarFilterButton';
import {EmptyListWrapper} from '../../components/EmptyListWrapper';
import {EventDetailsElement} from '../../components/EventDetailsElement';
import {LoadingWrapper} from '../../components/LoadingWrapper';
import {MyHeader} from '../../components/MyHeader';
import {API_ROUTES} from '../../constants';
import {useMutation} from '../../hooks/useMutate';
import {useAppDispatch, useAppSelector} from '../../hooks/useRedux';
import {Session} from '../../store/event';
import {fetchSchedule, reloadSchedule} from '../../store/mySchedule';

export const MySchedule = () => {
  const dispatch = useAppDispatch();
  const {
    data: sessions,
    loading,
    startTime,
    endTime,
  } = useAppSelector(store => store.mySessions);

  useEffect(() => {
    dispatch(fetchSchedule());
  }, []);

  function handlePagination(event: any) {
    const offsetY = event.nativeEvent.contentOffset.y;
    const contentHeight = event.nativeEvent.contentSize.height;
    const layoutHeight = event.nativeEvent.layoutMeasurement.height;
    if (offsetY + layoutHeight >= contentHeight) {
      dispatch(fetchSchedule());
    }
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <MyHeader title="My Schedule" backenable={true} />
      <LoadingWrapper loading={loading}>
        <>
          <CalendarFilterButton
            reload={(fromDate: Date, toDate: Date) => {
              dispatch(reloadSchedule({startTime: fromDate, endTime: toDate}));
            }}
          />
          <EmptyListWrapper loading={loading} list={sessions}>
            <ScrollView
              pagingEnabled={true}
              onScrollEndDrag={handlePagination}
              refreshControl={
                <RefreshControl
                  onRefresh={() => {
                    dispatch(
                      reloadSchedule({
                        startTime: startTime ? new Date(startTime) : undefined,
                        endTime: endTime ? new Date(endTime) : undefined,
                      }),
                    );
                  }}
                  refreshing={loading}
                  colors={['#9Bd35A', '#689F38']}
                  progressBackgroundColor="#fff"
                />
              }>
              {sessions?.map((session: Session) => (
                <EventDetailsElement key={session._id} session={session} />
              ))}
            </ScrollView>
          </EmptyListWrapper>
        </>
      </LoadingWrapper>
    </SafeAreaView>
  );
};

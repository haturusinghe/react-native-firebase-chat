import React from 'react';
import {RefreshControl, ScrollView, View} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../hooks/useRedux';
import {Event, fetchEvents, reloadEvents} from '../../store/event';
import {CalendarFilterButton} from '../CalendarFilterButton';
import {EventElement} from '../EventElement';
import {LoadingType, LoadingWrapper} from '../LoadingWrapper';

export const UpcommingEvents = () => {
  const {
    loading,
    data: events,
    currentPage,
  } = useAppSelector(store => store.events);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(fetchEvents());
  }, []);

  function handlePagination(event: any) {
    const offsetY = event.nativeEvent.contentOffset.y;
    const contentHeight = event.nativeEvent.contentSize.height;
    const layoutHeight = event.nativeEvent.layoutMeasurement.height;
    if (offsetY + layoutHeight >= contentHeight) {
      dispatch(fetchEvents());
    }
  }

  return (
    <LoadingWrapper loading={loading} type={LoadingType.PAGINATION_LOAD}>
      <ScrollView
        pagingEnabled={true}
        onScrollEndDrag={handlePagination}
        refreshControl={
          <RefreshControl
            onRefresh={() => {
              dispatch(
                reloadEvents({startTime: undefined, endTime: undefined}),
              );
            }}
            refreshing={loading}
            colors={['#9Bd35A', '#689F38']}
            progressBackgroundColor="#fff"
          />
        }>
        <CalendarFilterButton />
        {events?.map((event: Event) => (
          <EventElement key={event._id} data={event} />
        ))}
      </ScrollView>
    </LoadingWrapper>
  );
};

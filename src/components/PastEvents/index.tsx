import React, {useState} from 'react';
import {RefreshControl, ScrollView, View} from 'react-native';
import {Button} from 'react-native-elements';
import {colors} from '../../constants';
import {useAppDispatch, useAppSelector} from '../../hooks/useRedux';
import {Event, reloadEvents} from '../../store/event';
import {fetchPastEvents, reloadPastEvents} from '../../store/pastEvents';
import {EmptyListWrapper} from '../EmptyListWrapper';
import {EventElement} from '../EventElement';
import {InputField} from '../InputField';
import {LoadingType, LoadingWrapper} from '../LoadingWrapper';
import {styles} from './style';

export const PastEvents = () => {
  const {
    loading,
    data: events,
    currentPage,
  } = useAppSelector(store => store.pastEvents);
  const [searchTerm, setSearchTerm] = useState('');
  const [searched, setSearched] = useState(false);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(fetchPastEvents());
  }, []);

  function handlePagination(event: any) {
    const offsetY = event.nativeEvent.contentOffset.y;
    const contentHeight = event.nativeEvent.contentSize.height;
    const layoutHeight = event.nativeEvent.layoutMeasurement.height;
    if (offsetY + layoutHeight >= contentHeight) {
      dispatch(fetchPastEvents());
    }
  }

  return (
    <>
      <View style={styles.searchBar}>
        <InputField
          onChangeText={(e: any) => {
            setSearchTerm(e);
          }}
          autoCapitalize="none"
          rightIcon={() => (
            <Button
              icon={
                !searched
                  ? {
                      type: 'ionicon',
                      name: 'search',
                      color: colors.grey,
                    }
                  : {
                      type: 'ionicon',
                      name: 'close',
                      color: colors.grey,
                    }
              }
              type={'clear'}
              onPress={() => {
                if (!searched) {
                  dispatch(reloadPastEvents(searchTerm));
                } else {
                  dispatch(reloadPastEvents(''));
                  setSearchTerm('');
                }
                setSearched(!searched);
              }}>
              {/* <Icon name="save" color="white" /> */}
            </Button>
          )}
          placeholder="Search"
          value={searchTerm}
        />
      </View>
      <LoadingWrapper loading={loading} type={LoadingType.PAGINATION_LOAD}>
        <EmptyListWrapper loading={loading} list={events}>
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
            {/* <CalendarFilterButton /> */}
            {events?.map((event: Event) => (
              <EventElement key={event._id} data={event} isPast={true} />
            ))}
          </ScrollView>
        </EmptyListWrapper>
      </LoadingWrapper>
    </>
  );
};

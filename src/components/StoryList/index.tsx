import React from 'react';
import {RefreshControl, ScrollView} from 'react-native';
import {routes} from '../../constants';
import {useAppDispatch, useAppSelector} from '../../hooks/useRedux';
import {fetchStory, reloadStory, Story} from '../../store/story';
import {CalendarFilterButton} from '../CalendarFilterButton';
import {FeedElement} from '../FeedElement';
import {LoadingType, LoadingWrapper} from '../LoadingWrapper';

export const StoryList = () => {
  const {
    loading,
    data: stories,
    currentPage,
  } = useAppSelector(store => store.stories);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(fetchStory());
  }, []);

  function handlePagination(event: any) {
    const offsetY = event.nativeEvent.contentOffset.y;
    const contentHeight = event.nativeEvent.contentSize.height;
    const layoutHeight = event.nativeEvent.layoutMeasurement.height;
    if (offsetY + layoutHeight >= contentHeight) {
      dispatch(fetchStory());
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
              dispatch(reloadStory({startTime: undefined, endTime: undefined}));
            }}
            refreshing={loading}
            colors={['#9Bd35A', '#689F38']}
            progressBackgroundColor="#fff"
          />
        }>
        <CalendarFilterButton />
        {stories?.map((story: Story) => (
          <FeedElement
            key={story._id}
            id={story._id}
            url={routes.storyDetails}
            title={story.storyTitle}
            date={story.createdAt}
          />
        ))}
      </ScrollView>
    </LoadingWrapper>
  );
};

import AnimatedLottieView from 'lottie-react-native';
import * as React from 'react';
import {RefreshControl, ScrollView, View} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../hooks/useRedux';
import {fetchNews, News, reloadNews} from '../../store/news';
import {FeedElement} from '../FeedElement';
import {LoadingType, LoadingWrapper} from '../LoadingWrapper';

export const NewsFeed = () => {
  const {
    loading,
    data: news,
    currentPage,
  } = useAppSelector(store => store.news);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    console.log('reaching herererere', loading, news, currentPage);
    dispatch(fetchNews());
    console.log('after');
  }, []);

  function handlePagination(event: any) {
    const offsetY = event.nativeEvent.contentOffset.y;
    const contentHeight = event.nativeEvent.contentSize.height;
    const layoutHeight = event.nativeEvent.layoutMeasurement.height;
    console.log('handling pagination');

    if (offsetY + layoutHeight >= contentHeight) {
      dispatch(fetchNews());
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
              dispatch(reloadNews(''));
            }}
            refreshing={loading}
            colors={['#9Bd35A', '#689F38']}
            progressBackgroundColor="#fff"
          />
        }>
        {news.map((news: News) => (
          <FeedElement
            key={news._id}
            title={news.title}
            date={news.createdAt}
          />
        ))}
      </ScrollView>
    </LoadingWrapper>
  );
};

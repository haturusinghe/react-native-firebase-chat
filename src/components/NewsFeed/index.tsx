import * as React from 'react';
import {RefreshControl, ScrollView} from 'react-native';
import {routes} from '../../constants';
import {useAppDispatch, useAppSelector} from '../../hooks/useRedux';
import {fetchNews, News, reloadNews} from '../../store/news';
import {EmptyListWrapper} from '../EmptyListWrapper';
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
    dispatch(fetchNews());
  }, []);

  function handlePagination(event: any) {
    const offsetY = event.nativeEvent.contentOffset.y;
    const contentHeight = event.nativeEvent.contentSize.height;
    const layoutHeight = event.nativeEvent.layoutMeasurement.height;
    if (offsetY + layoutHeight >= contentHeight) {
      dispatch(fetchNews());
    }
  }

  return (
    <LoadingWrapper loading={loading} type={LoadingType.PAGINATION_LOAD}>
      <EmptyListWrapper list={news} loading={loading}>
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
          {news?.map((news: News) => (
            <FeedElement
              key={news._id}
              id={news._id}
              title={news.title}
              date={news.createdAt}
              url={routes.newsDetails}
            />
          ))}
        </ScrollView>
      </EmptyListWrapper>
    </LoadingWrapper>
  );
};

import React, {useState} from 'react';
import {RefreshControl, ScrollView, View} from 'react-native';
import {Button} from 'react-native-elements';
import {colors, routes} from '../../constants';
import {useAppDispatch, useAppSelector} from '../../hooks/useRedux';
import {fetchStory, reloadStory, Story} from '../../store/story';
import {EmptyListWrapper} from '../EmptyListWrapper';
import {FeedElement} from '../FeedElement';
import {InputField} from '../InputField';
import {LoadingType, LoadingWrapper} from '../LoadingWrapper';
import {styles} from './style';

export const StoryList = () => {
  const {
    loading,
    data: stories,
    currentPage,
  } = useAppSelector(store => store.stories);
  const [searchTerm, setSearchTerm] = useState('');
  const [searched, setSearched] = useState(false);
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
    <View style={{flex: 1}}>
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
                  dispatch(reloadStory(searchTerm));
                } else {
                  dispatch(reloadStory(''));
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
        <EmptyListWrapper list={stories} loading={loading}>
          <ScrollView
            contentContainerStyle={{flex: 1}}
            pagingEnabled={true}
            onScrollEndDrag={handlePagination}
            refreshControl={
              <RefreshControl
                onRefresh={() => {
                  dispatch(reloadStory(''));
                }}
                refreshing={loading}
                colors={['#9Bd35A', '#689F38']}
                progressBackgroundColor="#fff"
              />
            }>
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
        </EmptyListWrapper>
      </LoadingWrapper>
    </View>
  );
};

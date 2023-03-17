import moment from 'moment';
import React, {useState} from 'react';
import {ScrollView, View} from 'react-native';
import {Text} from 'react-native-elements';
import {MyHeader} from '../../components/MyHeader';
import {useAppSelector} from '../../hooks/useRedux';
import {Story} from '../../store/story';
import {styles} from './style';

export const StoryDetails = ({route}: any) => {
  const {id} = route.params;
  const {data: stories} = useAppSelector(store => store.stories);
  const [story, setStory] = useState<Story | null>(
    stories.find(element => element._id === id) || null,
  );

  return (
    <ScrollView>
      <MyHeader title="Story" backenable={true} />

      <View style={styles.card}>
        <Text style={styles.title}>{story?.storyTitle || ''}</Text>
        <Text style={styles.date}>
          {moment(story?.createdAt).format('MMMM DD, YYYY')}
        </Text>
        <Text style={styles.subText}>{story?.storyDescription || ''}</Text>
      </View>
    </ScrollView>
  );
};

import * as React from 'react';
import {ScrollView, View} from 'react-native';
import {FeedElement} from '../FeedElement';

export const NewsFeed = () => {
  return (
    <View>
      <FeedElement
        title="Admin shall be able to post news in the system’s news feed. This will be the landing page, when
a user login to the app. All the general news will come under"
        date={new Date().toString()}
      />
      <FeedElement
        title="Admin shall be able to post news in the system’s news feed. This will be the landing page, when
a user login to the app. All the general news will come under"
        date={new Date().toString()}
      />
      <FeedElement
        title="Admin shall be able to post news in the system’s news feed. This will be the landing page, when
a user login to the app. All the general news will come under"
        date={new Date().toString()}
      />
      <FeedElement
        title="Admin shall be able to post news in the system’s news feed. This will be the landing page, when
a user login to the app. All the general news will come under"
        date={new Date().toString()}
      />
      <FeedElement
        title="Admin shall be able to post news in the system’s news feed. This will be the landing page, when
a user login to the app. All the general news will come under"
        date={new Date().toString()}
      />
      <FeedElement
        title="Admin shall be able to post news in the system’s news feed. This will be the landing page, when
a user login to the app. All the general news will come under"
        date={new Date().toString()}
      />
    </View>
  );
};

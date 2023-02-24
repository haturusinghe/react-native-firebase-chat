import * as React from 'react';
import {SafeAreaView, ScrollView, StatusBar, View} from 'react-native';
import {Header, Tab, TabView, Text} from 'react-native-elements';
import {MyHeader} from '../../components/MyHeader';
import {NewsFeed} from '../../components/NewsFeed';
import {colors} from '../../constants';
import {styles} from './style';

export const HomeScreen = () => {
  const [index, setIndex] = React.useState<number>(0);
  return (
    <SafeAreaView>
      <MyHeader title="Home" />
      <Tab value={index} onChange={setIndex} indicatorStyle={styles.tabBorder}>
        <Tab.Item
          title="Newsfeed"
          containerStyle={styles.tabContainer}
          titleStyle={styles.tabTitle}
        />
        <Tab.Item
          title="Convention Updates"
          containerStyle={styles.tabContainer}
          titleStyle={styles.tabTitle}
        />
      </Tab>
      <ScrollView>{index === 0 ? <NewsFeed /> : <NewsFeed />}</ScrollView>
    </SafeAreaView>
  );
};
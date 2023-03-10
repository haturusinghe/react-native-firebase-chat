import * as React from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import {Tab} from 'react-native-elements';
import {MyHeader} from '../../components/MyHeader';
import {NewsFeed} from '../../components/NewsFeed';
import {LoadingWrapper} from '../../components/LoadingWrapper';
import {styles} from './style';

export const HomeScreen = () => {
  const [index, setIndex] = React.useState<number>(0);
  return (
    <SafeAreaView style={styles.flex}>
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
      <LoadingWrapper loading={true}>
        <ScrollView>{index === 0 ? <NewsFeed /> : <NewsFeed />}</ScrollView>
      </LoadingWrapper>
    </SafeAreaView>
  );
};

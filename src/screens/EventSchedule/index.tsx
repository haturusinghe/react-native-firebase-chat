import * as React from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import {Tab} from 'react-native-elements';
import {MyHeader} from '../../components/MyHeader';
import {PastEvents} from '../../components/PastEvents';
import {StoryList} from '../../components/StoryList';
import {UpcommingEvents} from '../../components/UpcommingEvents';
import {styles} from './style';

export const EventSchedule = () => {
  const [index, setIndex] = React.useState<number>(0);
  return (
    <SafeAreaView style={{flex: 1}}>
      <MyHeader title="Events" />
      <Tab value={index} onChange={setIndex} indicatorStyle={styles.tabBorder}>
        <Tab.Item
          title="All Stories"
          containerStyle={styles.tabContainer}
          titleStyle={styles.tabTitle}
        />
        <Tab.Item
          title="Upcoming Events"
          containerStyle={styles.tabContainer}
          titleStyle={styles.tabTitle}
        />
        <Tab.Item
          title="Past Events"
          containerStyle={styles.tabContainer}
          titleStyle={styles.tabTitle}
        />
      </Tab>
      <View style={{flex: 1}}>
        {index === 0 ? (
          <StoryList />
        ) : index === 1 ? (
          <UpcommingEvents />
        ) : (
          <PastEvents />
        )}
      </View>
    </SafeAreaView>
  );
};

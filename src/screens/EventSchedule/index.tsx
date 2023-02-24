import * as React from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import {Tab} from 'react-native-elements';
import {MyHeader} from '../../components/MyHeader';
import {Schedule} from '../../components/Schedule';
import {styles} from './style';

export const EventSchedule = () => {
  const [index, setIndex] = React.useState<number>(0);
  return (
    <SafeAreaView>
      <MyHeader title="Event Schedule" />
      <Tab value={index} onChange={setIndex} indicatorStyle={styles.tabBorder}>
        <Tab.Item
          title="All Sessions"
          containerStyle={styles.tabContainer}
          titleStyle={styles.tabTitle}
        />
        <Tab.Item
          title="My Schedules"
          containerStyle={styles.tabContainer}
          titleStyle={styles.tabTitle}
        />
      </Tab>
      <ScrollView>{index === 0 ? <Schedule /> : <Schedule />}</ScrollView>
    </SafeAreaView>
  );
};

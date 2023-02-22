import * as React from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import {Header, Tab, TabView, Text} from 'react-native-elements';
import {NewsFeed} from '../../components/NewsFeed';

export const HomeScreen = () => {
  const [index, setIndex] = React.useState<number>(0);
  return (
    <SafeAreaView>
      <Header
        leftComponent={{
          icon: 'menu',
          color: '#fff',
          iconStyle: {color: '#fff'},
        }}
        centerComponent={{text: 'MY TITLE', style: {color: '#fff'}}}
        rightComponent={{icon: 'home', color: '#fff'}}
      />
      <Tab
        value={index}
        onChange={setIndex}
        indicatorStyle={{backgroundColor: 'green'}}
        style={{backgroundColor: 'red'}}>
        <Tab.Item title="Newsfeed" style={{backgroundColor: 'red'}} />
        <Tab.Item title="COnvention Updates" />
      </Tab>
      <ScrollView>{index === 0 ? <NewsFeed /> : <NewsFeed />}</ScrollView>
    </SafeAreaView>
  );
};

import moment from 'moment';
import React, {useState} from 'react';
import {ScrollView, useWindowDimensions, View} from 'react-native';
import {Image, Text} from 'react-native-elements';
import {MyHeader} from '../../components/MyHeader';
import {withAuth} from '../../hoc/withAuth';
import {useAppSelector} from '../../hooks/useRedux';
import {News} from '../../store/news';
import {styles} from './style';

const NewsDetails = ({route}: any) => {
  const {id} = route.params;
  const {data: news} = useAppSelector(store => store.news);
  const [newsdata, setNewsdata] = useState<News | null>(
    news.find(element => element._id === id) || null,
  );

  return (
    <ScrollView>
      <MyHeader title="News Details" backenable={true} />
      {newsdata?.image && (
        <Image
          source={{
            uri: newsdata.image,
          }}
          style={[styles.image, {width: useWindowDimensions().width - 20}]}
        />
      )}
      <View style={styles.card}>
        <Text style={styles.title}>{newsdata?.title || ''}</Text>
        <Text style={styles.date}>
          {moment(new Date()).format('MMMM DD, YYYY')}
        </Text>
        <Text style={styles.subText}>{newsdata?.description || ''}</Text>
      </View>
    </ScrollView>
  );
};

export default withAuth(NewsDetails);

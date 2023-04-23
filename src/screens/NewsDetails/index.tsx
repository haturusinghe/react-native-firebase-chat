import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {ScrollView, useWindowDimensions, View} from 'react-native';
import {Image, Text} from 'react-native-elements';
import {LoadingType, LoadingWrapper} from '../../components/LoadingWrapper';
import {MyHeader} from '../../components/MyHeader';
import {API_ROUTES, HTTP_TYPES} from '../../constants';
import {withAuth} from '../../hoc/withAuth';
import {useMutation} from '../../hooks/useMutate';
import {useAppSelector} from '../../hooks/useRedux';
import {News} from '../../store/news';
import {styles} from './style';

const NewsDetails = ({route}: any) => {
  const {id, isFromNotification = false} = route.params;
  const {data: news} = useAppSelector(store => store.news);
  const [newsdata, setNewsdata] = useState<News | null>(
    news?.find(element => element._id === id) || null,
  );

  const {loading, mutate} = useMutation({
    url: API_ROUTES.NEWS.GET_BY_ID,
  });

  useEffect(() => {
    if (isFromNotification) {
      loadData();
    }
  }, []);

  const loadData = async () => {
    const res = await mutate(
      {},
      HTTP_TYPES.GET,
      {},
      API_ROUTES.NEWS.GET_BY_ID.replace(':id', id),
    );
    setNewsdata(res.data.data);
  };

  return (
    <View>
      <MyHeader title="News Details" backenable={true} />
      <ScrollView>
        <LoadingWrapper loading={loading} type={LoadingType.PAGE_LOAD}>
          <>
            {!!newsdata?.image && (
              <Image
                source={{
                  uri: newsdata.image,
                }}
                style={[
                  styles.image,
                  {width: useWindowDimensions().width - 20},
                ]}
              />
            )}
            <View style={styles.card}>
              <Text style={styles.title}>{newsdata?.title || ''}</Text>
              <Text style={styles.date}>
                {moment(newsdata?.createdAt).format('MMMM DD, YYYY')}
              </Text>
              <Text style={styles.subText}>{newsdata?.description || ''}</Text>
            </View>
          </>
        </LoadingWrapper>
      </ScrollView>
    </View>
  );
};

export default withAuth(NewsDetails);

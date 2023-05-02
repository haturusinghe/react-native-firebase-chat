import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {Image, ScrollView, useWindowDimensions, View} from 'react-native';
import {Text} from 'react-native-elements';
import {LoadingType, LoadingWrapper} from '../../components/LoadingWrapper';
import {MyHeader} from '../../components/MyHeader';
import {API_ROUTES, HTTP_TYPES} from '../../constants';
import {withAuth} from '../../hoc/withAuth';
import {useMutation} from '../../hooks/useMutate';
import {useAppSelector} from '../../hooks/useRedux';
import {News} from '../../store/news';
import {styles} from './style';

const NewsDetails = ({route}: any) => {
  const {id, isFromNotification = false, notificationId} = route.params;
  const {data: news} = useAppSelector(store => store.news);
  const navigation = useNavigation();
  const [imageUrl, setImageUrl] = useState(
    {uri: news?.find(element => element._id === id)?.image} || undefined,
  );
  const [newsdata, setNewsdata] = useState<News | null>(
    news?.find(element => element._id === id) || null,
  );

  const {loading, mutate} = useMutation({
    url: API_ROUTES.NEWS.GET_BY_ID,
  });

  const {mutate: updateNotificationState} = useMutation({
    url: API_ROUTES.NOTIFICATION.UPDATE_NOTIFICATION_STATE,
  });

  useEffect(() => {
    if (isFromNotification) {
      loadData();
      if (notificationId) {
        updateNotificationState(
          {
            notificationId,
            viewed: true,
          },
          HTTP_TYPES.PUT,
        );
      }
    }
  }, []);

  const loadData = async () => {
    const res = await mutate(
      {},
      HTTP_TYPES.GET,
      {},
      API_ROUTES.NEWS.GET_BY_ID.replace(':id', id),
    );
    if (res.success) {
      setNewsdata({
        _id: id,
        title: res.data.data.title,
        description: res.data.data.description,
        attachments: res.data.data.attachments,
        creator: res.data.data.creator,
        createdAt: res.data.data.createdAt,
      });
      setImageUrl({uri: res.data.data.image});
    } else {
      console.log('Something went wrong');
      if (navigation.canGoBack()) {
        navigation.goBack();
      }
    }
  };

  return (
    <View>
      <MyHeader title="News Details" backenable={true} />
      <ScrollView>
        <LoadingWrapper loading={loading} type={LoadingType.PAGE_LOAD}>
          <>
            {imageUrl && imageUrl.uri && (
              <Image
                source={imageUrl}
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

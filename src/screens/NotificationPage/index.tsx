import * as React from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import {LoadingWrapper} from '../../components/LoadingWrapper';
import {MyHeader} from '../../components/MyHeader';
import {NotificationElement} from '../../components/NotificationElement';
import {API_ROUTES} from '../../constants';
import {useQuery} from '../../hooks/useQuery';

export const NotificationPage = () => {
  const {data, loading}: {data: any; loading: boolean} = useQuery({
    url: `${API_ROUTES.NOTIFICATION.GET_MINE}`,
  });

  return (
    <SafeAreaView>
      <MyHeader title="Notifications" />
      <ScrollView>
        <LoadingWrapper loading={loading}>
          {!loading &&
            data?.map((notification: any) => (
              <NotificationElement
                key={notification._id}
                notification={notification}
              />
            ))}
        </LoadingWrapper>
      </ScrollView>
    </SafeAreaView>
  );
};

import {useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {RefreshControl, SafeAreaView, ScrollView} from 'react-native';
import {Tab} from 'react-native-elements';
import {EmptyListWrapper} from '../../components/EmptyListWrapper';
import {LoadingType, LoadingWrapper} from '../../components/LoadingWrapper';
import {MyHeader} from '../../components/MyHeader';
import {ParticipantElement} from '../../components/ParticipantElement';
import {API_ROUTES, HTTP_TYPES, PAGE_SIZE, routes} from '../../constants';
import {useMutation} from '../../hooks/useMutate';
import {ICompany} from '../../models';
import {styles} from './styles';

export const MemberList = () => {
  const route = useRoute<any>();
  const [currentPage, setCurrentPage] = useState(0);
  const [index, setIndex] = React.useState<number>(0);
  const [data, setData] = useState<ICompany[]>([]);

  const {loading, mutate} = useMutation({url: ''});

  const loadData = async (page?: number) => {
    const url = `${API_ROUTES.MEMBERS.GET_MEMBERS}?isCurrent=${
      index === 0 ? 1 : 0
    }&page=${page || currentPage + 1}&pageSize=${PAGE_SIZE}`;
    const res = await mutate({}, HTTP_TYPES.GET, {}, url);
    if (res.success) {
      console.log(res.data);
      setData(res.data.data);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  function handlePagination(event: any) {
    const offsetY = event.nativeEvent.contentOffset.y;
    const contentHeight = event.nativeEvent.contentSize.height;
    const layoutHeight = event.nativeEvent.layoutMeasurement.height;
    if (offsetY + layoutHeight >= contentHeight) {
      setCurrentPage(currentPage + 1);
      loadData(currentPage + 1);
    }
  }

  useEffect(() => {
    setData([]);
    setCurrentPage(0);
    loadData(1);
  }, [index]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <MyHeader title={route?.params?.title || 'title'} />
      <Tab value={index} onChange={setIndex} indicatorStyle={styles.tabBorder}>
        <Tab.Item
          title="Current"
          containerStyle={styles.tabContainer}
          titleStyle={styles.tabTitle}
        />

        <Tab.Item
          title="Past"
          containerStyle={styles.tabContainer}
          titleStyle={styles.tabTitle}
        />
      </Tab>
      <LoadingWrapper loading={loading} type={LoadingType.PAGINATION_LOAD}>
        <EmptyListWrapper loading={loading} list={data}>
          <ScrollView
            pagingEnabled={true}
            onScrollEndDrag={handlePagination}
            refreshControl={
              <RefreshControl
                onRefresh={() => {
                  setCurrentPage(0);
                  loadData(1);
                }}
                refreshing={loading}
                colors={['#9Bd35A', '#689F38']}
                progressBackgroundColor="#fff"
              />
            }>
            {data.map((member: ICompany) => (
              <ParticipantElement
                key={member._id}
                round={route?.params?.round}
                url={routes.memberProfile}
                title={member.name}
                imageUrl={member.image}
                params={{memberProfile: member, title: 'Member Profile'}}
              />
            ))}
          </ScrollView>
        </EmptyListWrapper>
      </LoadingWrapper>
    </SafeAreaView>
  );
};

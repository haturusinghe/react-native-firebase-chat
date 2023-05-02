import {useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {RefreshControl, SafeAreaView, ScrollView} from 'react-native';
import {Tab, Text} from 'react-native-elements';
import {EmptyListWrapper} from '../../components/EmptyListWrapper';
import {LoadingType, LoadingWrapper} from '../../components/LoadingWrapper';
import {MyHeader} from '../../components/MyHeader';
import {ParticipantElement} from '../../components/ParticipantElement';
import {SearchBar} from '../../components/SearchBar';
import {API_ROUTES, HTTP_TYPES, PAGE_SIZE, routes} from '../../constants';
import {useMutation} from '../../hooks/useMutate';
import {IOfficeBearer} from '../../models';
import {styles} from './styles';

export const OfficeBearerList = () => {
  const route = useRoute<any>();
  const [currentPage, setCurrentPage] = useState(0);
  const [index, setIndex] = React.useState<number>(0);
  const [data, setData] = useState<IOfficeBearer[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const {loading, mutate} = useMutation({url: ''});

  const loadData = async (page?: number, searchKey?: string) => {
    const url = `${API_ROUTES.OFFICE_BEARER.GET_ALL}?isCurrent=${
      index === 0 ? 1 : 0
    }&page=${page || currentPage + 1}&pageSize=${PAGE_SIZE}&searchTerm=${
      searchKey !== undefined ? searchKey : searchTerm
    }`;
    const res = await mutate({}, HTTP_TYPES.GET, {}, url);
    if (res.success) {
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
    setSearchTerm('');
    loadData(1, '');
  }, [index]);

  const search = (searchKey: string) => {
    setSearchTerm(searchKey);
    loadData(1, searchKey);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <MyHeader title={route?.params?.title} backenable={true} />
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
      <SearchBar
        onPress={(searchKey: string) => {
          search(searchKey);
        }}
        value={searchTerm}
      />
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
            {data.map((member: IOfficeBearer) => (
              <>
                <Text style={styles.title}>{member.name}</Text>
                <ParticipantElement
                  round={false}
                  url={routes.profile}
                  title={member.president?.name}
                  subTitle="President"
                  imageUrl={
                    member.president?.imageUrl ||
                    'https://source.unsplash.com/random/?dog'
                  }
                  params={{user: member, title: 'Profile'}}
                />
                <ParticipantElement
                  round={false}
                  url={routes.profile}
                  title={member.president?.name}
                  subTitle="President"
                  imageUrl={
                    member.president?.imageUrl ||
                    'https://source.unsplash.com/random/?dog'
                  }
                  params={{user: member, title: 'Profile'}}
                />
                <ParticipantElement
                  round={false}
                  url={routes.profile}
                  title={member.secondVPrisident?.name}
                  subTitle="Second Vise President"
                  imageUrl={
                    member.president?.imageUrl ||
                    'https://source.unsplash.com/random/?dog'
                  }
                  params={{user: member, title: 'Profile'}}
                />
                <ParticipantElement
                  round={false}
                  url={routes.profile}
                  title={member.secondVPrisident?.name}
                  subTitle="President"
                  imageUrl={
                    member.president?.imageUrl ||
                    'https://source.unsplash.com/random/?dog'
                  }
                  params={{user: member, title: 'Profile'}}
                />
              </>
            ))}
          </ScrollView>
        </EmptyListWrapper>
      </LoadingWrapper>
    </SafeAreaView>
  );
};

import {useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {RefreshControl, SafeAreaView, ScrollView} from 'react-native';
import {Tab} from 'react-native-elements';
import {CompanyDetails} from '../../components/CompanyDetails';
import {EmptyListWrapper} from '../../components/EmptyListWrapper';
import {MyHeader} from '../../components/MyHeader';
import {ParticipantElement} from '../../components/ParticipantElement';
import {routes} from '../../constants';
import {ICompany} from '../../models';
import {styles} from './styles';

export const MemberProfile = () => {
  const route = useRoute<any>();
  const [index, setIndex] = React.useState<number>(0);
  const [data, setData] = useState<ICompany>(route.params.memberProfile);

  return (
    <SafeAreaView style={{flex: 1}}>
      <MyHeader title={route?.params?.title || 'title'} />
      <Tab value={index} onChange={setIndex} indicatorStyle={styles.tabBorder}>
        <Tab.Item
          title="About"
          containerStyle={styles.tabContainer}
          titleStyle={styles.tabTitle}
        />

        <Tab.Item
          title="Associates"
          containerStyle={styles.tabContainer}
          titleStyle={styles.tabTitle}
        />
      </Tab>
      {index === 0 ? (
        <CompanyDetails company={data} />
      ) : (
        <EmptyListWrapper loading={false} list={data.associates}>
          <ScrollView>
            {data.associates?.map((company: ICompany) => (
              <ParticipantElement
                key={company._id}
                round={route?.params?.round}
                url={routes.campanyProfileRepresentives}
                title={company.name}
                imageUrl={company.image}
                params={{company}}
              />
            ))}
          </ScrollView>
        </EmptyListWrapper>
      )}
    </SafeAreaView>
  );
};

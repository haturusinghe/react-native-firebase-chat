import {useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {RefreshControl, SafeAreaView, ScrollView, View} from 'react-native';
import {Image, Tab, Text} from 'react-native-elements';
import {CompanyDetails} from '../../components/CompanyDetails';
import {EmptyListWrapper} from '../../components/EmptyListWrapper';
import {MyHeader} from '../../components/MyHeader';
import {ParticipantElement} from '../../components/ParticipantElement';
import {routes} from '../../constants';
import {ICompany} from '../../models';
import {User} from '../../store/user';
import {styles} from './styles';

export const ComapanyProfileRepresentives = () => {
  const route = useRoute<any>();
  const [index, setIndex] = React.useState<number>(0);
  const [data, setData] = useState<ICompany>(route.params.company);
  console.log(data.representives);

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
          title="Representatives"
          containerStyle={styles.tabContainer}
          titleStyle={styles.tabTitle}
        />
      </Tab>
      {index === 0 ? (
        <CompanyDetails company={data} />
      ) : (
        <EmptyListWrapper loading={false} list={data.representives}>
          <ScrollView>
            <View style={styles.marginVertical}>
              <View style={styles.centerContent}>
                {data.image && (
                  <Image
                    source={{
                      uri: data.image,
                    }}
                    style={styles.image}
                  />
                )}
              </View>
              <Text style={[styles.title, styles.textAlignCenter]}>
                {data?.name}
              </Text>
              <Text style={[styles.text, , styles.textAlignCenter]}>
                {data?.address}
              </Text>
            </View>
            {data.representives?.map((member: User) => (
              <ParticipantElement
                key={member._id}
                round={route?.params?.round}
                url={routes.profile}
                title={member.name}
                subTitle={member.email}
                imageUrl={
                  member?.imageUrl || 'https://source.unsplash.com/random/?dog'
                }
                params={{user: member}}
              />
            ))}
          </ScrollView>
        </EmptyListWrapper>
      )}
    </SafeAreaView>
  );
};

import * as React from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import {Avatar, Icon, Image, Text} from 'react-native-elements';
import {CompanyDetails} from '../../components/CompanyDetails';
import {MyHeader} from '../../components/MyHeader';
import {colors} from '../../constants';
import {styles} from './style';

export const CompanyProfile = ({route}: any) => {
  const [company, setCompany] = React.useState(route.params);

  return (
    <SafeAreaView style={{flex: 1}}>
      <MyHeader title="Company Profile View" />
      <CompanyDetails company={company} />
    </SafeAreaView>
  );
};

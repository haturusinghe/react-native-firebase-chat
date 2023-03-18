import * as React from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import {Avatar, Icon, Image, Text} from 'react-native-elements';
import {MyHeader} from '../../components/MyHeader';
import {colors} from '../../constants';
import {styles} from './style';

export const CompanyProfile = ({route}: any) => {
  const [company, setCompany] = React.useState(route.params);

  return (
    <SafeAreaView style={{flex: 1}}>
      <MyHeader title="Company Profile View" />
      <ScrollView style={styles.container}>
        <View style={styles.centerContent}>
          <View style={styles.marginTop}>
            <View style={styles.centerContent}>
              <Image
                source={{
                  uri: company.image,
                }}
                style={styles.image}
              />
            </View>
            <Text style={[styles.title, styles.textAlignCenter]}>
              {company?.name}
            </Text>
            <Text style={[styles.text, , styles.textAlignCenter]}>
              {company?.address}
            </Text>
          </View>
        </View>
        <View style={styles.marginTop}>
          <Text style={styles.subTitle}>Business Goals</Text>
          <Text style={[styles.text, styles.marginTop]}>
            {company?.description}
          </Text>
        </View>
        <View style={styles.marginTop}>
          <Text style={styles.subTitle}>Objectives</Text>
          <View style={styles.marginTop}>
            {company?.objectives?.map((objective: string, index: number) => (
              <View style={[styles.rowData, styles.row]} key={index}>
                <Avatar size={8} containerStyle={styles.avatar} rounded />
                <Text>{objective}</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={styles.marginTop}>
          <Text style={styles.subTitle}>Contact Info</Text>
          <View style={[styles.row, styles.marginTop]}>
            <View style={[styles.rowData, styles.row]}>
              <Icon
                name="phone"
                type="font-awesome"
                size={18}
                color={colors.black}
                style={styles.icon}
              />
              <Text>Contact Us</Text>
            </View>
            <Text style={styles.rowData}>{company?.phone}</Text>
          </View>
          <View style={[styles.row, styles.marginTop]}>
            <View style={[styles.rowData, styles.row]}>
              <Icon
                name="inbox"
                type="font-awesome"
                size={18}
                color={colors.black}
                style={styles.icon}
              />
              <Text>E-mail</Text>
            </View>
            <Text style={styles.rowData}>{company?.email}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

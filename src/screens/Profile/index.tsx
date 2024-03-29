import * as React from 'react';
import {SafeAreaView, ScrollView, TouchableOpacity, View} from 'react-native';
import {Icon, Image, Text} from 'react-native-elements';
import {MyHeader} from '../../components/MyHeader';
import {colors, routes} from '../../constants';
import {styles} from './style';

import {UserData} from '../ChatUI';
import {StackActions, useNavigation} from '@react-navigation/native';

export const Profile = ({route}: any) => {
  const {user} = route.params;

  const navigation = useNavigation();
  //create participant user data object
  const participantUserData: UserData = {
    _id: user._id || 'no-id',
    name: user.name || 'No Name',
    avatar:
      user.imageUrl ||
      'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
  };

  const navigateSingleChatPage = () => {
    console.log('** From ChatElement', participantUserData);
    navigation.dispatch({
      ...StackActions.push(routes.chatUI, {participantUserData}),
    });
  };

  return (
    <SafeAreaView>
      <MyHeader title="Profile View" />
      <ScrollView style={styles.container}>
        <View style={styles.centerContent}>
          <View style={styles.marginTop}>
            <View style={styles.centerContent}>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
                }}
                style={styles.image}
              />
            </View>
            <Text style={[styles.title, styles.textAlignCenter]}>
              {user.name || 'John Smith'}
            </Text>
            <Text style={[styles.subTitle, styles.textAlignCenter]}>
              Managing Derector on Next Spaces Ltd.
            </Text>
            <Text style={[styles.text, , styles.textAlignCenter]}>
              Board Member
            </Text>
            <TouchableOpacity onPress={navigateSingleChatPage}>
              <Text style={[styles.textAlignCenter]}>{'Send Chat'}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.marginTop}>
          <Text style={styles.subTitle}>Background</Text>
          <Text style={[styles.text, styles.marginTop]}>
            User shall be able to click on the “Accept”, “Tentative” or
            “Decline” button and declare their preference.  When a user clicks
            on “Accept”, “Tentative” or “Decline” buttons, those event cards
            will be appearing in “My Schedule” tab.  By clicking black button
            next to Decline button, user shall be able to view the other users
            who have Accepted or
          </Text>
          <Text style={[styles.text, styles.marginTop]}>
            User shall be able to click on the “Accept”, “Tentative” or
            “Decline” button and declare their preference.  When a user clicks
            on “Accept”, “Tentative” or “Decline” buttons, those event cards
            will be appearing in “My Schedule” tab.  By clicking black button
            next to Decline button, user shall be able to view the other users
            who have Accepted or
          </Text>
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
            <Text style={styles.rowData}>+23432434343</Text>
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
            <Text style={styles.rowData}>johnsmith@nsfdf.com</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

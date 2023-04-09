import AsyncStorage from '@react-native-async-storage/async-storage';
import {StackActions, useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import {X_Button} from '../../components/Button';
import {MyHeader} from '../../components/MyHeader';
import {ParticipantElement} from '../../components/ParticipantElement';
import {ACCESS_TOKEN, colors, routes} from '../../constants';
import {useAppDispatch} from '../../hooks/useRedux';
import {userSlice} from '../../store/user';
import {styles} from './style';

export const Directory = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const logout = async () => {
    AsyncStorage.setItem(ACCESS_TOKEN, '');
    dispatch(userSlice.actions.setUser(null));
    navigation.dispatch(StackActions?.replace(routes.login));
    // remove app id from db
  };

  return (
    <SafeAreaView>
      <MyHeader title="Directory" />
      <ScrollView>
        <ParticipantElement
          round={false}
          url={routes.about}
          title="About IFAWPCA"
          imageUrl="https://images.unsplash.com/photo-1490730141103-6cac27aaab94?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
        />
        <ParticipantElement
          round={false}
          url={routes.memberList}
          title="IFAWPCA Members"
          imageUrl="https://images.unsplash.com/photo-1490730141103-6cac27aaab94?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          params={{
            title: 'IFAWPCA Members',
            round: false,
            url: routes.companyProfile,
          }}
        />
        <ParticipantElement
          round={false}
          url={routes.officeBearers}
          params={{title: 'Office Bearers', round: true}}
          title="Office Bearers"
          imageUrl="https://images.unsplash.com/photo-1490730141103-6cac27aaab94?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
        />
        <ParticipantElement
          round={false}
          url={routes.boardMemberList}
          params={{title: 'Board Members', round: true}}
          title="Board Members"
          imageUrl="https://images.unsplash.com/photo-1490730141103-6cac27aaab94?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
        />
        <View style={styles.buttonWrapper}>
          <X_Button
            title="Log Out"
            color={colors.white}
            onPress={logout}
            backgroundColor={colors.error}
            borderWidth={0}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

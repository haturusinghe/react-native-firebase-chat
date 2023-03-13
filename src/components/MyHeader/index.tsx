import * as React from 'react';
import {StackActions, useNavigation} from '@react-navigation/native';
import {View} from 'react-native';
import {Header, Text} from 'react-native-elements';
import {colors, routes} from '../../constants';
import {styles} from './style';

export const MyHeader = ({
  title,
  backenable = false,
}: {
  title: string;
  backenable?: boolean;
}) => {
  const navigation = useNavigation();
  const chatPage = () => {
    navigation.dispatch({
      ...StackActions.push(routes.chat),
    });
  };
  const goBack = () => {
    navigation.goBack();
  };
  return (
    <View>
      <Header
        leftComponent={
          backenable
            ? {
                icon: 'arrow-left',
                color: colors.black,
                iconStyle: {color: colors.black},
                size: 30,
                onPress: goBack,
              }
            : {}
        }
        centerComponent={<Text style={styles.title}>{title}</Text>}
        rightComponent={{
          icon: 'message',
          color: colors.black,
          onPress: chatPage,
        }}
        backgroundColor={colors.primary_dark}
        containerStyle={{
          backgroundColor: colors.primary,
        }}
      />
    </View>
  );
};

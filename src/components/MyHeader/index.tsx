import * as React from 'react';
import {useNavigation} from '@react-navigation/native';
import {View} from 'react-native';
import {Header, Text} from 'react-native-elements';
import {colors} from '../../constants';
import {styles} from './style';

export const MyHeader = ({title}: {title: string}) => {
  const navigation = useNavigation();
  //   const navigateDetailsPage = () => {
  //     navigation.dispatch({
  //       ...StackActions.push(routes.newsDetails),
  //     });
  //   };
  return (
    <View>
      <Header
        leftComponent={{
          icon: 'menu',
          color: colors.black,
          iconStyle: {color: colors.black},
        }}
        centerComponent={<Text style={styles.title}>{title}</Text>}
        rightComponent={{icon: 'home', color: colors.black}}
        backgroundColor={colors.primary_dark}
        containerStyle={{
          backgroundColor: colors.primary,
        }}
      />
    </View>
  );
};

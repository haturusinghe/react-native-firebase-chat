import {StackActions, useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {Icon, Text} from 'react-native-elements';
import {colors, routes} from '../../constants';
import {styles} from './style';

export const ParticipantElement = () => {
  const navigation = useNavigation();
  const navigateProfilePage = () => {
    navigation.dispatch({
      ...StackActions.push(routes.profile),
    });
  };
  return (
    <TouchableOpacity style={styles.card} onPress={navigateProfilePage}>
      <View style={styles.row}>
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
          }}
          style={styles.image}
        />
        <View style={styles.content}>
          <Text style={styles.title}>Mr. Rabi Singh</Text>
          <Text>Managing Director</Text>
          <Text>Pachfic formwork Pvt Ltd</Text>
        </View>
        <View style={styles.flexEnd}>
          <Icon
            name="caret-right"
            type="font-awesome"
            size={25}
            color={colors.black}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

import * as React from 'react';
import {Image, View} from 'react-native';
import {Icon, Text} from 'react-native-elements';
import {colors} from '../../constants';
import {styles} from './style';

export const ParticipantElement = () => {
  return (
    <View style={styles.card}>
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
    </View>
  );
};

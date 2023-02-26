import {StackActions, useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {Icon, Text} from 'react-native-elements';
import {colors, routes} from '../../constants';
import {styles} from './style';

export const ParticipantElement = ({
  round = true,
  url,
  params = {},
  imageUrl,
  title,
  subTitle,
  text,
}: {
  round?: boolean;
  url?: string;
  params?: object;
  imageUrl: string;
  title: string;
  subTitle?: string;
  text?: string;
}) => {
  const navigation = useNavigation();
  const navigateProfilePage = () => {
    navigation.dispatch({
      ...StackActions.push(url || routes.profile, params),
    });
  };
  return (
    <TouchableOpacity style={styles.card} onPress={navigateProfilePage}>
      <View style={styles.row}>
        <Image
          source={{
            uri: imageUrl,
          }}
          style={round ? styles.roundImage : styles.image}
        />
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          {subTitle && <Text>{subTitle}</Text>}
          {text && <Text>{text}</Text>}
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

import {StackActions, useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-elements';
import {routes} from '../../constants';
import {styles} from './style';

interface UserData {
  _id: string;
  name: string;
  avatar: string;
}

export const ChatElement = ({
  round = true,
  imageUrl = 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
  recipientName,
  lastMessage,
  lastMessageTime,
  _id,
}: {
  round?: boolean;
  imageUrl?: string;
  recipientName: string;
  _id: string; // participant id (the other user in the chat)
  lastMessage?: string;
  lastMessageTime?: string;
}) => {
  const navigation = useNavigation();

  const participantUserData: UserData = {
    _id: _id || 'no-id',
    name: recipientName,
    avatar: imageUrl,
  };

  const navigateSingleChatPage = () => {
    console.log('** From ChatElement', participantUserData);
    navigation.dispatch({
      ...StackActions.push(routes.chatUI, {participantUserData}),
    });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={navigateSingleChatPage}>
      <View style={styles.row}>
        <Image
          source={{
            uri: imageUrl,
          }}
          style={round ? styles.roundImage : styles.image}
        />
        <View style={styles.content}>
          <Text style={styles.title}>{recipientName}</Text>
          {lastMessage && <Text>{lastMessage}</Text>}
          <View style={styles.flexEnd}>
            {lastMessageTime && (
              <Text style={styles.text}>{lastMessageTime}</Text>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

import * as React from 'react';
import {useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import {GiftedChat, IMessage} from 'react-native-gifted-chat';
import {useAppSelector} from '../../hooks/useRedux';
import {RouteProp} from '@react-navigation/native';

type RootStackParamList = {
  ChatUI: {participantUserData: UserData};
};

type ChatUIRouteProp = RouteProp<RootStackParamList, 'ChatUI'>;

interface ChatUIProps {
  route: ChatUIRouteProp;
}

export interface UserData {
  _id: string;
  name: string;
  avatar: string;
}

const defaultAvatarUrl =
  'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png';

export const ChatUI = ({route}: ChatUIProps) => {
  const {participantUserData} = route.params;

  const {user} = useAppSelector(store => store.user);

  const [messages, setMessages] = useState<IMessage[]>([]);

  const [chatUser, setChatUser] = useState<UserData>({
    _id: user?._id || 'no-id',
    name: user?.name || '',
    avatar: user?.imageUrl || defaultAvatarUrl,
  });

  const [chatParticipant, setChatParticipant] = useState<UserData>({
    _id: participantUserData?._id || 'no-id',
    name: participantUserData?.name || '',
    avatar: participantUserData?.avatar || defaultAvatarUrl,
  });

  const [chatId, setchatId] = useState<string>(() => {
    const ids = [chatUser._id, chatParticipant._id];
    ids.sort();
    return ids.join('-');
  });

  function getChatId(sender: string, recipient: string): string {
    const ids = [sender, recipient];
    ids.sort();
    return ids.join('-');
  }

  useEffect(() => {
    const db = firestore();
    const q = db
      .collection('chats')
      .doc(chatId)
      .collection('messages')
      .orderBy('createdAt', 'desc');

    const unsubscribe = q.onSnapshot(snapshot => {
      setMessages(
        snapshot.docs.map(doc => ({
          _id: doc.data()._id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user,
        })),
      );
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const onSend = async (newMessages: IMessage[] = []) => {
    const db = firestore();
    const chatRef = db.collection('chats').doc(chatId);
    const newMessage = newMessages[0];

    await chatRef.collection('messages').add({
      _id: newMessage._id,
      createdAt: newMessage.createdAt,
      text: newMessage.text,
      user: chatUser,
    });

    await chatRef.set(
      {
        lastMessageTime: newMessage.createdAt,
        lastMessage: newMessage.text,
        users: [chatUser, chatParticipant],
        userIds: [chatUser._id, chatParticipant._id],
      },
      {merge: true},
    );
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={newMessages => onSend(newMessages)}
      user={chatUser}
    />
  );
};

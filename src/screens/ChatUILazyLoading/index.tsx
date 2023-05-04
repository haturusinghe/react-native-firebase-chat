import * as React from 'react';
import {useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import {GiftedChat, IMessage} from 'react-native-gifted-chat';
import {useAppSelector} from '../../hooks/useRedux';
import {RouteProp} from '@react-navigation/native';

const amountOfChatMessagesLoadedAtOneTime = 20;

type RootStackParamList = {
  ChatUILazyLoading: {participantUserData: UserData};
};

type ChatUILazyLoadingRouteProp = RouteProp<
  RootStackParamList,
  'ChatUILazyLoading'
>;

interface ChatUILazyLoadingProps {
  route: ChatUILazyLoadingRouteProp;
}

export interface UserData {
  _id: string;
  name: string;
  avatar: string;
}

const defaultAvatarUrl =
  'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png';

export const ChatUILazyLoading = ({route}: ChatUILazyLoadingProps) => {
  const {participantUserData} = route.params;

  const {user} = useAppSelector(store => store.user);

  const [isLoadingEarlier, setIsLoadingEarlier] = useState(false);
  const [loadEarlier, setLoadEarlier] = useState(true);
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

  async function fetchMessages(
    limit: number,
    oldestMessageTimestamp: Date | number,
  ) {
    const messagesRef = firestore()
      .collection('chats')
      .doc(chatId)
      .collection('messages');

    const q = messagesRef
      .where('createdAt', '<', oldestMessageTimestamp)
      .orderBy('createdAt', 'desc')
      .limit(limit);

    const unsubscribe = q.onSnapshot(
      querySnapshot => {
        const fetchedMessages: IMessage[] = [];
        querySnapshot.forEach(documentSnapshot => {
          const fetchedMessage = documentSnapshot.data();
          fetchedMessages.push({
            _id: fetchedMessage._id,
            createdAt: fetchedMessage.createdAt.toDate(),
            text: fetchedMessage.text,
            user: fetchedMessage.user,
          });
        });
        setMessages(previousMessages =>
          GiftedChat.prepend(previousMessages, fetchedMessages),
        );
      },
      error => {
        console.error(error);
      },
    );

    return unsubscribe;
  }

  useEffect(() => {
    const db = firestore();

    const q = db
      .collection('chats')
      .doc(chatId)
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .limit(amountOfChatMessagesLoadedAtOneTime);

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

  const fetchPreviousMessages = async () => {
    console.log('\nfetchPreviousMessages Called\n');
    if (messages.length > 0 && !isLoadingEarlier) {
      setIsLoadingEarlier(true);
      console.log('set isLoadingEarlier to true');
      const oldestMessage = messages[messages.length - 1];
      console.log('oldestMessage', oldestMessage, oldestMessage.createdAt);

      const previousMessages = await fetchMessages(
        amountOfChatMessagesLoadedAtOneTime,
        oldestMessage.createdAt,
      );
      if (previousMessages.length > 0) {
        console.log('fetched previous messages');
        setMessages(previousMessages =>
          GiftedChat.prepend(previousMessages, previousMessages),
        );
      } else {
        // setLoadEarlier(false);
      }
      setIsLoadingEarlier(false);
      console.log('set isLoadingEarlier to false');
    }
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={newMessages => onSend(newMessages)}
      user={chatUser}
      loadEarlier={false}
      onLoadEarlier={fetchPreviousMessages}
      isLoadingEarlier={isLoadingEarlier}
      listViewProps={{
        onEndReached: fetchPreviousMessages,
        onEndReachedThreshold: 0.5,
      }}
    />
  );
};

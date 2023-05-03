import {useRoute} from '@react-navigation/native';
import * as React from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import {ChatElement as ChatCard} from '../../components/ChatElement';
import {MyHeader} from '../../components/MyHeader';
import firestore from '@react-native-firebase/firestore';
import {useState, useEffect} from 'react';
import {useAppSelector} from '../../hooks/useRedux';

interface ChatData {
  id: string;
  name?: string;
  avatar?: string;
  lastMessage?: string;
  lastMessageTime?: Date;
  users?: UserData[];
  userIds?: string[];
}

interface UserData {
  _id: string;
  name: string;
  avatar: string;
}

export const Chat = () => {
  const {user} = useAppSelector(store => store.user);

  const [chatUser, setChatUser] = useState<UserData>({
    _id: user?._id || 'no-id',
    name: user?.name || '',
    avatar:
      user?.imageUrl ||
      'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
  });

  const [chats, setChats] = useState<ChatData[]>([]);

  useEffect(() => {
    const query = firestore()
      .collection('chats')
      .where('userIds', 'array-contains', chatUser._id);

    const unsubscribe = query.onSnapshot(querySnapshot => {
      //
      // get a snapshot of the chats collection
      const chatsData = querySnapshot.docs.map(documentSnapshot => {
        const data = documentSnapshot.data();

        // get the last message time
        const lastMessageTime = data.lastMessageTime
          ? new Date(data.lastMessageTime.seconds * 1000)
          : undefined;

        // get the users
        const users = data.users
          ? data.users.map((user: any) => ({
              _id: user._id,
              name: user.name,
              avatar: user.avatar,
            }))
          : undefined;

        // get the user ids
        const userIds: string[] = data.userIds || [];

        //returns the chat data
        return {
          id: documentSnapshot.id,
          lastMessage: data.lastMessage,
          lastMessageTime,
          users,
          userIds,
        };
      });

      console.log('chatsData', chatsData);
      setChats(chatsData);
    });
    return () => unsubscribe();
  }, []);

  return (
    <SafeAreaView>
      <MyHeader title={'Chat'} />
      <ScrollView>
        {chats.length >= 1 ? (
          chats.map(chat => (
            <ChatCard
              key={chat.id}
              recipientName={
                chat.users?.filter(user => user._id !== chatUser._id)[0]
                  ?.name || 'No name'
              }
              lastMessage={chat.lastMessage}
              lastMessageTime={chat.lastMessageTime?.toDateString() || ''}
              _id={
                chat.userIds?.filter(id => id !== chatUser._id)[0] || 'no-id'
              }
            />
          ))
        ) : (
          <ChatCard
            recipientName={'No name'}
            lastMessage={'No message'}
            lastMessageTime={''}
            _id={'no-id'}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

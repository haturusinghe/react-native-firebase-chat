import React, {useState} from 'react';
import {SafeAreaView, View} from 'react-native';
import {MyHeader} from '../../components/MyHeader';
import {NewsFeed} from '../../components/NewsFeed';
import {styles} from './style';
import {withAuth} from '../../hoc/withAuth';
import {InputField} from '../../components/InputField';
import {Button, Icon} from 'react-native-elements';
import {colors} from '../../constants';
import {useAppDispatch} from '../../hooks/useRedux';
import {reloadNews, setSearchTermAction} from '../../store/news';

const HomeScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searched, setSearched] = useState(false);
  const dispatch = useAppDispatch();
  return (
    <SafeAreaView style={styles.flex}>
      <MyHeader title="News" />
      <View style={styles.searchBar}>
        <InputField
          onChangeText={(e: any) => {
            setSearchTerm(e);
          }}
          autoCapitalize="none"
          rightIcon={() => (
            <Button
              icon={
                !searched
                  ? {
                      type: 'ionicon',
                      name: 'search',
                      color: colors.grey,
                    }
                  : {
                      type: 'ionicon',
                      name: 'close',
                      color: colors.grey,
                    }
              }
              type={'clear'}
              onPress={() => {
                if (!searched) {
                  dispatch(reloadNews(searchTerm));
                } else {
                  dispatch(reloadNews(''));
                  setSearchTerm('');
                }
                setSearched(!searched);
              }}>
              {/* <Icon name="save" color="white" /> */}
            </Button>
          )}
          placeholder="Search"
          value={searchTerm}
        />
      </View>
      <NewsFeed />
    </SafeAreaView>
  );
};

export default withAuth(HomeScreen);

import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {Button} from 'react-native-elements';
import {colors} from '../../constants';
import {styles} from './style';
import {InputField} from '../InputField';

export const SearchBar = ({
  onPress,
  value,
}: {
  onPress: (searchTerm: string) => void;
  value: string;
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    setSearchTerm(value);
    setSearched(false);
  }, [value]);

  return (
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
                onPress(searchTerm);
              } else {
                onPress('');
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
  );
};

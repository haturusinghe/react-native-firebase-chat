import * as React from 'react';
import {View} from 'react-native';
import {Input} from 'react-native-elements';
import {colors} from '../../constants';

export const InputField = (props: any) => {
  return (
    <View>
      <Input
        // value={searchText}
        containerStyle={{
          backgroundColor: 'white',
          borderRadius: 8,
          borderColor: colors.grey,
          borderWidth: props.borderWidths || 2,
          height: props.height || 48,
          marginBottom: 25,
        }}
        inputContainerStyle={{
          textAlignVertical: 'top',
          height: props.height || 48,
          borderColor: '#ffffff00',
          paddingLeft: 16,
        }}
        inputStyle={{
          fontSize: 14,
          fontFamily: 'Manrope-Regular',
          color: '#2d3436',
        }}
        labelStyle={{
          color: 'rgba(194,194,194,1)',
          fontFamily: 'Manrope-Regular',
        }}
        errorStyle={{fontFamily: 'Manrope-Bold', fontSize: 10}}
        {...props}
      />
    </View>
  );
};

import * as React from 'react';
import {View} from 'react-native';
import {Button} from 'react-native-elements/dist/buttons/Button';
import {colors} from '../../constants';

export const X_Button = (props: {
  color: string;
  title: string;
  onPress: () => void;
  disabled?: boolean;
  icon?: any;
  borderWidth?: number;
  fontSize?: number;
  fontFamily?: string;
  backgroundColor?: string;
  fontWeight?: any;
}) => {
  return (
    <View>
      <Button
        buttonStyle={{
          borderColor: props.color,
          borderWidth: props.borderWidth || 0,
          minHeight: 48,
        }}
        titleStyle={{
          color: props.color,
          fontSize: props.fontSize || 14,
          fontFamily: props.fontFamily || 'Manrope-Regular',
          fontWeight: props.fontWeight || 'normal',
        }}
        containerStyle={{
          minWidth: 150,
          minHeight: 48,
          backgroundColor: props.backgroundColor || colors.primary,
          borderRadius: 5,
        }}
        icon={props.icon}
        title={props.title}
        onPress={props.onPress}
        disabled={props.disabled || false}
      />
    </View>
  );
};

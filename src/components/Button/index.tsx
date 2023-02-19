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
}) => {
  return (
    <View>
      <Button
        buttonStyle={{
          borderRadius: 8,
          borderColor: props.color,
          borderWidth: props.borderWidth || 2,
          minHeight: 48,
        }}
        titleStyle={{
          color: props.color,
          fontSize: props.fontSize || 14,
          fontFamily: props.fontFamily || 'Manrope-Regular',
        }}
        containerStyle={{
          minWidth: 150,
          minHeight: 48,
          backgroundColor: colors.primary,
        }}
        icon={props.icon}
        title={props.title}
        onPress={props.onPress}
        disabled={props.disabled || false}
      />
    </View>
  );
};

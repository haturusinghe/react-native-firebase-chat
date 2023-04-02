import AnimatedLottieView from 'lottie-react-native';
import * as React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-elements';
import {styles} from './style';

export const EmptyListWrapper = ({
  list,
  children,
  loading,
}: {
  list?: any[];
  children: JSX.Element;
  loading: boolean;
}) => {
  return (
    <View style={styles.flex}>
      {(!list || list?.length === 0) && !loading ? (
        <View style={styles.container}>
          <AnimatedLottieView
            source={require('./empty.json')}
            autoPlay
            loop={true}
            style={{width: 150, height: 150}}
          />
          <Text style={styles.text}>No Data found!</Text>
        </View>
      ) : (
        children
      )}
    </View>
  );
};

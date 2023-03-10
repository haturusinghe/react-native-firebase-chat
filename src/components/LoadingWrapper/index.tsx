import AnimatedLottieView from 'lottie-react-native';
import * as React from 'react';
import {View} from 'react-native';
import {styles} from './style';

export const LoadingWrapper = ({
  loading,
  children,
}: {
  loading: boolean;
  children: JSX.Element;
}) => {
  return (
    <View style={styles.flex}>
      {loading ? (
        <View style={styles.container}>
          <AnimatedLottieView
            source={require('./loading.json')}
            autoPlay
            loop={true}
            style={{width: 150, height: 150}}
          />
        </View>
      ) : (
        children
      )}
    </View>
  );
};

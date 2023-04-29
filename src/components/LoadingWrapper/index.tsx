import AnimatedLottieView from 'lottie-react-native';
import * as React from 'react';
import {View} from 'react-native';
import {Overlay} from 'react-native-elements';
import {styles} from './style';

export enum LoadingType {
  PAGE_LOAD,
  PAGINATION_LOAD,
  OVERLAY,
}

export const LoadingWrapper = ({
  loading,
  children,
  type = LoadingType.PAGE_LOAD,
}: {
  loading: boolean;
  children: JSX.Element;
  type?: LoadingType;
}) => {
  return (
    <View style={styles.flex}>
      {type === LoadingType.PAGE_LOAD && loading ? (
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
      {type === LoadingType.PAGINATION_LOAD && loading && (
        <View style={styles.paginationLoading}>
          <AnimatedLottieView
            source={require('./circleLoading.json')}
            autoPlay
            loop={true}
            style={{width: 150, height: 150}}
          />
        </View>
      )}
      {type === LoadingType.OVERLAY && loading && (
        <Overlay
          isVisible={loading}
          overlayStyle={styles.overlayStyle}
          fullScreen={true}>
          <View style={styles.container}>
            <AnimatedLottieView
              source={require('./loading.json')}
              autoPlay
              loop={true}
              style={{width: 150, height: 150}}
            />
          </View>
        </Overlay>
      )}
    </View>
  );
};

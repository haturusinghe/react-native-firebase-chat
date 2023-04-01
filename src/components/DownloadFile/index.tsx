import * as React from 'react';
import {
  PermissionsAndroid,
  Platform,
  TouchableOpacity,
  View,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {colors} from '../../constants';
import RNFetchBlob from 'rn-fetch-blob';

export const DownloadFile = (props: {url: string}) => {
  const requestStoragePermission = async (callbackSuccess: () => void) => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
        callbackSuccess();
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const downloadRequestButton = () => {
    if (Platform.OS === 'android') {
      requestStoragePermission(() => {
        downloadFile(
          'https://www.africau.edu/images/default/sample.pdf',
          'filenameis',
        );
      });
    }

    if (Platform.OS === 'ios') {
      downloadFile(
        'https://www.africau.edu/images/default/sample.pdf',
        'filenameis',
      );
    }
  };

  const downloadFile = (uri: string, name: string): void => {
    const {config, fs} = RNFetchBlob;
    const PictureDir = fs.dirs.DownloadDir;
    const options = {
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        title: name,
        path: `${PictureDir}/${name}`,
      },
      appendExt: 'pdf',
    };
    config(options)
      .fetch('GET', uri, {
        // Accept: 'application/json',
        // 'Content-Type': 'multipart/form-data,octet-stream',
        'Content-Type': 'multipart/form-data',
      })
      .then(_ => {
        console.log('downlload complete');
      })
      .catch(_ => {
        console.log('some error occured');
      });
  };

  return (
    <TouchableOpacity onPress={downloadRequestButton}>
      <Icon name="file" type="font-awesome" size={18} color={colors.black} />
    </TouchableOpacity>
  );
};

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import * as React from 'react';

import {Provider} from 'react-redux';
import {store} from './src/store/store';
import {Navigator} from './src/components/Navigator';
import OneSignal from 'react-native-onesignal';
// @ts-ignore
import {ONESIGNAL_APP_ID} from '@env';

// OneSignal Initialization
OneSignal.setAppId(ONESIGNAL_APP_ID);

// promptForPushNotificationsWithUserResponse will show the native iOS or Android notification permission prompt.
// We recommend removing the following code and instead using an In-App Message to prompt for notification permission (See step 8)
OneSignal.promptForPushNotificationsWithUserResponse();

//Method for handling notifications received while app in foreground
OneSignal.setNotificationWillShowInForegroundHandler(
  notificationReceivedEvent => {
    console.log(
      'OneSignal: notification will show in foreground:',
      notificationReceivedEvent,
    );
    let notification = notificationReceivedEvent.getNotification();
    console.log('notification: ', notification);
    const data = notification.additionalData;
    console.log('additionalData: ', data);
    // Complete with null means don't show a notification.
    notificationReceivedEvent.complete(notification);
  },
);

//Method for handling notifications opened
OneSignal.setNotificationOpenedHandler(notification => {
  console.log('OneSignal: notification opened:', notification);
});

OneSignal.getDeviceState().then((deviceState: any) => {
  console.log('Device State: ', deviceState);
  console.log('Player ID: ', deviceState.userId);
});

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
}

export default App;

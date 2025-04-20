import NetInfo from '@react-native-community/netinfo';
import 'react-native-get-random-values';
import _ from 'lodash';
import React, { useEffect, useState, createContext } from 'react';
import Navigation from './src/navigation/Route';
import { setNetConnet } from './src/Redux/reducers/screensR/screensR';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';
import defaultTheme, { light_theme, dark_theme, Theme } from './src/theme/colors';
import messaging from "@react-native-firebase/messaging";
import fcmService from './src/notification/FcmService';
import NotificationService from './src/notification/NotificationService';


export const ThemeContext = createContext<{
  theme: Theme;
  toggleTheme: () => void;
}>({
  theme: defaultTheme,
  toggleTheme: () => { },
});

const App = () => {
  const dispatch = useDispatch();
  const [theme, setTheme] = useState<Theme>(light_theme);

  console.log('process.env.API_URL', process.env.API_URL);

  const handleNetworkChange = (state: any) => {
    dispatch(setNetConnet(state.isConnected));
  };


  const debounceHandleNet = _.debounce(handleNetworkChange, 600, {
    leading: false,
    trailing: true,
  });

  useEffect(() => {
    fcmService.requestUserPermission();
  }, []);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(debounceHandleNet);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribeOnMessage = messaging().onMessage(async remoteMessage => {
      Toast.show({
        type: 'info',
        text1: remoteMessage.notification?.title,
        text2: remoteMessage.notification?.body,
        visibilityTime: 5000,
      });
      if (remoteMessage.notification)
        NotificationService.onDisplayNotification(remoteMessage.notification);
    });

    const unsubscribeOnNotificationOpenedApp = messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('Notification caused app to open from background state:', remoteMessage.notification);
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log('Notification caused app to open from quit state:', remoteMessage.notification);
        }
      });
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage.notification);
      if (remoteMessage.notification)
        NotificationService.onDisplayNotification(remoteMessage.notification);
    });

    return () => {
      unsubscribeOnMessage();
      unsubscribeOnNotificationOpenedApp();
    };
  }, []);

  const toggleTheme = () => {
    setTheme((prevTheme: any) => (prevTheme === light_theme ? dark_theme : light_theme));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <>
        <Navigation />
        <Toast />
      </>
    </ThemeContext.Provider>
  );
};

export default App;

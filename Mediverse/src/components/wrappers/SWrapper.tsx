import {
  Platform,
  SafeAreaView,
  StatusBar,
  StatusBarStyle,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';

import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {memo, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {navStrings} from '../../navigation/navStrings';
import colors from '../../theme/colors';
import {
  safe_bottom,
  safe_top,
  scrn_height,
  scrn_width,
} from '../../theme/responsive';
import OfflineC from '../offline/OfflineC';

interface SWrapProps {
  children: any;

  hidden?: boolean;

  statusBarColor?: string;

  barStyle?: null | StatusBarStyle | undefined;

  fullScreenColor?: string;

  mainScreenColor?: string;

  bottomAreaColor?: string;

  padHor?: number;

  hideBottom?: boolean;

  style?: any;
  containerStyle?: StyleProp<ViewStyle>;
  noMargin?: boolean;
}

const SWrapper = ({
  children,

  hidden = false,

  statusBarColor = colors.white,

  barStyle = 'dark-content',

  fullScreenColor = colors.white,

  mainScreenColor = colors.white,

  bottomAreaColor = colors.white,

  padHor = 0,

  hideBottom = false,

  style,
  containerStyle,
  noMargin,
}: SWrapProps) => {
  const navigation =
    useNavigation<NavigationProp<ReactNavigation.RootParamList>>();
  const currentRoute =
    navigation.getState()?.routes[navigation?.getState()?.index].name;

  const [showOffline, setshowOffline] = useState<Boolean>(false);

  const net_con = useSelector((state: any) => state.screens.net_con);

  const offlFreeScrn = [navStrings.SPLASH];

  useEffect(() => {
    if (!offlFreeScrn.includes(currentRoute) && !net_con) {
      setshowOffline(true);
    }
  }, [net_con]);

  return (
    <View
      style={{
        ...style,

        backgroundColor: fullScreenColor,

        height: scrn_height,

        width: scrn_width,
        flex: 1,
      }}>
      {!hidden && (
        <SafeAreaView
          style={{
            width: '100%',
            height: noMargin ? 0 : safe_top ? Platform.OS === 'android' ? safe_top : safe_top-30 : 0,
            backgroundColor: statusBarColor,
          }}
        />
      )}

      <StatusBar
        hidden={hidden}
        translucent={true}
        backgroundColor={statusBarColor}
        barStyle={barStyle}
      />

      <View
        style={[
          {
            flex: 1,
            backgroundColor: mainScreenColor,
            paddingHorizontal: padHor,
            marginBottom:
              Platform.OS == 'ios' && !hidden ? safe_bottom || 0 : 0,
            marginTop: 0 // Platform.OS === 'ios' ? 16 : 0
          },
          containerStyle,
        ]}>
        {showOffline && <OfflineC />}

        {children}

        {!hideBottom && Platform.OS == 'ios' && (
          <View
            style={{
              height: safe_bottom,

              width: '100%',

              backgroundColor: bottomAreaColor,

              position: 'absolute',

              bottom: !hidden ? -(safe_bottom || 0) : 0,
            }}
          />
        )}
      </View>
    </View>
  );
};

export default memo(SWrapper);

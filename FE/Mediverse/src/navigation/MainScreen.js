import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import * as screens from '../screens';
import navStrings from './navStrings';

const header = {headerShown: false};

const MainScreen = Stack => {
  return (
    <>
      <Stack.Screen
        name={navStrings.HOME}
        component={screens.Home}
        options={header}
      />
    </>
  );
};

export default MainScreen;

// In App.js in a new project

import { LinkingOptions, NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import StackNav from './StackNav';
import { Linking } from 'react-native';

const routeParams: LinkingOptions<ReactNavigation.RootParamList> = {
  prefixes: ['mediverse://', 'https://mediverse.com'],
  config: {
    screens: {
      Home: 'home', 
      Profile: 'profile/:id',
      ChangePasswordScreen: "reset-password/:token"
    }
  },
};

function Navigation() {

  return (
    <NavigationContainer linking={routeParams}>
      <StackNav />
    </NavigationContainer>

  );
}

export default Navigation;

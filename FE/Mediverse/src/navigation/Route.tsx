import * as React from 'react';
import { LinkingOptions, NavigationContainer } from '@react-navigation/native';
import StackNav from './StackNav';

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

export default React.memo(Navigation);

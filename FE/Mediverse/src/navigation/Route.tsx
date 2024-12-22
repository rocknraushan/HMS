// In App.js in a new project

import { LinkingOptions, NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import StackNav from './StackNav';

function Navigation() {
  let routeParams: LinkingOptions<ReactNavigation.RootParamList> = {
    prefixes: ['myapp://', 'https://myapp.com'], // Define your deep linking prefixes
    config: {
      screens: {
        Home: 'home', // Maps the "Home" route to "myapp://home" or "https://myapp.com/home"
        Profile: 'profile/:id', // Maps to "myapp://profile/123" with dynamic parameters
      }
    },
  };

  return (
    <NavigationContainer linking={routeParams}>
      <StackNav />
    </NavigationContainer>

  );
}

export default Navigation;

// In App.js in a new project

import {NavigationContainer} from '@react-navigation/native';
import * as React from 'react';
import StackNav from './StackNav';
import UserProvider from '../context/user';
import { Provider } from 'react-redux';
import { store } from '../Redux/store';

function Navigation() {
  return (
    <NavigationContainer>
            <StackNav />
    </NavigationContainer>

  );
}

export default Navigation;

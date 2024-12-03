// In App.js in a new project

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import StackNav from './StackNav';
import UserProvider from '../context/user';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import CreatePostProvider from '../context/CreatePostContext';
import WishlistModal from '../components/Modals/WishlistModal';
import GetQuoteModal from '../components/Modals/GetQuoteModal';
// import NotificationController from "../services/notification/notification";

function Navigation() {
  return (
    <NavigationContainer>
      <UserProvider>
        <CreatePostProvider>
          <BottomSheetModalProvider>
            {/* <NotificationController /> */}
            <StackNav />
            <WishlistModal />
            <GetQuoteModal />
          </BottomSheetModalProvider>
        </CreatePostProvider>
      </UserProvider>
    </NavigationContainer>
  );
}

export default Navigation;

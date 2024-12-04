import NetInfo from '@react-native-community/netinfo';
import _ from 'lodash';
import React, {useCallback, useEffect, useLayoutEffect} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider, useDispatch} from 'react-redux';
import Navigation from './src/navigation/Route';
import {setNetConnet} from './src/Redux/reducers/screensR/screensR';
import Toast from 'react-native-toast-message';
import { Login } from './src/screens';
import { store } from './src/Redux/store';

const App = () => {
  const dispatch = useDispatch();

  console.log('process.env.API_URL', process.env.API_URL);
  const handleNetworkChange = (state: any) => {
    dispatch(setNetConnet(state.isConnected));
  };

  const debounceHandleNet = _.debounce(handleNetworkChange, 600, {
    leading: false,
    trailing: true,
  });


  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(debounceHandleNet);
    return () => unsubscribe();
  }, []);


  return (
    <>
     <Navigation />
     <Toast />
    </>
       
  );
  // return <Login />
};

export default App;

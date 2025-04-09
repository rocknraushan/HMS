import {combineReducers} from '@reduxjs/toolkit';
import authenticationReducer from './authentication/authentication';
import themeReducer from './theme/theme';
import screensReducer from './screensR/screensR';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist';

const persistConfig = {
  key: 'persist-key',
  storage: AsyncStorage,
  version: 1,
};

const allReducers = combineReducers({
  auth: authenticationReducer,
  theme: themeReducer,
  screens: screensReducer,
});

const persistedReducer = persistReducer(persistConfig, allReducers);

export default persistedReducer;

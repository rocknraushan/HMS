/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import { store } from './src/Redux/store';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
const ReduxApp = () => (
  <Provider store={store}>
    <GestureHandlerRootView>
    <App />
    </GestureHandlerRootView>
  </Provider>
);

AppRegistry.registerComponent(appName, () => ReduxApp);

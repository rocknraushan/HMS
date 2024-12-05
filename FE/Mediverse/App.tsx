import NetInfo from '@react-native-community/netinfo';
import _ from 'lodash';
import React, { useEffect, useState, createContext, useContext } from 'react';
import Navigation from './src/navigation/Route';
import { setNetConnet } from './src/Redux/reducers/screensR/screensR';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';
import defaultTheme, { light_theme, dark_theme, Theme } from './src/theme/colors';


export const ThemeContext = createContext<{
  theme: Theme;
  toggleTheme: () => void;
}>({
  theme: defaultTheme,
  toggleTheme: () => {},
});

const App = () => {
  const dispatch = useDispatch();
  const [theme, setTheme] = useState<Theme>(light_theme);

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

  
  const toggleTheme = () => {
    setTheme((prevTheme:any) => (prevTheme === light_theme ? dark_theme : light_theme));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <>
        <Navigation />
        <Toast />
      </>
    </ThemeContext.Provider>
  );
};

export default App;

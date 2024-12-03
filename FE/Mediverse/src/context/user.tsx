import {useNavigation} from '@react-navigation/native';
import {
  Dispatch,
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import {useSelector} from 'react-redux';
import {Theme, dark_theme, light_theme} from '../theme/colors';

interface UserContextType {
  theme: Theme;
  setTheme: Dispatch<Theme>;
  deviceToken: string;
  setDeviceToken: Dispatch<string>;
}

export const UserContext = createContext<UserContextType>(
  {} as UserContextType,
);

const UserProvider = ({children}: {children: React.ReactNode}) => {
  const navigation = useNavigation();
  const [theme, setTheme] = useState<Theme>(light_theme);
  const [deviceToken, setDeviceToken] = useState('');

  const app_theme = useSelector((state: any) => state.theme.app_theme);

  useLayoutEffect(() => {
    if (app_theme === 'light') {
      setTheme(light_theme);
    } else {
      setTheme(dark_theme);
    }
  }, [app_theme]);

  return (
    <UserContext.Provider
      value={{deviceToken, setDeviceToken, theme, setTheme}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
export default UserProvider;

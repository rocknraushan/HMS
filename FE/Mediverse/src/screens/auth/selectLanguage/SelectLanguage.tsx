import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import SWrapper from '../../../components/wrappers/SWrapper';
import NHeading from '../../../components/headers/NHeading';
import {rspH, rspW} from '../../../theme/responsive';
import styles from './styles';
import LangComp, {LanguageType} from './LangComp';
import StyledButton from '../../../components/buttons/StyledButton';
import translate from '../../../localisation/localize';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../navigation/navStrings';
import Storage from '../../../storage/Storage';
import {useAtomValue, useSetAtom} from 'jotai';
import {
  profileDataAtom,
  userDataAtom,
  userTypeAtom,
} from '../../../store/atoms';
import {getUserProfile} from '../../../Services/Signup';

const languages: LanguageType[] = [
  {
    title: 'English',
    symbol: 'En',
    code: 'en-US',
    regionalTitle: '',
    color: '#D7E8FC',
  },
  {
    title: 'Hindi',
    symbol: 'हि',
    code: 'hi',
    regionalTitle: 'हिन्दी',
    color: '#FFCADA',
  },
  {
    title: 'Assamese',
    symbol: 'অ',
    code: 'as',
    regionalTitle: 'অসমীয়া',
    color: '#F4EFD2',
  },
  {
    title: 'Marathi',
    symbol: 'म',
    code: 'mr',
    regionalTitle: 'मराठी',
    color: '#E2C5F1',
  },
  {
    title: 'Bengali',
    symbol: 'বা',
    code: 'bn',
    regionalTitle: 'বাংলা',
    color: '#B2E6F3',
  },
  {
    title: 'Gujarati',
    symbol: 'ગ',
    code: 'gu',
    regionalTitle: 'ગુજરાતી',
    color: '#FFD3E4',
  },
  {
    title: 'Kannada',
    symbol: 'ಕ',
    code: 'kn',
    regionalTitle: 'ಕನ್ನಡ',
    color: '#F5BCCF',
  },
  {
    title: 'Malayalam',
    symbol: 'മ',
    code: 'ml',
    regionalTitle: 'മലയാളം',
    color: '#FCFEDC',
  },
  {
    title: 'Tamil',
    symbol: 'த',
    code: 'ta',
    regionalTitle: 'தமிழ்',
    color: '#69DEFF',
  },
  {
    title: 'Telugu',
    symbol: 'తె',
    code: 'te',
    regionalTitle: 'తెలుగు',

    color: '#FFD3E4',
  },
];
type SelectLanguageProps = NativeStackScreenProps<
  RootStackParamList,
  'SELECT_LANGUAGE'
>;

const SelectLanguage = ({route, navigation}: SelectLanguageProps) => {
  const [lang, setLang] = useState<string>('en');

  const user = useAtomValue(userDataAtom);

  const setUserData = useSetAtom(userDataAtom);
  const setProfileData = useSetAtom(profileDataAtom);
  const setUserType = useSetAtom(userTypeAtom);

  const getSelectedLanguage = useCallback(async () => {
    const langauge = await Storage.getLanguage();
    if (langauge) {
      setLang(langauge);
    }
  }, []);

  useEffect(() => {
    getSelectedLanguage();
  }, []);

  const getUser = useCallback(async () => {
    try {
      const user = await Storage.getUserData();
      if (user) {
        const result = await getUserProfile(user.id);
        setUserData(result.data.user);
        Storage.setUserData(result.data.user);
        setUserType(result.data.user.user_type);
        setProfileData(result.data);
      }
    } catch (e: any) {
      console.error('USERPROFILE', e);
    }
  }, []);

  const onSubmit = useCallback(async () => {
    Storage.setLanguage(lang);
    translate.setLanguage(lang);
    await getUser();

    if (user) {
      let screen: keyof RootStackParamList = 'HOME';
      if (!user.is_gstRegistrationPage) {
        screen = 'GST_REGISTRATION';
      } else if (!user.is_selectCategoriesPage) {
        screen = 'SELECT_CATEGORIES';
      } else if (!user.is_establishPhotosPage) {
        screen = 'ESTABLISHMENT_PHOTOS';
      } else {
        screen = 'HOME';
      }
      if (navigation.canGoBack()) {
        navigation.goBack();
      } else if (
        screen === 'SELECT_CATEGORIES' ||
        screen === 'ESTABLISHMENT_PHOTOS'
      ) {
        navigation.replace(screen, {
          hideBack: true,
        });
      } else {
        navigation.replace(screen);
      }
    }
  }, [lang, user]);

  const back = useMemo(() => {
    return navigation.canGoBack();
  }, [navigation]);

  return (
    <SWrapper padHor={0}>
      <View style={{marginTop: rspH(20), paddingHorizontal: rspW(16)}}>
        <NHeading heading="Select preferred language" />
      </View>

      <FlatList
        data={languages}
        keyExtractor={item => item.code}
        renderItem={({item, index}) => {
          return (
            <LangComp
              item={item}
              index={index}
              selectedLanguage={lang}
              onSelectLanguage={setLang}
            />
          );
        }}
        numColumns={2}
        contentContainerStyle={{gap: 8}}
        columnWrapperStyle={{gap: 8}}
        ListFooterComponent={() => {
          return (
            <View
              style={{
                margin: rspW(16),
              }}>
              <StyledButton
                fullWidth
                onPress={onSubmit}
                label={back ? 'Save' : 'Continue'}
              />
            </View>
          );
        }}
      />
    </SWrapper>
  );
};

export default SelectLanguage;

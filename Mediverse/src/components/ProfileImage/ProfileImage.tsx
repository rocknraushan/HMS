import React, {useMemo} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useUser} from '../../context/user';
import {Theme} from '../../theme/colors';
import {BASE_URL} from '../../HttpService/AxiosClient';
import VectorIcons, {IconSets} from '../Icons/VectorIcons';
import {rspW} from '../../theme/responsive';

interface Props {
  url?: string;
  onPressProfile?: () => void;
  disbled?: boolean;
  size?: number
}

const ProfileImage = ({url, disbled, onPressProfile,size = 50}: Props) => {
  const {theme} = useUser();
  const styles = style(theme,size);

  const profileImage = useMemo(() => {
    if (url) return BASE_URL + url;
    return undefined;
  }, [url]);

  return (
    <TouchableOpacity onPress={onPressProfile} disabled={disbled}>
      {profileImage ? (
        <Image source={{uri: profileImage}} style={styles.profileImage} />
      ) : (
        <View
          style={[
            styles.profileImage,
            {
              backgroundColor: theme.black,
              justifyContent: 'center',
              alignItems: 'center',
              overflow: 'hidden',
            },
          ]}>
          <VectorIcons
            iconSet={IconSets.Entypo}
            name="user"
            size={rspW(size-10)}
            color={theme.grey}
            style={{
              alignSelf: 'center',
            }}
          />
        </View>
      )}
    </TouchableOpacity>
  );
};
const style = (theme: Theme,size: number) =>
  StyleSheet.create({
    container: {},

    profileImage: {
      width: rspW(size),
      height: rspW(size),
      borderRadius: rspW(50),
    },
  });

export default ProfileImage;

import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, InteractionManager, Pressable, ImageBackground } from 'react-native';
import IconWithTextRow from './components/IconWithTextRow';
import { BellIcon, EditIcon, EditProfileIcon, HeartIcon, HelpIcon, LogoutIcon, SettingsIcon, TermsIcon } from '../../../assets/icons/svg/SvgIcons';
import { Icons } from '../../../assets/icons';
import { CommonActions, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../navigation/navStrings';
import { fetchProfile, updateProfilePic } from '../../profile/ProfileFunctions';
import FastImage from 'react-native-fast-image';
import Kechain from 'react-native-keychain';
import LogoutBottomSheet from './components/LogoutBottomSheet';
import ProfilePicUploader from '../../profile/components/ProfilePicUploader';
import StorageProvider from '../../../storage/Storage';
import FullScreenImageViewer from '../../../components/ImageViewer/FullScreenImageViewer';

interface Props {
  navigation: NavigationProp<RootStackParamList, "ProfileScreen">;
}
const ProfileScreen = ({ navigation }: Props) => {
  const [profileData, setProfileData] = useState<any>(undefined)
  const [showLogout, setShowLogout] = useState(false);
  const [showFullImage, setshowFullImage] = useState(false);
  const handleNavigation = (screen: keyof RootStackParamList) => {
    navigation.navigate(screen as any); // Adjust the type as per your navigation setup
  }

  const getProfileData = async () => {
    // Fetch profile data from API or local storage
    try {
      const userData = await fetchProfile();
      setProfileData(userData.profile);
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  }

  const logout = () => {
    // Handle logout logic here
    Kechain.resetGenericPassword()
      .then(async () => {
        console.log('Credentials reset successfully!');

        await StorageProvider.clearStorage();
        InteractionManager.runAfterInteractions(() => {
          navigation.dispatch(CommonActions.reset({
            index: 0,
            routes: [{ name: 'LOGIN' }]
          }));
        });
      })
      .catch((error) => {
        console.log('Error resetting credentials:', error);
      });
  };

  React.useEffect(() => {
    getProfileData();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={styles.container} style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Profile</Text>

        {/* <TouchableOpacity style={styles.avatarContainer}>
          <FastImage
            source={(typeof profileData?.profilePic) == 'string' ? { uri: profileData?.profilePic } : profileData?.socialData?.photo ? {uri:profileData?.socialData?.photo}: Icons.userIcon} // replace with your image
            style={styles.avatar}
          />
          <Pressable style={styles.editIconContainer}>
            <EditIcon />
          </Pressable>
        </TouchableOpacity> */}
        <FastImage
          source={profileData?.coverImage ? { uri: profileData?.coverImage } : Icons.coverImage}
          style={{ width: '100%', height: 200, borderRadius: 10,position:"absolute",marginTop:80}}
          resizeMode='cover'
        />

        <ProfilePicUploader
        style={{ marginTop: 100,backgroundColor:"#fff",borderRadius:1000 }}
          onSelect={(e) => updateProfilePic(e)}
          image={profileData?.profilePic}
          onImgPress={() => {
            setshowFullImage(true);
          }}
        />

        <Text style={styles.name}>{profileData?.name}</Text>
        <Text style={styles.phone}>{profileData?.phone}</Text>

        <View style={styles.listContainer}>
          <IconWithTextRow icon={<EditProfileIcon />} label="Edit Profile" onPress={() => handleNavigation("UserProfileForm")} />
          <IconWithTextRow icon={<HeartIcon />} label="Favorite" />
          <IconWithTextRow icon={<BellIcon />} label="Notifications" />
          <IconWithTextRow icon={<SettingsIcon />} label="Settings" />
          <IconWithTextRow icon={<TermsIcon />} label="Help and Support" />
          <IconWithTextRow icon={<HelpIcon />} label="Terms and Conditions" onPress={() => navigation.navigate('TermsScreen')} />
          <IconWithTextRow icon={<LogoutIcon />} label="Log Out" onPress={() => setShowLogout(true)} />
        </View>
      </ScrollView>
      <LogoutBottomSheet
        visible={showLogout}
        onClose={() => setShowLogout(false)}
        onConfirm={() => {
          logout();
          setShowLogout(false);
          // handle logout
        }}
      />
      <FullScreenImageViewer
        visible={showFullImage}
        onClose={() => setshowFullImage(false)}
        onEdit={(editedImg) => {
          console.log('Edited Image:', editedImg);
          // Save to backend or update local state
        }}
        image={profileData?.profilePic} // string or Buffer
        enableEdit={true}
      />

    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    alignItems: 'center',
    paddingBottom: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 20,
  },
  avatarContainer: {
    marginTop: 20,
    position: 'relative',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  editIconContainer: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    padding: 6,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 12,
  },
  phone: {
    fontSize: 14,
    color: '#888',
    marginBottom: 20,
  },
  listContainer: {
    width: '100%',
    marginTop: 10,
  },
});

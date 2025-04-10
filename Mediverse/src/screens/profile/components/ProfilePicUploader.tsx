import React, {useState, useCallback, useMemo, ChangeEvent} from 'react';
import {View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import VectorIcons, {IconSets} from '../../../components/Icons/VectorIcons';
import {Icons} from '../../../assets/icons';

interface Props {
  onSelect?: (e: {uri: string; type: string; name: string}) => void;
  image?: string;
}

const ProfilePicUploader: React.FC<Props> = ({image, onSelect}) => {
  const [imageUri, setImageUri] = useState<string | null>(image || null);

  const chooseImage = useCallback(() => {
    ImageCropPicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      mediaType: 'photo',
    })
      .then(image => {
        setImageUri(image.path);
        onSelect?.({
          uri: image.path,
          type: image.mime,
          name: image.filename || 'profile.jpg',
        });
      })
      .catch(error => console.log('ImagePicker Error:', error));
  }, []);

  // Memoize profile image to prevent unnecessary re-renders
  const profileImage = useMemo(() => {
    return imageUri ? {uri: imageUri} : Icons.userIcon;
  }, [imageUri]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={chooseImage} style={styles.profileContainer}>
        <Image source={profileImage ?? image} style={styles.profileImage} />
        <View style={styles.editIcon}>
          <VectorIcons
            name="edit"
            size={20}
            color="#fff"
            iconSet={IconSets.MaterialIcons}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileContainer: {
    position: 'relative',
    width: 170,
    aspectRatio: 1,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  editIcon: {
    position: 'absolute',
    bottom: 15,
    right: 5,
    backgroundColor: '#000',
    borderRadius: 10,
    padding: 5,
    borderBottomLeftRadius: 0,
  },
});

export default ProfilePicUploader;

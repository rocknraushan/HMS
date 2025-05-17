import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, StyleProp, ViewStyle } from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import VectorIcons, { IconSets } from '../../../components/Icons/VectorIcons';
import { Icons } from '../../../assets/icons';
import FastImage from 'react-native-fast-image';

export interface BufferImage {
  data: number[];
  type: 'Buffer';
}

interface Props {
  onSelect?: (e: { uri: string; type: string; name: string }) => void;
  image?: string | BufferImage;
  onImgPress?: () => void;
  style?: StyleProp<ViewStyle>;
  coverImage?:string;
  onCoverSelect?:(e: { uri: string; type: string; name: string }) => void;
  hasCoverImg?:boolean;
}

const isBuffer = (img: any): img is BufferImage =>
  img && typeof img === 'object' && img.type === 'Buffer' && Array.isArray(img.data);

const bufferToUrl = (buffer: BufferImage): string =>
  String.fromCharCode(...buffer.data);

const ProfilePicUploader: React.FC<Props> = ({ image,hasCoverImg, onSelect, onImgPress, style,coverImage,onCoverSelect }) => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [coverImageUri, setCoverImageUri] = useState<string| null>(null)
  useEffect(() => {
    if (isBuffer(image)) {
      setImageUri(bufferToUrl(image));
    } else if (typeof image === 'string') {
      setImageUri(image);
    } else {
      setImageUri(null);
    }
  }, [image]);

  useEffect(() => {
    if (isBuffer(coverImage)) {
      setCoverImageUri(bufferToUrl(coverImage));
    } else if (typeof coverImage === 'string') {
      setCoverImageUri(coverImage);
    } else {
      setCoverImageUri(null);
    }
  }, [coverImage]);

  const chooseImage = useCallback((isCover:boolean=false) => {
    ImageCropPicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      mediaType: 'photo',
    })
      .then(img => {
        if (isCover) {
          setCoverImageUri(img.path)
          onCoverSelect?.({
            uri: img.path,
            type: img.mime,
            name: img.filename || 'profile.jpg',
          })
        }
        else{
          setImageUri(img.path);
          onSelect?.({
            uri: img.path,
            type: img.mime,
            name: img.filename || 'profile.jpg',
          });
        }
      })
      .catch(error => console.log('ImagePicker Error:', error));
  }, [onSelect]);

  const profileImage = useMemo(() => {
    return imageUri ? { uri: imageUri } : Icons.userIcon;
  }, [imageUri]);

  const coverImg = useMemo(() => {
    return coverImageUri ? { uri: coverImageUri } : Icons.coverImage;
  }, [coverImageUri]);

  return (
    <View style={[styles.container, style]}>
      {
        hasCoverImg && (
      <TouchableOpacity onPress={()=>chooseImage(true)}
        style={{ width: '100%', height: 200,overflow:'hidden', borderRadius: 10, position: "absolute"}}
      >
        <FastImage
          style={{ width: "100%", height: "100%" }}
          source={coverImg}
          resizeMode='cover'
        />
      </TouchableOpacity>
        )
      }
      <TouchableOpacity onPress={onImgPress} style={[styles.profileContainer,{marginTop:hasCoverImg?80:0}]}>
        <Image source={profileImage} style={styles.profileImage} />
        <View style={styles.editIcon}>
          <TouchableWithoutFeedback onPress={()=>chooseImage()}>
            <VectorIcons
              name="edit"
              size={20}
              color="#fff"
              iconSet={IconSets.MaterialIcons}
            />
          </TouchableWithoutFeedback>

        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  profileContainer: {
    position: 'relative',
    width: 170,
    aspectRatio: 1,
    borderRadius:1000,
    backgroundColor:"#FBFBFB"

  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 100
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

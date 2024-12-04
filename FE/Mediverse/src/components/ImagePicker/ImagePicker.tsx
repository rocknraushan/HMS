import React, {useCallback, useMemo} from 'react';
import {
  Image,
  ImageStyle,
  Platform,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {useUser} from '../../context/user';
import {Theme} from '../../theme/colors';
import {rspF, rspW} from '../../theme/responsive';
import VectorIcons, {IconSets} from '../Icons/VectorIcons';
// import PhotoEditor from 'react-native-photo-editor';
import ImagePickers, {Image as ImageType} from 'react-native-image-crop-picker';

interface ImagePickerProps {
  containerStyle?: StyleProp<ViewStyle>;
  title?: string;
  iconSize?: number;
  iconColor?: string;
  titleStyle?: StyleProp<TextStyle>;
  onSelect?: (image: ImageType) => void;
  value?: ImageType;
  url?: string;
  imageStyle?: StyleProp<ImageStyle>;
  disabled?: boolean;
  isImage?: boolean;
}

const ImagePicker = ({
  containerStyle,
  title,
  iconSize = 15,
  iconColor,
  titleStyle,
  onSelect,
  value,
  url,
  imageStyle,
  disabled,
  isImage = true,
}: ImagePickerProps) => {
  const {theme} = useUser();
  const styles = style(theme);

  const onPressImage = useCallback(async () => {
    // const imageData = await launchImageLibrary({
    //   selectionLimit: 1,
    //   mediaType: isImage ? 'photo' : 'video',
    // });
    const imageData = await ImagePickers.openPicker({
      mediaType: isImage ? 'photo' : 'video',
      cropping: isImage ? true : false,
    });

    onSelect?.({
      path: imageData.path ?? '',
      height: imageData.height ?? 0,
      width: imageData.width ?? 0,
      mime: imageData.mime ?? '',
      size: imageData.size ?? 0,
    });

    // console.log('IMAGE DATA', imageData);

    // if (imageData.assets) {
    //   if (isImage) {
    //     const uri = imageData.assets[0]?.uri;

    //     if (uri) {
    //       console.log("URI",uri);
    //       if(Platform.OS === 'ios')
    //     onSelect?.({
    //       path: imageData.assets[0].uri ?? '',
    //       height: imageData.assets[0].height ?? 0,
    //       width: imageData.assets[0].width ?? 0,
    //       mime: imageData.assets[0].type ?? '',
    //       size: imageData.assets[0].fileSize ?? 0,
    //     });
    //       ImagePickers.openCropper({
    //         path: uri,
    //         mediaType: 'photo',
    //         width: 300,
    //         height: 400,
    //       }).then(image => {

    //         onSelect?.(image);
    //       }).catch(e=>{
    //         console.error("ERROR",e);

    //       });
    //     }
    //   } else {
    //     onSelect?.({
    //       path: imageData.assets[0].uri ?? '',
    //       height: imageData.assets[0].height ?? 0,
    //       width: imageData.assets[0].width ?? 0,
    //       mime: imageData.assets[0].type ?? '',
    //       size: imageData.assets[0].fileSize ?? 0,
    //     });
    //   }
    // }
  }, [onSelect, isImage]);

  const removePadding = useMemo(() => Boolean(url || value), [url, value]);

  return (
    <TouchableOpacity
      style={[
        styles.container,
        containerStyle,
        removePadding && {
          padding: 0,
        },
      ]}
      disabled={disabled}
      onPress={onPressImage}>
      {url || value ? (
        <>
          {isImage ? (
            <Image
              source={{uri: value ? value.path : url}}
              style={[styles.image, imageStyle]}
            />
          ) : (
            <></>
          )}
        </>
      ) : (
        <>
          <VectorIcons
            name="add"
            iconSet={IconSets.MaterialIcons}
            size={iconSize}
            color={iconColor ?? theme.grey}
          />
          <Text style={[styles.title, titleStyle]}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const style = (theme: Theme) =>
  StyleSheet.create({
    container: {
      width: 60,
      height: 60,
      borderWidth: 2,
      borderColor: theme.grey,
      borderRadius: 8,
      padding: rspW(12),
      alignItems: 'center',
      justifyContent: 'space-between',
      marginHorizontal: rspW(4),
    },
    image: {
      width: 56,
      height: 56,
      overflow: 'hidden',
      borderRadius: 8,
    },
    icon: {
      width: rspW(12),
      height: rspW(12),
    },
    title: {
      fontSize: rspF(12),
    },
  });
export default ImagePicker;

import React, { useEffect, useState, useCallback } from 'react';
import { View, Image, Modal, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import VectorIcons, { IconSets } from '../Icons/VectorIcons';
import { rspH } from '../../theme/responsive';

interface BufferImage {
  data: number[];
  type: 'Buffer';
}

interface Props {
  visible: boolean;
  onClose: () => void;
  onEdit?: (img: { uri: string; type: string; name: string }) => void;
  image: string | BufferImage;
  enableEdit?: boolean;
}

const isBuffer = (img: any): img is BufferImage =>
  img && typeof img === 'object' && img.type === 'Buffer' && Array.isArray(img.data);

const bufferToUrl = (buffer: BufferImage): string =>
  String.fromCharCode(...buffer.data);

const FullScreenImageViewer: React.FC<Props> = ({ visible, onClose, onEdit, image, enableEdit = true }) => {
  const [imageUri, setImageUri] = useState<string | null>(null);

  useEffect(() => {
    if (isBuffer(image)) {
      const uri = bufferToUrl(image);
      setImageUri(uri);
    } else if (typeof image === 'string') {
      setImageUri(image);
    } else {
      setImageUri(null);
    }
  }, [image]);

  const handleEdit = useCallback(() => {
    ImageCropPicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      mediaType: 'photo',
    })
      .then(img => {
        const edited = {
          uri: img.path,
          type: img.mime,
          name: img.filename || 'edited.jpg',
        };
        onEdit?.(edited);
        setImageUri(img.path);
      })
      .catch(error => {
        if (error.code !== 'E_PICKER_CANCELLED') {
          Alert.alert('Error', 'Image edit failed.');
          console.log('ImagePicker Error:', error);
        }
      });
  }, [onEdit]);

  return (
    <Modal  visible={visible} transparent={true} animationType="fade">
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose}>
            <VectorIcons name="arrow-back" size={24} color="#fff" iconSet={IconSets.MaterialIcons} />
          </TouchableOpacity>

          {enableEdit && (
            <TouchableOpacity onPress={handleEdit}>
              <VectorIcons name="edit" size={24} color="#fff" iconSet={IconSets.MaterialIcons} />
            </TouchableOpacity>
          )}
        </View>

        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.fullImage} resizeMode="contain" />
        ) : null}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.6)',
    marginTop:rspH(10)
  },
  fullImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

export default FullScreenImageViewer;

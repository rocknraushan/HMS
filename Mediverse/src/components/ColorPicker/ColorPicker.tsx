import React, {useCallback, useEffect, useState} from 'react';
import {
  Modal,
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from 'react-native';
import {useUser} from '../../context/user';
import {Theme} from '../../theme/colors';
import ColorPickers from 'react-native-wheel-color-picker';
import VectorIcons, {IconSets} from '../Icons/VectorIcons';
import {rspH, rspW} from '../../theme/responsive';
import StyledButton from '../buttons/StyledButton';

interface Props {
  show: boolean;
  onPressClose: () => void;
  selectedColor?: string;
  onPressApply: (col: string) => void;
  field?: string;
}

const ColorPickerModal = ({
  onPressApply,
  onPressClose,
  selectedColor,
  show,
  field,
}: Props) => {
  const {theme} = useUser();
  const styles = style(theme);

  console.log('SELECTED COLOR', selectedColor, field);

  const [color, setColor] = useState<string | undefined>();

  useEffect(() => {
    console.log('useEffect', selectedColor);

    setColor(selectedColor);
  }, [selectedColor]);

  const onColorChange = (col: string) => {
    console.log('onColorChange', col);

    setColor(col);
  };
  const onColorChangeComplete = (col: string) => {
    console.log('onColorChangeComplete', col);

    setColor(col);
  };

  const onClose = useCallback(() => {
    onPressClose();
  }, []);

  const onApply = useCallback(() => {
    if (color) onPressApply(color);
    console.log('color', color);
  }, [color, onPressApply]);

  return (
    <View style={styles.container}>
      {show && (
        <Modal visible={show}>
          <View style={styles.modal}>
            <View style={styles.header}>
              <TouchableOpacity style={styles.closeContainer} onPress={onClose}>
                <VectorIcons
                  color={theme.black}
                  iconSet={IconSets.MaterialCommunityIcons}
                  name="close"
                  size={rspW(25)}
                />
              </TouchableOpacity>
            </View>
            {/* <Text>{color}</Text> */}

            <ColorPickers
              color={color}
              swatchesOnly={false}
              onColorChange={onColorChange}
              thumbSize={40}
              sliderSize={40}
              noSnap={true}
              row={false}
              onColorChangeComplete={onColorChange}
              useNativeLayout
              // swatches={false}
              // sliderHidden
            />
            <StyledButton
              label="Submit"
              onPress={onApply}
              fullWidth
              containerStyle={{
                marginTop: rspH(24),
              }}
            />
          </View>
        </Modal>
      )}
    </View>
  );
};
const style = (theme: Theme) =>
  StyleSheet.create({
    container: {},
    modal: {
      flex: 1,
      padding: rspW(24),
    },
    header: {
      alignItems: 'flex-end',
    },
    closeContainer: {
      padding: rspW(10),
    },
  });

export default ColorPickerModal;

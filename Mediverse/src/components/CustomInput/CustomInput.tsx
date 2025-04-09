import React, { memo, ReactNode, useState } from 'react';
import { TextInput, StyleSheet, View, Text, StyleProp, TextStyle, ViewStyle, Image, TextInputProps, Pressable } from 'react-native';
import colors from '../../theme/colors'
import { Icons } from '../../assets/icons';
import Animated, { FadeIn, FadeOut, SlideInUp } from 'react-native-reanimated';

interface CustomInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  error?: any;
  inputStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  extra?: TextInputProps;
  isPassword?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  onActionPress?: () => void;
}

const CustomInput: React.FC<CustomInputProps> = ({
  value,
  onChangeText,
  placeholder,
  error,
  inputStyle,
  containerStyle,
  extra,
  isPassword,
  leftIcon,
  rightIcon,
  onActionPress
}) => {
  const [hide, setHide] = useState(true);
  return (
    <Animated.View style={[styles.containor, containerStyle]}>
      <View style={[styles.inputWraper, error && styles.errorInput]}>
        {leftIcon}
        <TextInput
          style={[styles.input, inputStyle]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#999"
          multiline={false}
          {
          ...extra
          }
          secureTextEntry={isPassword && hide}
        />
        {isPassword &&
          <Pressable hitSlop={10} style={{ alignItems: 'center', justifyContent: "center" }} onPress={() => setHide(!hide)}>
            <Image source={!hide ? Icons.eyeOpenIcon : Icons.eyeCloseIcon} style={{ tintColor: "#9CA3AF", width: 20, height: 20, resizeMode: "cover", marginEnd: 8 }} />
          </Pressable>}
          {rightIcon &&  <Pressable hitSlop={10} style={{ alignItems: 'center', justifyContent: "center" }} onPress={onActionPress}>
            {rightIcon}
          </Pressable>}
      </View>
      {error && <Animated.Text entering={FadeIn} exiting={FadeOut} style={styles.errorText}>{error}</Animated.Text>}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  containor: {
    width: '100%',
    marginBottom: 8
  },
  inputWraper: {
    height: 50,
    borderColor: '#9CA3AF',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    fontSize: 16,
    backgroundColor: '#fff',
    width: '100%',
    flexDirection: "row",
    alignItems: "center"
  },
  input: {
    flex: 1,
    color: '#9CA3AF',
  },
  errorInput: {
    borderColor: colors.deepPink,
  },
  errorText: {
    color: colors.deepPink,
    fontSize: 12,
    marginTop: 5,
    marginStart: 10
  },
});

export default memo(CustomInput);

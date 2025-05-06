import React, { useState } from 'react'
import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import CustomInput from '../CustomInput/CustomInput'
import VectorIcons, { IconSets } from '../Icons/VectorIcons'
import RNDateTimePicker, { BaseProps } from '@react-native-community/datetimepicker'
import moment from 'moment'

type Props = {
  onDateChange?: (date: string) => void;
  value: string;
  handleChange: (value: string) => void;
  error?: any;
  mode?: 'date' | 'time' | 'datetime' | undefined;
  is24Hour?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  extra?: BaseProps;
  placeholder?: string;
  disabled?: boolean;
  format?: string;
}

const CustomDatePicker: React.FC<Props> = ({ handleChange,disabled,placeholder, onDateChange, extra, value, containerStyle, error, is24Hour, mode,format="DD/MM/YYYY hh:mm" }) => {
  const [showDatePicker, setShowDatePicker] = useState(false)
  const handleDobChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || new Date();
    onDateChange?.(currentDate.toLocaleDateString())
    setShowDatePicker(false);
        handleChange(
          moment(selectedDate).format(format),
        );

        
  }
  return (
    <View style={[containerStyle]}>
      <Pressable disabled={disabled} onPress={() => setShowDatePicker(true)}>
        <CustomInput
          placeholder={placeholder || 'Select Date'}
          value={value}
          onChangeText={handleChange}
          error={error}
          extra={{
            keyboardType: 'numeric',
            inputMode: 'numeric',
            editable: false,
          }}
          leftIcon={
            mode === 'date' ? (
              <VectorIcons
                name="calendar"
                size={20}
                color="#9CA3AF"
                iconSet={IconSets.MaterialCommunityIcons}
              />
            ) : (
              <VectorIcons
                name="clock-time-four-outline"
                size={20}
                color="#9CA3AF"
                iconSet={IconSets.MaterialCommunityIcons}
              />
            )
          }
        />
      </Pressable>
      {showDatePicker && (
        <RNDateTimePicker
          testID="dateTimePicker"
          value={new Date()}
          mode={mode || 'date'}
          is24Hour={is24Hour || true}
          // minimumDate={new Date()}

          maximumDate={
            new Date(new Date().setFullYear(new Date().getFullYear() - 18))
          }
          onTouchCancel={() => setShowDatePicker(false)}
          onTouchEnd={() => setShowDatePicker(false)}
          themeVariant="light"
          display="default"
          onChange={handleDobChange}
          timeZoneName='GMT+5:30'
          {...extra}
        />
      )}
    </View>
  )
}

export default React.memo(CustomDatePicker)

const styles = StyleSheet.create({
  fieldMargin: {
    marginTop: 20,
  }
})
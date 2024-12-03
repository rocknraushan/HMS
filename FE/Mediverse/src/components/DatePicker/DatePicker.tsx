import React, {useCallback, useState} from 'react';
import {StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle} from 'react-native';
import {useUser} from '../../context/user';
import {Theme} from '../../theme/colors';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import VectorIcons, {IconSets} from '../Icons/VectorIcons';
import {rspF} from '../../theme/responsive';

interface Props {
  date?: Date;
  onDateChanged?: (date: Date) => void;
  containerStyle?: StyleProp<ViewStyle>;
  maxDate?: Date;
  minDate?: Date;
}

const StyledDatePicker = ({date, onDateChanged,containerStyle,maxDate,minDate}: Props) => {
  const {theme} = useUser();
  const styles = style(theme);

  const [show, setShow] = useState<boolean>(false);

  const onChangeDate = useCallback(
    (dt?: Date) => {
      if (dt) {
        console.log('DATE', dt);
        onDateChanged?.(dt);
      }
      setShow(false);
    },
    [onDateChanged],
  );


  console.log('DATE', date);

  return (
    <View style={[styles.container,containerStyle]}>
      <TouchableOpacity
        style={styles.dateContainer}
        onPress={() => setShow(true)}>
        <Text style={styles.date}>{moment(date).format('DD/MM/YYYY')}</Text>
        <VectorIcons
          iconSet={IconSets.AntDesign}
          name="calendar"
          color={theme.black}
          size={20}
        />
      </TouchableOpacity>
      <DatePicker
        modal
        open={show}
        mode="date"
        date={date ? date : new Date()}
        onConfirm={onChangeDate}
        maximumDate={maxDate}
        minimumDate={minDate}
        onCancel={() => {
          setShow(false);
        }}
      />
    </View>
  );
};
const style = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
    },
    dateContainer: {
      borderRadius: 4,
      backgroundColor: theme.lightBlue,
      padding: 8,
      flexDirection: 'row',
      alignItems: 'center',
    },
    date: {
      fontSize: rspF(16),
      color: theme.black,
      marginEnd: 4,
    },
  });

export default StyledDatePicker;

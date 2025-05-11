import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Calendar} from 'react-native-calendars';
import {rspF, rspH, rspW, safe_top} from '../../../../theme/responsive';
import {useNavigation} from '@react-navigation/native';

const TIME_SLOTS = [
  '09.00 AM', '09.30 AM', '10.00 AM',
  '10.30 AM', '11.00 AM', '11.30 AM',
  '03.00 PM', '03.30 PM', '04.00 PM',
  '04.30 PM', '05.00 PM', '05.30 PM',
];

const BookAppointmentScreen = () => {
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedTime, setSelectedTime] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={rspF(22)} color="#1C274C" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Book Appointment</Text>
        <View style={{width: rspW(22)}} /> 
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Date Selector */}
        <Text style={styles.sectionTitle}>Select Date</Text>
        <View style={styles.calendarWrapper}>
          <Calendar
            onDayPress={(day: { dateString: React.SetStateAction<string>; }) => setSelectedDate(day.dateString)}
            markedDates={{
              [selectedDate]: {selected: true, selectedColor: '#1C274C'},
            }}
            theme={{
              textDayFontSize: rspF(14),
              textMonthFontWeight: 'bold',
              textDayHeaderFontSize: rspF(12),
              selectedDayTextColor: '#fff',
              todayTextColor: '#1C274C',
              arrowColor: '#1C274C',
            }}
            style={styles.calendar}
          />
        </View>

        {/* Time Selector */}
        <Text style={[styles.sectionTitle, {marginTop: rspH(20)}]}>Select Hour</Text>
        <View style={styles.timeGrid}>
          {TIME_SLOTS.map(slot => (
            <TouchableOpacity
              key={slot}
              style={[
                styles.timeSlot,
                selectedTime === slot && styles.selectedTimeSlot,
              ]}
              onPress={() => setSelectedTime(slot)}>
              <Text
                style={[
                  styles.timeSlotText,
                  selectedTime === slot && styles.selectedTimeSlotText,
                ]}>
                {slot}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Confirm Button */}
      <TouchableOpacity style={styles.confirmBtn}>
        <Text style={styles.confirmBtnText}>Confirm</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BookAppointmentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical:rspH(16),
  },
  header: {
    marginTop: (safe_top ?? 0) + rspH(8) || rspH(16),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: rspW(16),
    paddingBottom: rspH(12),
  },
  headerTitle: {
    fontSize: rspF(18),
    fontWeight: 'bold',
    color: '#1C274C',
  },
  content: {
    paddingHorizontal: rspW(16),
    paddingBottom: rspH(20),
  },
  sectionTitle: {
    fontSize: rspF(16),
    fontWeight: '600',
    color: '#1C274C',
    marginBottom: rspH(10),
  },
  calendarWrapper: {
    borderRadius: rspW(16),
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: {width: 0, height: 2},
    overflow: 'hidden',
  },
  calendar: {
    borderRadius: rspW(16),
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: rspW(10),
  },
  timeSlot: {
    width: '30%',
    marginBottom: rspH(10),
    paddingVertical: rspH(10),
    backgroundColor: '#F1F4F9',
    borderRadius: rspW(12),
    alignItems: 'center',
  },
  selectedTimeSlot: {
    backgroundColor: '#1C274C',
  },
  timeSlotText: {
    color: '#1C274C',
    fontSize: rspF(14),
  },
  selectedTimeSlotText: {
    color: '#fff',
    fontWeight: '600',
  },
  confirmBtn: {
    marginHorizontal: rspW(16),
    marginBottom: rspH(20),
    backgroundColor: '#1C274C',
    borderRadius: rspW(16),
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: rspH(14),
  },
  confirmBtnText: {
    color: '#fff',
    fontSize: rspF(16),
    fontWeight: '600',
  },
});

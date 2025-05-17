import React, { memo } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const BookAppointmentButton=({onPress}:{onPress:()=>void})=> {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.text}>Book Appointment</Text>
    </TouchableOpacity>
  );
}

export default memo(BookAppointmentButton)

const styles = StyleSheet.create({
  button: {
    marginTop: 24,
    padding: 16,
    backgroundColor: '#1e293b',
    borderRadius: 100,
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

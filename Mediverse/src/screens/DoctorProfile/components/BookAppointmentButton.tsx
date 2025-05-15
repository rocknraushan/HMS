import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function BookAppointmentButton() {
  return (
    <TouchableOpacity style={styles.button}>
      <Text style={styles.text}>Book Appointment</Text>
    </TouchableOpacity>
  );
}

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

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  time: string;
}

export default function WorkingTime({ time }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Working Time</Text>
      <Text style={styles.time}>{time}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 16 },
  heading: { fontWeight: 'bold', fontSize: 16 },
  time: { color: 'gray', marginTop: 4 },
});

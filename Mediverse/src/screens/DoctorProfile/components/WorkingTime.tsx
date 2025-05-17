import moment from 'moment';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  time: {start:string,end:string};
}

export default function WorkingTime({ time }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Working Time</Text>
      <Text style={styles.time}>Monday - Friday {moment(time.start, 'HH:mm').format('hh:mm A')+"-"+moment(time.end, 'HH:mm').format('hh:mm A')}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 16 },
  heading: { fontWeight: 'bold', fontSize: 16 },
  time: { color: 'gray', marginTop: 4 },
});

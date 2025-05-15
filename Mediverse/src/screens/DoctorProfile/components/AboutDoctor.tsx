import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  about: string;
}

export default function AboutDoctor({ about }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>About me</Text>
      <Text style={styles.text}>{about}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 16 },
  heading: { fontWeight: 'bold', fontSize: 16 },
  text: { color: 'gray', marginTop: 4 },
});

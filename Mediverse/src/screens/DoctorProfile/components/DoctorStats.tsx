import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface StatItemProps {
  label: string;
  value: string;
}

const StatItem = ({ label, value }: StatItemProps) => (
  <View style={styles.statItem}>
    <Text style={styles.value}>{value}</Text>
    <Text style={styles.label}>{label}</Text>
  </View>
);

export default function DoctorStats() {
  return (
    <View style={styles.container}>
      <StatItem label="patients" value="2,000+" />
      <StatItem label="experience" value="10+" />
      <StatItem label="rating" value="5" />
      <StatItem label="reviews" value="1,872" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  value: {
    fontWeight: 'bold',
  },
  label: {
    fontSize: 12,
    color: 'gray',
  },
});

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  title: string;
}

const SectionHeader: React.FC<Props> = ({ title }) => (
  <View style={styles.container}>
    <Text style={styles.text}>{title}</Text>
    <Text style={styles.markText}>Mark all as read</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  text: { fontSize: 14, fontWeight: '600', color: '#555' },
  markText: { fontSize: 12, color: '#888' },
});

export default SectionHeader;

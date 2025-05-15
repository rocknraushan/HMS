import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Doctor } from '../types';

interface Props {
  doctor: Doctor;
}

export default function DoctorCard({ doctor }: Props) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: doctor.image }} style={styles.image} />
      <View>
        <Text style={styles.name}>{doctor.name}</Text>
        <Text style={styles.specialization}>{doctor.specialization}</Text>
        <Text style={styles.hospital}>{doctor.hospital}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 16,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  specialization: {
    color: 'gray',
  },
  hospital: {
    color: 'gray',
    fontSize: 12,
  },
});

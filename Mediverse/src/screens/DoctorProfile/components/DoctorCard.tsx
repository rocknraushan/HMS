import React from 'react';
import { View, Text, Image, StyleSheet, ImageBackground } from 'react-native';
import { Doctor } from '../types';
import { Icons } from '../../../assets/icons';

interface Props {
  doctor: any;
}

export default function DoctorCard({ doctor }: Props) {
  console.log("cove image::",doctor)
  return (
    <ImageBackground source={doctor?.coverImage ? {uri:doctor.coverImage}:Icons.coverImage}
    style={{width:'100%',height:200,justifyContent:"flex-end"}}>
      
    <View style={styles.card}>
      <Image source={{ uri: doctor.user?.profilePic }} style={styles.image} />
      <View>
        <Text style={styles.name}>{doctor.user?.name}</Text>
        <Text style={styles.specialization}>{doctor.specialization}</Text>
        <Text style={styles.hospital}>{doctor.clinicName}</Text>
      </View>
    </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.5)',
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
    color:"#fff"
  },
  specialization: {
    color: '#fff',
  },
  hospital: {
    color: '#fff',
    fontSize: 12,
  },
});

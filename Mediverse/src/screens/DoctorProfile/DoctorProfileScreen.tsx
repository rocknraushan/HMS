import React from 'react';
import { ScrollView, View, StyleSheet, SafeAreaView } from 'react-native';
import DoctorCard from './components/DoctorCard';
import DoctorStats from './components/DoctorStats';
import AboutDoctor from './components/AboutDoctor';
import WorkingTime from './components/WorkingTime';
import Reviews from './components/Reviews';
import BookAppointmentButton from './components/BookAppointmentButton';
import { Doctor, Review } from './types';

const doctor: Doctor = {
  name: 'Dr. David Patel',
  specialization: 'Cardiologist',
  hospital: 'Golden Cardiology Center',
  image: 'https://i.imgur.com/0y8Ftya.png',
  patients: '2,000+',
  experience: '10+',
  rating: 5,
  reviewsCount: '1,872',
  about:
    'Dr. David Patel, a dedicated cardiologist, brings a wealth of experience to Golden Gate Cardiology Center in Golden Gate, CA.',
  workingTime: 'Monday-Friday, 08.00 AM - 18.00 PM',
};

const review: Review = {
  userName: 'Emily Anderson',
  rating: 5,
  comment:
    'Dr. Patel is a true professional who genuinely cares about his patients. I highly recommend Dr. Patel to everyone.',
  avatar: 'https://i.pravatar.cc/150?img=3',
};

export default function DoctorProfileScreen() {
  return (
    <View style={{flex:1}}>
        <SafeAreaView>

    <ScrollView style={styles.container} contentContainerStyle={{ padding: 16 }}>
      <DoctorCard doctor={doctor} />
      <DoctorStats />
      <AboutDoctor about={doctor.about} />
      <WorkingTime time={doctor.workingTime} />
      <Reviews review={review} />
      <BookAppointmentButton />
    </ScrollView>
        </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9fafb',
    flex: 1,
  },
});

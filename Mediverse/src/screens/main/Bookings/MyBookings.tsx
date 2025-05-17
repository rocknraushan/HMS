import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native';
import { img_1, img_2, img_3 } from '../../../assets';
import FastImage from 'react-native-fast-image';
import { rspH, rspW } from '../../../theme/responsive';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../navigation/navStrings';
import { getAppointments } from '../../../HttpService/apiCalls';

const BOOKINGS = [
  {
    id: '1',
    date: 'May 22, 2023',
    time: '10:00 AM',
    name: 'Dr. James Robinson',
    specialty: 'Orthopedic Surgery',
    hospital: 'Elite Ortho Clinic, USA',
    image: img_1,
  },
  {
    id: '2',
    date: 'June 14, 2023',
    time: '03:00 PM',
    name: 'Dr. Daniel Lee',
    specialty: 'Gastroenterologist',
    hospital: 'Digestive Institute, USA',
    image: img_2, // same dummy image
  },
  {
    id: '3',
    date: 'June 21, 2023',
    time: '10:00 AM',
    name: 'Dr. Emily Clark',
    specialty: 'Cardiologist',
    hospital: 'Heart Care Center, USA',
    image: img_3
  },
];
interface Props {
  navigation: NavigationProp<RootStackParamList, "MyBookings">;
}
const MyBookings = ({ navigation }: Props) => {
  const [tab, setTab] = useState<'Upcoming' | 'Completed' | 'Canceled'>('Upcoming');

  const getAppointment=()=>{
    try {
      const res = getAppointments()
      console.log(res,"response")
    } catch (error:any) {
      console.log(error.response.data.message)
    }
  }

  useEffect(() => {
    getAppointment();
  
    return () => {
      
    }
  }, [])
  


  return (
    <View style={styles.container}>

      <View style={styles.tabContainer}>
        {(['Upcoming', 'Completed', 'Canceled'] as ('Upcoming' | 'Completed' | 'Canceled')[]).map((t) => (
          <TouchableOpacity key={t} onPress={() => setTab(t)} style={[styles.tab, tab === t && styles.activeTab]}>
            <Text style={[styles.tabText, tab === t && styles.activeTabText]}>{t}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={BOOKINGS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => {navigation.navigate('DoctorDetail');}} key={item.id} style={styles.card}>
            <>
            <Text style={styles.date}>{item.date} - {item.time}</Text>
            <View style={styles.doctorRow}>
              <FastImage source={item.image} style={styles.doctorImage} resizeMode={FastImage.resizeMode.cover} />
              <View style={{ flex: 1 }}>
                <Text style={styles.doctorName}>{item.name}</Text>
                <Text style={styles.specialty}>{item.specialty}</Text>
                <Text style={styles.hospital}>{item.hospital}</Text>
              </View>
            </View>
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.cancelBtn}><Text style={styles.cancelText}>Cancel</Text></TouchableOpacity>
              <TouchableOpacity onPress={() => {navigation.navigate('BookAppointmentScreen');}} style={styles.rescheduleBtn}><Text style={styles.rescheduleText}>Reschedule</Text></TouchableOpacity>
            </View>
            </>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    alignSelf: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: '#1C2A3A',
  },
  tabText: {
    fontSize: 16,
    color: '#888',
  },
  activeTabText: {
    color: '#1C2A3A',
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    elevation: 1,
  },
  date: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    fontWeight: '500',
  },
  doctorRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  doctorImage: {
    width: rspW(90),
    height: rspH(90),
    borderRadius: 8,
    marginRight: 12,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  specialty: {
    fontSize: 14,
    color: '#555',
    marginTop: 2,
  },
  hospital: {
    fontSize: 13,
    color: '#888',
    marginTop: 2,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  cancelBtn: {
    flex: 1,
    backgroundColor: '#E0E0E0',
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 8,
    alignItems: 'center',
  },
  cancelText: {
    color: '#000',
    fontWeight: '600',
  },
  rescheduleBtn: {
    flex: 1,
    backgroundColor: '#1C2A3A',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  rescheduleText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default MyBookings;

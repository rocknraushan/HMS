import React from 'react';
import { ScrollView, View, StyleSheet, SafeAreaView, TouchableOpacity,Text } from 'react-native';
import DoctorCard from './components/DoctorCard';
import DoctorStats from './components/DoctorStats';
import AboutDoctor from './components/AboutDoctor';
import WorkingTime from './components/WorkingTime';
import Reviews from './components/Reviews';
import BookAppointmentButton from './components/BookAppointmentButton';
import { Doctor, Review } from './types';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/navStrings';
import VectorIcons, { IconSets } from '../../components/Icons/VectorIcons';

interface Props {
  navigation: NavigationProp<RootStackParamList, 'DoctorProfileScreen'>;
  route: RouteProp<RootStackParamList, "DoctorProfileScreen">;

}
export default function DoctorProfileScreen({ navigation, route }: Props) {
  const goBack=()=>{
    navigation.goBack();
  }
  const doctor = route.params.doctor_details;

  const bookAppointment = () => {
    // Implement booking logic here, for now just navigate or show an alert
    navigation.navigate('BookAppointmentScreen', { doctorId: doctor._id });
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={{flexDirection:'row',padding:16,width:'100%',marginTop:40,justifyContent:"space-between",alignItems:"center"}}>
          <TouchableOpacity hitSlop={30} onPress={goBack}>
            <VectorIcons name='arrowleft' iconSet={IconSets.AntDesign} size={30} color='#000'/>
          </TouchableOpacity>
          <Text style={{flex:1,fontSize:16,fontWeight:"bold",textAlign:'center'}}>Doctor Detail</Text>
          <VectorIcons name='hearto' iconSet={IconSets.AntDesign} size={30} color='#000'/>
        </View>
        <ScrollView style={{flexGrow:1}} contentContainerStyle={{ padding: 16 }}>
          <DoctorCard doctor={route.params.doctor_details} />
          <DoctorStats experienc={doctor.experience} rating={doctor.rating} reviews={doctor.reviews.length} totalPatients={"200+"} />
          <AboutDoctor about={doctor.bio} />
          <WorkingTime time={doctor.workingHours} />
          <Reviews id={doctor._id} />
        </ScrollView>
        <View style={{paddingHorizontal:16}}>
          <BookAppointmentButton onPress={bookAppointment} />
        </View>
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

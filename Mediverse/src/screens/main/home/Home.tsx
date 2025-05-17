import React, { useEffect } from 'react';
import { View, ScrollView, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import LocationHeader from './components/LocationHeader';
import SearchBar from './components/SearchBar';
import PromoBannerCarousel from './components/PromoBannerCarousel';
import CategoryGrid from './components/CategoryGrid';
import MedicalCenterCard from './components/MedicalCenterCard';
import { img_4, img_5 } from '../../../assets';
import { rspH } from '../../../theme/responsive';
import { apiCalls } from '../../../HttpService/apiCalls';
import { number } from 'yup';
import MedicalCenterCardSkeleton from '../../../components/SkeletonLoader/MedicalCenterCardSkeleton';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../navigation/navStrings';

const centers = [
  { title: 'Sunrise Health Clinic', image: img_4 },
  { title: 'Golden Cardiology', image: img_5 },
];

interface Props{
    navigation: NavigationProp<RootStackParamList, 'HOME'>;
}

const HomeScreen = ({navigation}:Props) => {
  const [nearbyCenters, setNearbyCenters] = React.useState<any[]>([]);
  const [currentLocation, setCurrentLocation] = React.useState<[number,number]>([0, 0]);
  
  const handleItemPress = (item:any)=>{
    navigation.navigate("DoctorProfileScreen",{doctor_details:item})
  }
  const getNearbyDoctorList = async (location: [number, number]) => {
    try {
      const response = await apiCalls.getNearbyDoctors(location);
      setNearbyCenters(response);
    } catch (error) {
      console.error('Error fetching nearby doctors:', error);
    }
  };
  
  useEffect(() => {
    getNearbyDoctorList(currentLocation);
  }, [currentLocation])
  

  return (
      <SafeAreaView style={{ marginTop: rspH(16),flex:1 ,backgroundColor:'#fff'}}>
      <LocationHeader setLocation={setCurrentLocation} />
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <SearchBar />
      <PromoBannerCarousel />
      <View style={{paddingHorizontal:16}} >
      <CategoryGrid />
      <View style={[styles.row,{marginBlock:10}]}>
        <Text style={styles.title}>Nearby Medical Centers</Text>
      </View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={nearbyCenters}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item,index})=><MedicalCenterCard item={item} onPress={handleItemPress}/>}
        contentContainerStyle={{ paddingRight: 16 }}
        ListEmptyComponent={MedicalCenterCardSkeleton}
      /> 
      </View>
    </ScrollView>
    </SafeAreaView>

  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flexGrow: 1,
    paddingBottom: rspH(16),
    paddingHorizontal:rspH(10)
  },
  row: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  seeAll: {
    fontSize: 13,
    color: '#3B82F6',
  },
});

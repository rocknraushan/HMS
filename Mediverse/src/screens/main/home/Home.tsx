import React from 'react';
import { View, ScrollView, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import LocationHeader from './components/LocationHeader';
import SearchBar from './components/SearchBar';
import PromoBannerCarousel from './components/PromoBannerCarousel';
import CategoryGrid from './components/CategoryGrid';
import MedicalCenterCard from './components/MedicalCenterCard';
import { img_4, img_5 } from '../../../assets';

const centers = [
  { title: 'Sunrise Health Clinic', image: img_4 },
  { title: 'Golden Cardiology', image: img_5 },
];

const HomeScreen = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <SafeAreaView style={{ paddingHorizontal: 16 }}>
      <LocationHeader />
      <SearchBar />
      </SafeAreaView>
      <PromoBannerCarousel />
      <View style={{paddingHorizontal:16}} >
      <CategoryGrid />
      <View style={styles.row}>
        <Text style={styles.title}>Nearby Medical Centers</Text>
        <Text style={styles.seeAll}>See All</Text>
      </View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={centers}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <MedicalCenterCard {...item} />}
        contentContainerStyle={{ paddingRight: 16 }}
      /> 
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    backgroundColor: '#fff',
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

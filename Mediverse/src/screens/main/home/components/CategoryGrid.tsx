import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { beaker, brain, heart, injection, liver, lungs, scope, tooth } from '../../../../assets';
import FastImage from 'react-native-fast-image';

interface CategoryItemProps {
  label: string;
  icon: any;
}

const categories: CategoryItemProps[] = [
  { label: 'Dentistry', icon: tooth},
  { label: 'Cardiology', icon: heart },
    { label: 'Neurology', icon: brain },
    { label: 'Pediatrics', icon: liver },
    { label: 'Psychiatry', icon: scope },
    { label: 'Radiology', icon: beaker },
    { label: 'Surgery', icon: lungs },
    {label:"Vaccination",icon:injection},
  // ... more categories
];

const CategoryGrid = React.memo(() => {
  const renderItem = (item: CategoryItemProps,index:number) => {
    return (
      <TouchableOpacity key={index} style={[styles.item]}>
        <FastImage source={item.icon} style={{width:75,height:75}}  />
        <Text style={styles.label}>{item.label}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Categories</Text>
        <Text style={styles.seeAll}>See All</Text>
      </View>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' }}>
      {
        categories.length > 0 && (
          categories.map(renderItem)
        ) 
      }
    </View>
    </View>
  );
});

export default CategoryGrid;

const styles = StyleSheet.create({
  headerRow: {
    marginTop: 24,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: { fontSize: 16, fontWeight: '600' },
  seeAll: { fontSize: 13, color: '#3B82F6' },
  item: {
    // flex: 1,
    alignItems: 'center',
    marginBottom: 16,
    borderRadius: 12,
    marginHorizontal: 8,
  },
  label: {
    fontSize: 12,
    marginTop: 4,
    textAlign: 'center',
  },
});

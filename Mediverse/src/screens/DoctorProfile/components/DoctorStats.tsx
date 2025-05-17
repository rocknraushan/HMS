import React, { memo, ReactNode } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BadgeIcon, MessageIcon, PeopleIcon, StarIcon } from '../../../assets/icons/svg/SvgIcons';

interface StatItemProps {
  label: string;
  value: string;
  icon?:ReactNode;
}

const StatItem = ({ label, value,icon}: StatItemProps) => (
  <View style={styles.statItem}>
    <View style={{backgroundColor:"rgba(243, 244, 246, 1)",padding:10,borderRadius:1000}}>
    {icon}
    </View>
    <Text style={styles.value}>{value}</Text>
    <Text style={styles.label}>{label}</Text>
  </View>
);
interface Props{
  totalPatients:string;
  experienc:number;
  rating:number;
  reviews:number
}

const  DoctorStats:React.FC<Props>=({experienc,rating,reviews,totalPatients})=> {
  return (
    <View style={styles.container}>
      <StatItem label="patients" value={totalPatients} icon={<PeopleIcon/>} />
      <StatItem label="experience" value={experienc.toString()+" Years"} icon={<BadgeIcon/>}/>
      <StatItem label="rating" value={rating.toString()} icon={<StarIcon/>} />
      <StatItem label="reviews" value={reviews.toString()} icon={<MessageIcon/>}/>
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
    textTransform:"capitalize",
    fontSize: 12,
    color: 'gray',
  },
});
export default memo(DoctorStats)
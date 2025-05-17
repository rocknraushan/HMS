import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { IAddress } from '../../../profile/components/ProfileVal';

export interface MedicalCenterCardProps {
  item:{
    _id:string;
    clinicAddress: IAddress;
    rating: number;
    reviewCount: number;
    distance: number;
    duration: string;
    user: {
      gender: string;
      phone: string;
      email: string;
      _id: string;
      name: string;
      profilePic: string;
    
    }
    isFavorite?: boolean;
  }
  onPressFavorite?: () => void;
  onPress:(item:any)=>void;
}

const MedicalCenterCard:React.FC<MedicalCenterCardProps> = ({item,onPress,onPressFavorite} ) => {
  const {
    clinicAddress,
    rating,
    reviewCount,
    distance,
    duration,
    isFavorite = false,
    _id,
    user
  } = item;
  const { name, profilePic } = user;
  const title = name || 'Medical Center';
  
  const handlepress =()=>{
    onPress(item)
  }
  return (
    <TouchableOpacity onPress={handlepress} style={styles.card}>
      {/* Clinic Image */}
      <Image source={{ uri: profilePic }} style={styles.image} />

      {/* Favorite Heart Icon */}
      <TouchableOpacity style={styles.heartIcon} onPress={onPressFavorite}>
        <Ionicons
          name={isFavorite ? 'heart' : 'heart-outline'}
          size={22}
          color="#fff"
        />
      </TouchableOpacity>

      {/* Details */}
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{title}</Text>

        <View style={styles.row}>
          <Ionicons name="location-sharp" size={16} color="#888" />
          <Text style={styles.clinicAddress}>{clinicAddress.line1+`, `+clinicAddress.line2+', '+clinicAddress.city}</Text>
        </View>

        <View style={styles.row}>
          <FontAwesome name="star" size={16} color="#f5a623" />
          <Text style={styles.rating}>{rating.toFixed(1)} </Text>
          <Text style={styles.reviewText}>({reviewCount} Reviews)</Text>
        </View>

        <View style={styles.rowSpaceBetween}>
          <View style={styles.row}>
            <MaterialIcons name="directions-walk" size={16} color="#666" />
            <Text style={styles.distance}>{(distance/1000)}KM</Text>
          </View>

          <View style={styles.row}>
            <MaterialIcons name="local-hospital" size={16} color="#666" />
            <Text style={styles.hospital}>Hospital</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MedicalCenterCard; // Pure component

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    margin: 10,
    width: 200,
  },
  image: {
    height: 150,
    width: '100%',
  },
  heartIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 20,
    padding: 6,
  },
  infoContainer: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  clinicAddress: {
    fontSize: 13,
    color: '#666',
    marginLeft: 4,
  },
  rating: {
    fontSize: 13,
    color: '#333',
    marginLeft: 4,
  },
  reviewText: {
    fontSize: 13,
    color: '#888',
    marginLeft: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  rowSpaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  distance: {
    fontSize: 13,
    color: '#666',
    marginLeft: 4,
  },
  hospital: {
    fontSize: 13,
    color: '#666',
    marginLeft: 4,
  },
});

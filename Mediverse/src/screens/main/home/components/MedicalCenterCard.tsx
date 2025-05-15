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

export interface MedicalCenterCardProps {
  item: {
    title: string;
    clinicAddress: string;
    rating: number;
    reviewCount: number;
    distance: string;
    duration: string;
    type: string;
    user: {
      gender: string;
      phone: string;
      email: string;
      _id: string;
      name: string;
      profilePic: string;
    },
    isFavorite?: boolean;
    onPressFavorite?: () => void;
  }
  index: number;
}

const MedicalCenterCard = ({ item, index }: any) => {
  console.log(item, "=======>item")
  const {
    clinicAddress,
    rating,
    reviewCount,
    distance,
    duration,
    type,
    isFavorite = false,
    onPressFavorite = () => { },
    user
  } = item;
  const { name, profilePic } = user;
  const title = name || 'Medical Center';
  return (
    <View style={styles.card}>
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
            <Text style={styles.distance}>{distance}/{duration}</Text>
          </View>

          <View style={styles.row}>
            <MaterialIcons name="local-hospital" size={16} color="#666" />
            <Text style={styles.hospital}>{type}</Text>
          </View>
        </View>
      </View>
    </View>
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
    width: 150,
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

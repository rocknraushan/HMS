import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {rspF, rspH, rspW, safe_top} from '../../../../theme/responsive';
import {useNavigation} from '@react-navigation/native';

const DoctorDetailHeader = () => {
  const navigation = useNavigation();
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={rspF(22)} color="#1C274C" />
      </TouchableOpacity>

      <Text style={styles.headerTitle}>Doctor Details</Text>

      <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)}>
        <Ionicons
          name={isFavorite ? 'heart' : 'heart-outline'}
          size={rspF(25)}
          color={isFavorite ? '#FF3B30' : '#1C274C'}
        />
      </TouchableOpacity>
    </View>
  );
};

export default DoctorDetailHeader;

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: safe_top || rspH(16),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: rspH(5),
  },
  headerTitle: {
    fontSize: rspF(18),
    fontWeight: 'bold',
    color: '#1C274C',
  },
});

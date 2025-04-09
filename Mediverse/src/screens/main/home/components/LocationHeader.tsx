import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const LocationHeader = React.memo(() => (
  <View style={styles.container}>
    <View>
      <Text style={styles.label}>Location</Text>
      <TouchableOpacity style={styles.locationRow}>
        <Text style={styles.location}>Seattle, USA</Text>
      </TouchableOpacity>
    </View>
    <TouchableOpacity>
      <Image
        source={{ uri: 'https://i.pravatar.cc/100' }}
        style={styles.avatar}
      />
      <View style={styles.badge} />
    </TouchableOpacity>
  </View>
));

export default LocationHeader;

const styles = StyleSheet.create({
  container: {
    paddingTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    color: '#6B7280',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  badge: {
    width: 10,
    height: 10,
    backgroundColor: 'red',
    borderRadius: 5,
    position: 'absolute',
    top: 2,
    right: 2,
  },
});

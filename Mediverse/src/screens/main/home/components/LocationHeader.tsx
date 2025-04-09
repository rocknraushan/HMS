import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { BellIcon, DownArrow, LocationIcon } from '../../../../assets/icons/svg/SvgIcons';
const LocationNotificationHeader = React.memo(() => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.label}>Location</Text>
        <TouchableOpacity style={styles.locationRow}>
          <LocationIcon />
          <Text style={styles.locationText}>Seattle, USA</Text>
          <DownArrow width={12} height={12} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.bellContainer}>
        <BellIcon />
        <View style={styles.redDot} />
      </TouchableOpacity>
    </View>
  );
});

export default LocationNotificationHeader;

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
    marginBottom: 2,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
    marginHorizontal: 4,
  },
  bellContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  redDot: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
  },
});

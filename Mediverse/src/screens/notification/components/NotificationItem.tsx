import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
  type: 'success' | 'cancel' | 'info';
  title: string;
  message: string;
  time: string;
}

const NotificationItem: React.FC<Props> = ({ type, title, message, time }) => {
  const iconMap = {
    success: { color: '#D1FADF', icon: 'checkmark-circle-outline' },
    cancel: { color: '#FEE4E2', icon: 'close-circle-outline' },
    info: { color: '#E0E0E0', icon: 'calendar-outline' },
  };

  const { color, icon } = iconMap[type];

  return (
    <View style={styles.wrapper}>
      <View style={[styles.iconContainer, { backgroundColor: color }]}>
        <Icon name={icon} size={20} color="#000" />
      </View>
      <View style={styles.textContainer}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.time}>{time}</Text>
        </View>
        <Text style={styles.message}>{message}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    padding: 12,
    paddingHorizontal: 16,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
  },
  time: {
    fontSize: 12,
    color: '#999',
  },
  message: {
    fontSize: 12,
    color: '#555',
    marginTop: 2,
  },
});

export default NotificationItem;

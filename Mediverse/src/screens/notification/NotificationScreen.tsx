import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, SectionList } from 'react-native';
import NotificationHeader from './components/NotificationHeader';
import SectionHeader from './components/SectionHeader';
import NotificationItem from './components/NotificationItem';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/navStrings';
import { Text } from 'react-native';
import { getNotification } from '../../HttpService/apiCalls';
interface Notification {
  id: string;
  type: 'success' | 'cancel' | 'info';
  title: string;
  message: string;
  time: string;
}

interface NotificationSection {
  title: string;
  data: Notification[];
}

const notifications: NotificationSection[] = [
  {
    title: 'TODAY',
    data: [
      {
        id: '1',
        type: 'success',
        title: 'Appointment Success',
        message: 'You have successfully booked your appointment with Dr. Emily Walker.',
        time: '1h',
      },
      {
        id: '2',
        type: 'cancel',
        title: 'Appointment Cancelled',
        message: 'You have successfully cancelled your appointment with Dr. David Patel.',
        time: '2h',
      },
      {
        id: '3',
        type: 'info',
        title: 'Scheduled Changed',
        message: 'You have successfully changes your appointment with Dr. Jesica Turner.',
        time: '8h',
      },
    ],
  },
  {
    title: 'YESTERDAY',
    data: [
      {
        id: '4',
        type: 'success',
        title: 'Appointment success',
        message: 'You have successfully booked your appointment with Dr. David Patel.',
        time: '1d',
      },
    ],
  },
];

interface Props{
    navigation:NavigationProp<RootStackParamList,"NotificationScreen">;
}
const NotificationScreen = ({navigation}:Props) => {
  const [notification, setNotification] = useState<any[]>([])
  const getNotificationData = async()=>{
    try {
      const response = await getNotification();
      setNotification(response)
    } catch (error) {
      
    }
  }
  useEffect(() => {
    getNotificationData()
  
    return () => {
      
    }
  }, [])
  
  return (
    <View style={styles.container}>
      <NotificationHeader />
      <SectionList
        sections={notifications}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <NotificationItem
            type={item.type}
            title={item.title}
            message={item.message}
            time={item.time}
          />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{title}</Text>
            <Text style={styles.markAll}>Mark all as read</Text>
          </View>
        )}
        stickySectionHeadersEnabled={false}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  list: {
    paddingBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 24,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
  },
  markAll: {
    fontSize: 12,
    color: '#888',
  },
});

export default NotificationScreen;
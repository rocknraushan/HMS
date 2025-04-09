import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface Props {
  title: string;
  image: any;
}

const MedicalCenterCard = React.memo(({ title, image }: Props) => (
  <View style={styles.card}>
    <Image source={image} style={styles.image} />
    <Text style={styles.title}>{title}</Text>
  </View>
));

export default MedicalCenterCard;

const styles = StyleSheet.create({
  card: {
    width: 160,
    marginRight: 12,
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 6,
  },
});

import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Review } from '../types';

interface Props {
  review: Review;
}

export default function Reviews({ review }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Reviews</Text>
      <View style={styles.reviewCard}>
        <Image source={{ uri: review.avatar }} style={styles.avatar} />
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{review.userName}</Text>
          <Text style={styles.rating}>⭐ {review.rating}</Text>
          <Text style={styles.comment}>{review.comment}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 16 },
  heading: { fontWeight: 'bold', fontSize: 16 },
  reviewCard: {
    flexDirection: 'row',
    marginTop: 8,
    alignItems: 'flex-start',
    gap: 12,
  },
  avatar: { width: 40, height: 40, borderRadius: 20 },
  name: { fontWeight: 'bold' },
  rating: { color: 'orange' },
  comment: { color: 'gray' },
});

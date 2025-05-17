import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Review } from '../types';
import { getDoctorReviews } from '../../../HttpService/apiCalls';

interface Props {
  id: string;
}

export default function Reviews({ id }: Props) {
  const [reviews, setReviews] = useState<Review[]>([])
  const getReviwes = async () => {
    try {
      console.log(id,"doctor id")
      const data = await getDoctorReviews(id);
      setReviews(data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getReviwes()

    return () => {

    }
  }, [id])

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Reviews</Text>
      {
        reviews.map((review,index) => (

          <View key={index} style={styles.reviewCard}>
            <Image source={{ uri: review.user.profilePic }} style={styles.avatar} />
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{review.user.name}</Text>
              <Text style={styles.rating}>⭐ {review.rating}</Text>
              <Text style={styles.comment}>{review.comment}</Text>
            </View>
          </View>
        ))
      }
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
  name: { fontWeight: 'bold',
    textTransform:"capitalize"
   },
  rating: { color: 'orange' },
  comment: { color: 'gray' },
});

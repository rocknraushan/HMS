import React from 'react';
import { View, FlatList, Image, StyleSheet, Dimensions } from 'react-native';
import { banner, banner2, banner3 } from '../../../../assets';

const images = [
    banner,
    banner2,
    banner3,
];

const width = Dimensions.get('window').width;

const PromoBannerCarousel = () => (
    <FlatList
        data={images}
        keyExtractor={(_, i) => i.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
            <Image source={item} style={styles.banner} />
        )}
    />
);

export default PromoBannerCarousel;

const styles = StyleSheet.create({
    banner: {
        width: width - 32,
        height: 140,
        borderRadius: 16,
        marginTop: 20,
        resizeMode: 'cover',
    },
});

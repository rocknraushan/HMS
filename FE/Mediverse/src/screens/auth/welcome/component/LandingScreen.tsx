import { FlatListProps, StyleSheet, Text, View } from 'react-native'
import React, { memo } from 'react'
import { WelconDataType } from '../../../../data/welcomescr_data'
import CButton from '../../../../components/CustomButton/CButton';
import { rspF, rspH, rspW, scrn_width } from '../../../../theme/responsive';
import fontFM from '../../../../theme/fontFM';
import FastImage from 'react-native-fast-image';

type Props = {
    item: WelconDataType;
    index: number;
}

const LandingScreen = ({ item, index }: Props) => {
    const { title, description, image } = item;

    return (
        <View style={{ height: '100%' }}>
            <FastImage source={image} style={styles.img_cont} resizeMode="cover" />
            <View style={styles.content_cont}>
                <View style={styles.content}>
                    <Text style={styles.cont_heading}>{title}</Text>
                    <Text style={styles.cont_subtext}>{description}</Text>
                </View>
            </View>
        </View>
    )
}

export default memo(LandingScreen)

const styles = StyleSheet.create({
    cont_subtext: {
        fontSize: rspF(15),
        color: '#6B7280',
        width: '120%',
        marginTop: rspH(8),
        fontFamily: fontFM.regular,
        textAlign: 'center',
    },
    cont_heading: {
        fontSize: rspF(20),
        fontFamily: fontFM.bold,
        textAlign: 'center',
        color: '#374151',
    },
    content: {
        height: 'auto',
        width: '85%',
        paddingHorizontal: rspW(35),
        marginTop: rspH(29),
        alignItems: 'center',
        alignSelf: 'center',
    },
    content_cont: {
        backgroundColor: '#fff',
        alignItems: 'center',
        width: scrn_width
    },
    img_cont: {
        height: '80%',
        width: scrn_width,
        alignSelf: 'center',
    },
    cont: {
        backgroundColor: '#fff',
    },
    dotsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: rspH(20),
    },
    dot: {
        width: rspW(10),
        height: rspW(10),
        borderRadius: rspW(5),
        backgroundColor: '#9B9B9B',
        marginHorizontal: rspW(5),
    },
    activeDot: {
        backgroundColor: '#26232F',
        width: rspW(30),
        height: rspH(8),
    }
})
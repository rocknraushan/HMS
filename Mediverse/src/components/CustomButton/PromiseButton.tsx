import { ActivityIndicator, StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import React, { memo } from 'react'

type Props = {
    onPress: () => void;
    text: string;
    loading?: boolean;
    style?:StyleProp<ViewStyle>;
}

const PromiseButton = ({ onPress, text, loading,style }: Props) => {
    return (
        <TouchableOpacity disabled={loading} style={[styles.button,style]} onPress={onPress}>
            {!loading ?
                <Text style={styles.buttonText}>{text}</Text>
                :
                <ActivityIndicator size={'small'} color={'#fff'} />
            }
        </TouchableOpacity>
    )
}

export default memo(PromiseButton)

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#1C2A3A',
        paddingVertical: 15,
        borderRadius: 30,
        alignItems: 'center',
        marginVertical: 15,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    }
})
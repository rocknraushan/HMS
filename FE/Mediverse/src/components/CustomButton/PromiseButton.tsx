import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo } from 'react'

type Props = {
    onPress: () => void;
    text: string;
    loading?: boolean;
}

const PromiseButton = ({ onPress, text, loading }: Props) => {
    return (
        <TouchableOpacity disabled={loading} style={styles.button} onPress={onPress}>
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
        marginBottom: 15,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    }
})
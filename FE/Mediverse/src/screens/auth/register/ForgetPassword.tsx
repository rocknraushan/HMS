import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationProp } from '@react-navigation/native'
import { RootStackParamList } from '../../../navigation/navStrings'

type Props = {
    navigation: NavigationProp<RootStackParamList, "ForgetPassword">
}

const ForgetPassword = ({ navigation }: Props) => {
    return (
        <View>
            <Text>ForgetPassword</Text>
        </View>
    )
}

export default ForgetPassword

const styles = StyleSheet.create({});
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationProp, NavigationRoute } from '@react-navigation/native'
import { RootStackParamList } from '../../../navigation/navStrings'

type Props = {
    navigation: NavigationProp<RootStackParamList, 'ChangePasswordScreen'>;
    route: NavigationRoute<RootStackParamList, 'ChangePasswordScreen'>;
}

const ChangePasswordScreen = (props: Props) => {
    console.log(props.route.params)
    return (
        <View>
            <Text>ChangePasswordScreen</Text>
        </View>
    )
}

export default ChangePasswordScreen

const styles = StyleSheet.create({})
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationProp } from '@react-navigation/native'
import { RootStackParamList } from '../navStrings'

type Props = {
    navigation: NavigationProp<RootStackParamList, 'DoctorTab'>;
}

const DoctorTab = (props: Props) => {
  return (
    <View>
      <Text>DoctorTab</Text>
    </View>
  )
}

export default DoctorTab

const styles = StyleSheet.create({})
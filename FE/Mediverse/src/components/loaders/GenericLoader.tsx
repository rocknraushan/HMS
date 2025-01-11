import { ActivityIndicator, Modal, StyleSheet, Text, View } from 'react-native'
import React, { memo } from 'react'

type Props = {
    isLoading: boolean;
}

const GenericLoader = (props: Props) => {
    return (
        <Modal visible style={{ flex: 1 }} transparent statusBarTranslucent>
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" }}>
                <ActivityIndicator color={"#111928"} size={'large'} role='progressbar' />
            </View>

        </Modal>
    )
}

export default memo(GenericLoader)

const styles = StyleSheet.create({})
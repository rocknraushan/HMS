import { Image, KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationProp, NavigationRoute } from '@react-navigation/native'
import { RootStackParamList } from '../../../navigation/navStrings'
import CustomInput from '../../../components/CustomInput/CustomInput'
import { Formik } from 'formik'
import PromiseButton from '../../../components/CustomButton/PromiseButton'
import * as Yup from 'yup'
import { Icons } from '../../../assets/icons'
import VectorIcons, { IconSets } from '../../../components/Icons/VectorIcons'
import { callOtpVerifyAPI } from './AuthHelper'
import Toast from 'react-native-toast-message'

const changePsswordValidation = Yup.object().shape({
    password: Yup.string()
        .required('Password is required')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number')
        .min(6, 'Password must be at least 6 characters'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), ""], 'Passwords must match')
        .required('Confirm Password is required'),
    otp: Yup.string()
        .matches(/^\d+$/, 'OTP must be a number')
        .required('OTP is required')
        .length(6, 'OTP must be 6 digits')
});
const initialValues = {
    password: '',
    confirmPassword: '',
    otp: ''
}
type Props = {
    navigation: NavigationProp<RootStackParamList, 'ChangePasswordScreen'>;
    route: NavigationRoute<RootStackParamList, 'ChangePasswordScreen'>;
}

const ChangePasswordScreen = (props: Props) => {
    const { navigation, route } = props

    const submitChangePassword = async (values: typeof initialValues) => {
        try {
            const data = await callOtpVerifyAPI({...values, email: route.params.email});
            console.log(data, 'FORGET response');
            if(data){
                Toast.show({
                        type: 'info',
                        text1: "Congratulations!",
                        text2: 'Password changed successfully',
                        visibilityTime: 5000,
                      });
            }
                navigation.navigate("LOGIN")
        } catch (error: any) {
            console.error('Registration error:', error.response.data);
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <KeyboardAvoidingView
                behavior="padding"
                style={{ flex: 1 }}
                keyboardVerticalOffset={100}
            >
                <SafeAreaView style={styles.safeAreaStyle}>
                    <ScrollView
                        contentContainerStyle={styles.contentCont}
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
                        keyboardDismissMode="on-drag"
                    >
                        <Image source={Icons.appLogo} style={styles.logo} />
                        <Formik
                            initialValues={initialValues}
                            onSubmit={submitChangePassword}
                            validationSchema={changePsswordValidation}
                        >
                            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                                <View>
                                    <CustomInput
                                        placeholder="Enter 6 degit OTP"
                                        onChangeText={handleChange('otp')}
                                        value={values.otp}
                                        error={errors.otp}
                                        extra={{
                                            maxLength: 6,
                                            keyboardType: 'number-pad',
                                        }}
                                        leftIcon={<VectorIcons color='#999' name='star-of-life' iconSet={IconSets.FontAwesome5} size={24} />}
                                    />
                                    <CustomInput
                                        placeholder="Enter new password"
                                        isPassword={true}
                                        onChangeText={handleChange('password')}
                                        value={values.password}
                                        error={errors.password}
                                        leftIcon={<Image source={Icons.lockIcon} style={{ width: 24, height: 24 }} resizeMode='cover' />}
                                    />
                                    <CustomInput
                                        placeholder="Re-enter new password"
                                        isPassword={true}
                                        onChangeText={handleChange('confirmPassword')}
                                        value={values.confirmPassword}
                                        error={errors.confirmPassword}
                                        leftIcon={<Image source={Icons.lockIcon} style={{ width: 24, height: 24 }} resizeMode='cover' />}
                                    />
                                    <PromiseButton text="Submit" onPress={handleSubmit} />
                                </View>
                            )}
                        </Formik>

                    </ScrollView>
                </SafeAreaView>
            </KeyboardAvoidingView>
        </View>
    )
}

export default ChangePasswordScreen

const styles = StyleSheet.create({
    contentCont: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    safeAreaStyle: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    logo: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginVertical: 20,
    },
})

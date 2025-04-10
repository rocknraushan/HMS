import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { NavigationProp } from '@react-navigation/native'
import { RootStackParamList } from '../../../navigation/navStrings'
import CustomInput from '../../../components/CustomInput/CustomInput'
import PromiseButton from '../../../components/CustomButton/PromiseButton'
import { Icons } from '../../../assets/icons'
import { Formik, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import fontFM from '../../../theme/fontFM'
import { rspH } from '../../../theme/responsive'
import getAxiosClient from '../../../HttpService/AxiosClient'
import { Services } from '../../../HttpService'
import SuccessModal from '../../../components/loaders/SuccessModal'

const initialVal = {
    email: '',
}
const validationSchema = Yup.object().shape({
    email: Yup.string().email("Enter a valid email").required("Email required"),
})
type Props = {
    navigation: NavigationProp<RootStackParamList, "ForgetPassword">
}

const ForgetPassword = ({ navigation }: Props) => {
    const [successMsg, setSuccessMsg] = useState(false)

    const handleSendCode = async (values: typeof initialVal, helpers: FormikHelpers<{
        email: string;
    }>) => {
        try {
            const client = await getAxiosClient();
            const response = await client.post(Services.FORGOT_PASSWORD, {
                email: values.email
            });
            console.log(response.data, 'FORGET response');
            setSuccessMsg(true)
        } catch (error: any) {
            console.error('Registration error:', error.response.data);
            if (error.response.data.errors)
                helpers.setErrors(error.response.data.errors)
        }
    };


    return (
        <View style={styles.container}>
            <SuccessModal visible={successMsg} duration={10000} onClose={()=>setSuccessMsg(false)} title='Success' subTitle='Kindly check your mail, we have sent a reset link.'/>
            <ScrollView keyboardShouldPersistTaps="always" keyboardDismissMode='on-drag' automaticallyAdjustKeyboardInsets contentContainerStyle={{ paddingTop: 120 }}>
                <Image source={Icons.appLogo} style={{ width: 100, height: 100, resizeMode: 'contain', alignSelf: 'center', marginTop: 10 }} />
                <Text style={{ fontFamily: "Poppins", fontSize: 20, color: "#999", alignSelf: 'center', textAlign: 'center' }}>Medi<Text style={{ color: "#111928" }}>verse</Text></Text>
                <Text style={{ fontFamily: fontFM.semiBold, fontSize: 25, color: "#1C2A3A", alignSelf: 'center', textAlign: 'center', marginTop: rspH(32) }}>Forget Password?</Text>
                <Text style={styles.subtitle}>Enter your Email, we will send you a verification code.</Text>
                <Formik
                    initialValues={initialVal}
                    validationSchema={validationSchema}
                    onSubmit={handleSendCode}>
                    {({
                        values,
                        handleChange,
                        errors,
                        touched,
                        handleSubmit,
                        isSubmitting
                    }) => {
                        return (
                            <>
                                {/* Email Input */}
                                <CustomInput
                                    placeholder="Email"
                                    value={values.email}
                                    onChangeText={handleChange("email")}
                                    extra={
                                        {
                                            keyboardType: "email-address",
                                            inputMode: "email"
                                        }
                                    }
                                    leftIcon={
                                        <Image source={Icons.smsIcon} style={styles.iconStyle} />
                                    }
                                    error={touched.email && errors.email}
                                />

                                {/* Login Button */}
                                <PromiseButton onPress={handleSubmit} text="Send Code" loading={isSubmitting} />
                            </>
                        )
                    }}
                </Formik>

            </ScrollView>
        </View>
    );
}

export default ForgetPassword

const styles = StyleSheet.create({
    orText: {
        position: 'absolute',
        color: "#6B7280",
        backgroundColor: "#F9FAFB",
        padding: 5,
        alignSelf: "center",
        textAlign: 'center',
        verticalAlign: "middle",
    },
    orWrapper: {
        width: '100%',
        height: 2,
        backgroundColor: "#E5E7EB",
        flexDirection: "row",
        justifyContent: "center",
        marginVertical: 10
    },
    iconStyle: {
        width: 20,
        height: 20,
        resizeMode: "contain",
        marginEnd: 8,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#F9FAFB',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        color: '#333',
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 30,
        color: '#555',
    },
    input: {
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 15,
        paddingLeft: 15,
        fontSize: 16,
        backgroundColor: '#fff',
    },
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
    },
    link: {
        color: '#6B7280',
        textAlign: 'center',
        fontSize: 14,
    },
    forgotPassword: {
        color: '#1C64F2',
        textAlign: 'center',
        fontSize: 14,
        marginTop: 20
    },
});
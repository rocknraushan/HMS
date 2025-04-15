import { GoogleSignin, statusCodes, User } from '@react-native-google-signin/google-signin';
import getAxiosClient from '../../../HttpService/AxiosClient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Services } from '../../../HttpService';
import * as Keychain from "react-native-keychain"
GoogleSignin.configure();

interface GoogleSignInResult {
    idToken: string | null;
    accessToken: string | null;
    user: any;
}

export async function handleGoogleSignIn(): Promise<GoogleSignInResult> {
    try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        console.log(userInfo, "user info")
        return {
            idToken: userInfo.data?.idToken ?? null,
            accessToken: userInfo.data?.serverAuthCode ?? null,
            //@ts-ignore
            user: userInfo?.data?.user,
        };
    } catch (error: any) {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            console.error('User cancelled the login flow');
        } else if (error.code === statusCodes.IN_PROGRESS) {
            console.error('Sign in is in progress already');
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            console.error('Play services not available or outdated');
        } else {
            console.error('Some other error happened:', error);
        }
        throw error;
    }
}

export interface LoginData {
    email: string | undefined;
    password: string | undefined;
    loginType: "google" | "email";
    plateform: string;
    socialData?:any;
}
export async function CallLoginApi(data: LoginData): Promise<any> {
    return new Promise<void>(async (resolve, reject) => {
        try {
            const deviceToken = await AsyncStorage.getItem("fcmToken");
            const client = await getAxiosClient();
            const response = await client.post(Services.LOGIN, {
                email: data.email,
                password: data.password,
                loginType: data.loginType,
                plateform: data.plateform,
                deviceToken: deviceToken,
                socialData: data.socialData
            });
            await Keychain.setGenericPassword(data.email ?? "user", JSON.stringify(response.data));
            resolve(response.data);
        } catch (error) {
            console.error('Failed to get Google sign-in data:', error);
            reject(error);
        }
    })

}

export async function callOtpVerifyAPI(data:{email:string,otp:string,password:string}):Promise<any>{
    return new Promise<void>(async (resolve, reject) => {
        try {
            const client = await getAxiosClient();
            const response = await client.post(Services.VERIFY_OTP, {
                email: data.email,
                otp: data.otp,
                newPassword: data.password
            });
            resolve(response.data);
        } catch (error) {
            console.error('Failed to verify otp:', error);
            reject(error);
        }
    })
}
export async function callForgetPasswordAPI(email:string):Promise<any>{
    return new Promise<void>(async (resolve, reject) => {
        try {
            const client = await getAxiosClient();
            const response = await client.post(Services.FORGOT_PASSWORD, {
                email: email,
            });
            resolve(response.data);
        } catch (error) {
            console.error('Failed to get Google sign-in data:', error);
            reject(error);
        }
    })
}
export async function callChangePasswordAPI(email:string, password:string, otp:string):Promise<any>{
    return new Promise<void>(async (resolve, reject) => {
        try {
            const client = await getAxiosClient();
            const response = await client.post(Services.CHANGE_PASSWORD, {
                email: email,
                password: password,
                otp: otp
            });
            resolve(response.data);
        } catch (error) {
            console.error('Failed to get Google sign-in data:', error);
            reject(error);
        }
    })
}
import Toast from "react-native-toast-message";
import getAxiosClient from "./AxiosClient";
import Services from "./Services";
import { Review } from "../screens/DoctorProfile/types";

async function updateLocation(coordinates: number[]) {
    try {
        console.log('Coordinates:', coordinates);
        const location = {
            type: 'Point',
            coordinates: coordinates,
        };
        const client = await getAxiosClient();
        const response = await client.put(Services.LOCATIONuPDATE, { location }, {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        });
        console.debug('Response:', response);
        if (response.status === 200) {
            Toast.show({
                type: 'success',
                text1: 'Location updated successfully',
                position: 'top',
            });
        }
        console.debug(response.data, 'Location update response');
    } catch (error) {

    }
}

async function getNearbyDoctors(coordinates: number[] = [0, 0], pincode: string = ''): Promise<any[]> {
    return new Promise(async (res, rej) => {
        try {
            const client = await getAxiosClient();
            const params = {
                lng: coordinates[0],
                lat: coordinates[1],
                pincode: pincode
            }
            const response = await client.get(Services.NEARBY_DOCTORS, { params });
            res(response.data);
        } catch (error) {
            console.error('Error fetching API data:', error);
            rej(error);
        }
    })
}

export async function getDoctorReviews(id: string): Promise<Review[]> {
    return new Promise(async (res, rej) => {

        try {
            const params = {
                id: id
            }
            const client = await getAxiosClient();
            const response = await client.get(Services.REVIEWS, { params });
            res(response.data.reviews);
        } catch (error) {
            rej(error)
        }
    })
}

export async function getNotification(): Promise<any[]> {
    return new Promise(async (res, rej) => {
        try {
            const client = await getAxiosClient();
            const response = await client.get(Services.NOTIFICATION);
            console.log(response.data, 'notif')
            res(response.data.notifications);

        } catch (error) {
            console.log(error)
            rej(error)
        }
    })
}


export async function bookAppointment(appointmentData: {
    doctor: string,
    "date": string,
    "time": string,
    "reason": string,
    "appointmentType": "clinical" | "home"
}) {
    return new Promise(async(res,rej)=>{
        try {
            const client = await getAxiosClient();
            const response = await client.post(Services.APPOINTMENTS,appointmentData);
            res(response.data);
        } catch (error:any) {
             Toast.show({
                    type:"error",
                    text1:"Error",
                    text2:`${error.response.data.message}`,
                    autoHide:true,
                    position:"top",
                    visibilityTime:5000
                  })
            rej(error)
        }
    })
}

export async function getAppointments():Promise<any[]> {
    return new Promise(async(res,rej)=>{
        try {
            const client = await getAxiosClient();
            const response = await client.get(Services.APPOINTMENTS);
            console.log(response.data,"response:::::>>>")
            res(response.data)
        } catch (error) {
            rej(error)
        }
    })
}



export const apiCalls = {
    updateLocation,
    getNearbyDoctors
};
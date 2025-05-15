import Toast from "react-native-toast-message";
import getAxiosClient from "./AxiosClient";
import Services from "./Services";

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



export const apiCalls = {
    updateLocation,
    getNearbyDoctors
};
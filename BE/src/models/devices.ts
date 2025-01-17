import * as admin from 'firebase-admin';
import { Schema, model, Document } from 'mongoose';

// Initialize Firebase Admin SDK
const serviceAccount = {
    "type": "service_account",
    "project_id": "evaidya-7784c",
    "private_key_id": "e6868f82fa2ca8dcb7b72c98a3b0f0d81a5d1919",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCz6+nJpftp+K+s\nDbJjHfh6U047PQ3DBO9GHW1W97165i6ucEKnvp/LHdXfOi9/vL9CXrwOR1TB5VwH\ngBf5GgtSr1n9RUdTpmw1hzGB+pWY0lhu9WVgF70rj9RtiLwTwDrskfYwkDMARmjP\n2oM0kXDRMhbVUsPifndKaw36o9iDvCcS4/vQL0JQKzrCZTAcwv8EYa6vP8Z45Z5f\nRs7g3fY5Z+23ZCTz04wkrJ++FaxeIOINZre4FVbwhte2EtWJHaCRgyIcZuHqLlul\nCHIIaRfgwH6e1NMBtJ4XayQN+Mv/axBRcuGQTQoF1Ta2YplySJz+33E257rnIkgW\noFG2RLEZAgMBAAECggEAAW9kjD/3bys1ZYMvdNRwnrMq6NSOF0vjB7Vk4aB0wbXz\n0d7h3TorRqC8i70IU3XDNcmRKPD/N1O3xfSK3GkNhZGR/2/tx3hInS2woqeHyXIG\nFA5/ikJuNxp82InSbDrojWoFo3IHAh3NqLjGuqTdWEHUxktUdipJk82iTSlA6R4T\n49e+OKbF3hAsdVRRaNglwvkqtyP8iVQO7JRM1EqxbZnh/MI75QIutuMLmtxB/IS7\nV+qybqibCZUoCnYbQi3xDIAg7rT6VZzg1pSDXDsWbceVNfClfwYq9bTWbbYmZ9IQ\nQD/62Vnn04dpUPrktFQUICcvfWp63BoOL6hqE4JH7QKBgQDyHxCKQkps7yZWYlJo\nPwZj9pHt9H6vjvr7oQNhc9y9c9QxRxlcw5GAlOY3hSDXbcPPT2dS+V6LfnEoxHaB\nsygAyY+Rq6U+p44PZ5OSl7HzE4nEIcei8cN3JeDHy7es8OxdDCMfKIeFexgVCSH0\nUegvdVD2zM+NhgQKEio6K9Y+dQKBgQC+PB3ZbRXrIRc++LrhveCMTaHfL7Kttw/a\nYZjOOPYYbcPuE2HYmQUWqzHIIYRk5zJpt30z2AnUC8LcTrUSr4qCTc1mKQ6A0CxC\nOKHVZ2+wb6wFSBwIbxyfWnB2MJYHr99DGCT7qaLn3UMlKG+wpg2wJd56HrFS7NoH\nzJWQaowblQKBgAlzSPP8jmceFoL8p3bGLvur3hpJlsBHdmhn6nfdS9phMQETY1wJ\njh5UsX+tRJDkCeaHlOLaNOSA9O3AbVe2pHMTavUmm/aMF7FmO45XOWzhcFklcGNd\nyGFYKyPhQbQQW0luddh7fn6pRVFc3+RnZgakL5rSd69wcavq9Zb7qwsZAoGBAIHB\nBWcRFbsr9ewYwXdKCMgKB5fws8HzNBfzK8O1bH4bGGHhzIJtVOAyYqEr417jpyoe\nYoKjH4kHgKC9+pnFLAdWw/ujk2XfF+EPOasSg0bn1IBBwAUsrGwwxraGyz5xAiqE\nZG1XNmtKKwtEOnJVwM5d9hJ7rt1t+gUJ0RYQ5oHFAoGBAOdfu4eGJNUReNG1Gt2y\nXjf3c/Ku/HQRFQIm/K3Ym5g5uMqHq4or6vFbY1i4DIfetdzSzTn+I6zXCMkRv1RW\nJaZxcixlh98Dse1VEet1lxfKWMgZ5XwKRODdllWSDINMvs8eqg2oLlIxBC4To9uW\nhh/6SmSD2wLYaRDj0CMqQ1n4\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-uusx7@evaidya-7784c.iam.gserviceaccount.com",
    "client_id": "105419682512463764031",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-uusx7%40evaidya-7784c.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
}

admin.initializeApp({
    credential: admin.credential.cert({
        privateKey: serviceAccount.private_key,
        clientEmail: serviceAccount.client_email,
        projectId: serviceAccount.project_id
    })
});

type DeviceType = "android" | "ios";

interface IDeviceToken extends Document {
    plateform: DeviceType;
    token: string;
    createdAt: Date;
    updatedAt: Date;
    user: Schema.Types.ObjectId;
}

// Create the DeviceToken schema
const deviceTokenSchema = new Schema<IDeviceToken>({
    plateform: { type: String, enum: ["android", "ios"], required: true },
    token: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: false }
});

// Create the DeviceToken model
export default model<IDeviceToken>('DeviceToken', deviceTokenSchema);
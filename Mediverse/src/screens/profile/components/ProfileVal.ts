import StorageProvider from "../../../storage/Storage";
import { BufferImage } from "./ProfilePicUploader";

// Common Interface
// types/user.ts

export interface Location {
    type: "Point";
    coordinates: [number, number]; // [longitude, latitude]
  }
  
  export interface Address {
    line1: string;
    line2: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
  }
  
  export type UserRole = "doctor" | "nurse" | "admin" | "patient" | "emt";
  
  interface fileType {uri: string; type: string; name: string};
  export interface User {
    firstName?: string;
    lastName?: string;
    name: string;
    email: string;
    profilePic: BufferImage | fileType; 
    socialData?: any;
    gender: string;
    phone: string;
    location?: Location;
    address?: Address;
  }
  
export interface IAddress {
    line1: string;
    line2: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
}
export interface ILocation {
    type: "Point";
    coordinates: [number, number];
}
// Role-specific Interfaces
export interface DoctorFormValues extends User {
    specialization: string;
    workingHours: {
      start: string; // 'HH:mm' format (e.g., '09:00')
      end: string;
    };
    clinicAddress: {
        line1: string;
        line2?: string;
        city: string;
        state: string;
        country: string;
        pincode: string;
    };
    location: {
      type: 'Point';
      coordinates: [number, number]; // [longitude, latitude]
    };
    isAvailable: boolean;
    bio: string;
    experience: string;
    licenseNumber: string;
    education: string;
    homeVisit: boolean;
  }
  

// types/patient.ts

export interface MedicalHistory {
    condition: string;
    diagnosisDate: Date | string;
    advice?: string;
  }
  
  export interface Prescription {
    prescribedBy: string; // assuming you use ObjectId as string in frontend
    date: Date | string;
    medications: string;
    advice?: string;
  }
  
  export interface MedicalDocument {
    name: string;
    url: string;
    type: string; // e.g., 'image/jpeg', 'application/pdf'
  }
  
  export interface Patient extends User {
    age: number | string; // Age in years
    dob: Date | string; // Date of Birth
    bloodGroup?: string;
    allergies?: string[];
    medicalConditions?: string[];
    height?: number;
    weight?: number;
    medicalHistory?: MedicalHistory[];
    prescriptions?: Prescription[];
    documents?: MedicalDocument[];
  }
  

export interface Nurse extends User {
    experience: string;
    specialization: string;
    isAvailable: boolean;
}

// Default Values
export const UserVal: User = {
    name: '',
    phone: '',
    profilePic: { uri: '', type: '', name: '' },
    gender: '',
    email: '',
    address:{
        line1: '',
        line2: '',
        city: '',
        state: '',
        country: '',
        pincode: ''
    },
    location:{
        type: 'Point',
        coordinates: [0, 0]
    },

};



export const patientVal: Patient = {
    ...UserVal,
    bloodGroup: '',
    age: 0,
    dob: new Date(),
    allergies: [],
    medicalConditions: [],
    height: 0,
    weight: 0,
    medicalHistory: [],
    prescriptions: [],
    documents: [],
};

export const nurseVal: Nurse = {
    ...UserVal,
    experience: '',
    specialization: '',
    isAvailable: true,
};


// export const getInitialValues = async () => {
//     try {
//         // const store = new Storage();
//         const userData = await StorageProvider.getStorageItem('USER');
//         switch (userData.role) {
//             case "doctor":
//                 return doctorVal;
//             case "nurse":
//                 return nurseVal;
//             case "patient":
//                 return patientVal;

//             default:
//                 return doctorVal;
//         }
//     } catch (error) {
//         console.error("Error in getInitialValues: ", error);
//         return {};

//     }
// }
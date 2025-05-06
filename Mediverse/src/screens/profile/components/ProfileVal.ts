import StorageProvider from "../../../storage/Storage";

// Common Interface
export interface User {
    name: string;
    phone: string;
    profilePic: Buffer | { uri: string; type: string; name: string };
    gender: string;
    email: string;
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
  

export interface Patient extends User {
    age: string;
    dob: string;
    bloodGroup: string;
    medicalHistory: any[];  // Replace 'any' with a proper type if known
    prescriptions: any[];
    documents: any[];
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
};



export const patientVal: Patient = {
    ...UserVal,
    age: '',
    dob: '',
    bloodGroup: '',
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
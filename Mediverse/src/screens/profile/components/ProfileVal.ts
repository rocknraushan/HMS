import StorageProvider from "../../../storage/Storage";

export const UserVal =  {
    name: '',
    // age: '',
    // bloodGroup: '',
    phone: '',
    profilePic: {uri: '', type: '', name: ''},
    gender: '',
    email: '',
    // dob: '',
  };

  export const doctorVal = {
    ...UserVal,
    specialization: '',
    workingHours: '',
    clinicAddress: '',
    isAvailable: true,
    bio: '',
    experience: '',
  };

    export const patientVal = {
        ...UserVal,
        age: '',
        dob:'',
        bloodGroup: '',
        medicalHistory: [],
        prescriptions: [],
        documents: [],
    };

    export const nurseVal = {
        ...UserVal,
        experience: '',
        specialization: "",
        isAvailable: true
    };


export const getInitialValues = async()=> {
    try {
        // const store = new Storage();
        const userData = await StorageProvider.getStorageItem('USER');
        switch (userData.role) {
            case "doctor":
                return doctorVal;
            case "nurse":
                return nurseVal;
            case "patient":
                return patientVal;
        
            default:
                return UserVal;
        }
    } catch (error) {
        console.error("Error in getInitialValues: ", error);
        return {};
        
    }
}
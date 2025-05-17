const Services = {
  REGISTER: "api/auth/register",
  LOGIN: "api/auth/login",
  REVIEWS:"api/doctors/reviews",
  NOTIFICATION:"api/auth/notifications",
  PROFILE_UPDATE: "api/auth/profile/update",
  PROFILE: "api/auth/profile",
  FORGOT_PASSWORD: "api/auth/forget-password",
  CHANGE_PASSWORD: "api/auth/change-password",
  VERIFY_OTP: "api/auth/verify-otp",
  PROFILE_PIC:"api/auth/profile-pic",
  LOCATIONuPDATE: "api/auth/update-location",
  NEARBY_DOCTORS: "api/doctors/nearby",
  APPOINTMENTS:"api/appointments",
  ROLE: {
    PATIENT: "patient",
    DOCTOR: "doctor",
    NURSE: "nurse",
    ADMIN: "admin"
  }
};
export default Services;
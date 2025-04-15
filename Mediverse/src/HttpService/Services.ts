const Services = {
  REGISTER: "api/auth/register",
  LOGIN: "api/auth/login",
  PROFILE_UPDATE: "api/auth/profile/update",
  PROFILE: "api/auth/profile",
  FORGOT_PASSWORD: "api/auth/forget-password",
  CHANGE_PASSWORD: "api/auth/change-password",
  VERIFY_OTP: "api/auth/verify-otp",
  ROLE: {
    PATIENT: "patient",
    DOCTOR: "doctor",
    NURSE: "nurse",
    ADMIN: "admin"
  }
};
export default Services;
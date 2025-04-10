const Services = {
  REGISTER: "api/auth/register",
  LOGIN: "api/auth/login",
  PROFILE_UPDATE: "api/auth/profile/update",
  PROFILE: "api/auth/profile",
  FORGOT_PASSWORD: "api/auth/forget-password",
  ROLE: {
    PATIENT: "patient",
    DOCTOR: "doctor",
    NURSE: "nurse",
    ADMIN: "admin"
  }
};
export default Services;
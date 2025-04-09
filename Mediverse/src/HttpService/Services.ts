const Services = {
  REGISTER: "api/auth/register",
  LOGIN: "api/auth/login",
  PROFILE_UPDATE: "api/auth/profile/update",
  PROFILE: "api/auth/profile",
  ROLE: {
    PATIENT: "patient",
    DOCTOR: "doctor",
    NURSE: "nurse",
    ADMIN: "admin"
  }
};
export default Services;
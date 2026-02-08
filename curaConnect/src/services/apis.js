const BASE_URL = import.meta.env.VITE_BASE_URL;

/* ===================== AUTH ENDPOINTS ===================== */
export const authEndpoints = {
  SEND_OTP_API: `${BASE_URL}/auth/sendotp`,
  SIGNUP_API: `${BASE_URL}/auth/signup`,
  LOGIN_API: `${BASE_URL}/auth/login`,
  RESET_PASSWORD_TOKEN_API: `${BASE_URL}/auth/reset-password-token`,
  RESET_PASSWORD_API: `${BASE_URL}/auth/reset-password`,
  CHANGE_PASSWORD_API: `${BASE_URL}/auth/changepassword`,
};

/* 🔁 BACKWARD COMPATIBILITY (DO NOT REMOVE) */
export const endpoints = authEndpoints;

/* ===================== CATEGORY ENDPOINTS ===================== */
export const categoryEndpoints = {
  GET_ALL_CATEGORIES_API: `${BASE_URL}/healthProgram/showAllCategories`,
};

/* 🔁 BACKWARD COMPATIBILITY */
export const categories = categoryEndpoints;

/* ===================== PROFILE ENDPOINTS ===================== */
export const profileEndpoints = {
  GET_USER_DETAILS_API: `${BASE_URL}/profile/getUserDetails`,
  GET_USER_ENROLLED_HEALTHPROGRAMS_API:`${BASE_URL}/profile/getEnrolledHealthPrograms`,
  GET_DOCTOR_DASHBOARD_API: `${BASE_URL}/profile/doctorDashboard`,
  UPDATE_PROFILE_API: `${BASE_URL}/profile/updateProfile`,
  UPDATE_DISPLAY_PICTURE_API: `${BASE_URL}/profile/updateDisplayPicture`,
  DELETE_PROFILE_API: `${BASE_URL}/profile/deleteProfile`,
};

/* ===================== SETTINGS ENDPOINTS ===================== */
/* ✅ REQUIRED FOR SettingsAPI.js */
export const settingsEndpoints = {
  UPDATE_PROFILE_API: profileEndpoints.UPDATE_PROFILE_API,
  UPDATE_DISPLAY_PICTURE_API:
    profileEndpoints.UPDATE_DISPLAY_PICTURE_API,
  DELETE_PROFILE_API: profileEndpoints.DELETE_PROFILE_API,
  CHANGE_PASSWORD_API: authEndpoints.CHANGE_PASSWORD_API,
};

/* ===================== PATIENT / PAYMENT ENDPOINTS ===================== */
export const patientEndpoints = {
  HEALTHPROGRAM_PAYMENT_API: `${BASE_URL}/payment/capturePayment`,
  HEALTHPROGRAM_VERIFY_API: `${BASE_URL}/payment/verifyPayment`,
  SEND_PAYMENT_SUCCESS_EMAIL_API:
    `${BASE_URL}/payment/sendPaymentSuccessEmail`,
};

/* ===================== HEALTH PROGRAM ENDPOINTS ===================== */
export const healthProgramEndpoints = {
  GET_ALL_HEALTHPROGRAMS_API:
    `${BASE_URL}/healthProgram/getAllHealthPrograms`,
  GET_HEALTHPROGRAM_DETAILS_API:
    `${BASE_URL}/healthProgram/getHealthProgramDetails`,
  GET_FULL_HEALTHPROGRAM_DETAILS_AUTHENTICATED_API:
    `${BASE_URL}/healthProgram/getFullHealthProgramDetails`,

  CREATE_HEALTHPROGRAM_API:
    `${BASE_URL}/healthProgram/createHealthProgram`,
  EDIT_HEALTHPROGRAM_API:
    `${BASE_URL}/healthProgram/editHealthProgram`,
  DELETE_HEALTHPROGRAM_API:
    `${BASE_URL}/healthProgram/deleteHealthProgram`,

  CREATE_SECTION_API:
    `${BASE_URL}/healthProgram/addSection`,
  UPDATE_SECTION_API:
    `${BASE_URL}/healthProgram/updateSection`,
  DELETE_SECTION_API:
    `${BASE_URL}/healthProgram/deleteSection`,

  CREATE_SUBSECTION_API:
    `${BASE_URL}/healthProgram/addSubSection`,
  UPDATE_SUBSECTION_API:
    `${BASE_URL}/healthProgram/updateSubSection`,
  DELETE_SUBSECTION_API:
    `${BASE_URL}/healthProgram/deleteSubSection`,

    GET_ALL_DOCTOR_HEALTHPROGRAMS_API:
    BASE_URL + "/healthProgram/getDoctorHealthPrograms",
  

  UPDATE_HEALTHPROGRAM_PROGRESS_API:
    `${BASE_URL}/healthProgram/updateHealthProgramProgress`,

  CREATE_RATING_API:
    `${BASE_URL}/healthProgram/createRating`,
};

/* ===================== RATINGS & REVIEWS ===================== */
export const ratingsEndpoints = {
  GET_REVIEWS_API: `${BASE_URL}/healthProgram/getReviews`,
};

/* ===================== CATALOG PAGE ===================== */
export const catalogEndpoints = {
  GET_CATALOG_PAGE_DATA_API:
    `${BASE_URL}/healthProgram/getCategoryPageDetails`,
};


/* ===================== CONTACT US ===================== */
export const contactUsEndpoints = {
  CONTACT_US_API: `${BASE_URL}/reach/contact`,
};

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentStep: 0,
  hasSelectedRole: false,
  hasCompletedPreSteps: false,
  hasCompletedExServiceman: false,
  fromEditClick: false,

  onboardingChannel: {
    channel: "",
  },

  disclaimer: {
    proceed: "",
  },

  role: {
    selectedRole: "",
  },

  files: {
    dischargeBook: null,
    exServicemanId: null,
    passportPhoto: null,
    signaturePhoto: null,
    marksheetFile: null,
    addressProofFile: null,
    aadhaarFrontPhoto: null,
    aadhaarBackPhoto: null,
    panCardFrontPhoto: null,
    passingCertificate: null,

  },

  basicDetails: {
    fullName: "",
    mobileNumber: "",
    alternateMobileNumber: "",
    email: "",
    dateOfBirth: "",
    city: "",
    motherName: "",
    fatherName: "",

  },

  qualification: {
    highestEducation: "",
    graduationCategory: "",
  },

  aadhaar: {
    aadhaarNumber: "",

  },

  panCard: {
    panCardNumber: "",
  },

  address: {
    houseNumber: "",
    streetName: "",
    locality: "",
    landmark: "",
    district: "",
    state: "",
    pincode: "",
    permanentSameAsCurrent: "",
  },
  exServiceman: {
    isExServiceman: '',

  },

  neighbour: {
    neighbor1Details: "",
    neighbor2Details: "",
    nearestPoliceStation: "",
    howDidYouKnow: "",
  },
  loadingFiles: {
    aadhaarFrontPhoto: false,
    aadhaarBackPhoto: false,
    panCardFrontPhoto: false,
    passingCertificate: false,
    marksheetFile: false,
    addressProofFile: false
  },
  formErrors: {
    basicDetails:false,
    qualification:false,
    aadhaar:false,
    panCard:false,
    address:false
  },
  validations: {
    aadhaarNumValidation: false
  },
  validationsData: {
    aadhaarValidations: {}
  }
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },

    nextStep: (state) => {
      if (state.currentStep < 6) {
        state.currentStep += 1;
      }
    },

    prevStep: (state) => {
      if (state.currentStep > 0) {
        state.currentStep -= 1;
      }
    },

    setHasSelectedRole: (state, action) => {
      state.hasSelectedRole = action.payload;
    },

    setHasCompletedPreSteps: (state, action) => {
      state.hasCompletedPreSteps = action.payload;
    },
    setHasCompletedExServiceman: (state, action) => {
      state.hasCompletedExServiceman = action.payload;
    },

    updateOnboardingChannel: (state, action) => {
      state.onboardingChannel = {
        ...state.onboardingChannel,
        ...action.payload,
      };
    },

    updateLoadingFiles: (state, action) => {
      state.loadingFiles = {
        ...state.loadingFiles,
        ...action.payload,
      };
    },

    updateDisclaimer: (state, action) => {
      state.disclaimer = { ...state.disclaimer, ...action.payload };
    },

    updateRole: (state, action) => {
      state.role = { ...state.role, ...action.payload };
    },

    updateBasicDetails: (state, action) => {
      state.basicDetails = { ...state.basicDetails, ...action.payload };
    },

    updateQualification: (state, action) => {
      state.qualification = { ...state.qualification, ...action.payload };
    },

    updateAadhaar: (state, action) => {
      state.aadhaar = { ...state.aadhaar, ...action.payload };
    },

    updatePanCard: (state, action) => {
      state.panCard = { ...state.panCard, ...action.payload };
    },

    updateAddress: (state, action) => {
      state.address = { ...state.address, ...action.payload };
    },

    updateNeighbour: (state, action) => {
      state.neighbour = { ...state.neighbour, ...action.payload };
    },

    updateFromEditClick: (state, action) => {
      state.fromEditClick = action.payload;
    },
    updateFiles: (state, action) => {
      state.files = { ...state.files, ...action.payload };
    },
    updateFormErrors: (state, action) => {
      state.formErrors = { ...state.formErrors, ...action.payload };
    },
    updateExServiceman: (state, action) => {
      state.exServiceman = { ...state.exServiceman, ...action.payload };
    },
    updateValidations: (state, action) => {
      state.validations = { ...state.validations, ...action.payload };
    },
    updateValidationsData: (state, action) => {
      state.validationsData = { ...state.validationsData, ...action.payload };
    },

    resetForm: () => initialState,
  },
});

export const {
  setCurrentStep,
  nextStep,
  prevStep,
  setHasSelectedRole,
  setHasCompletedPreSteps,
  updateOnboardingChannel,
  updateDisclaimer,
  updateRole,
  updateBasicDetails,
  updateQualification,
  updateAadhaar,
  updatePanCard,
  updateAddress,
  updateNeighbour,
  resetForm,
  updateFromEditClick,
  updateFiles,
  updateLoadingFiles,
  updateFormErrors,
  updateValidations,
  updateValidationsData,
  updateExServiceman,
  setHasCompletedExServiceman

} = formSlice.actions;

export default formSlice.reducer;

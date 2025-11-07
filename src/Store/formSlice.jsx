import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentStep: 0,
  hasSelectedRole: false,
  hasCompletedPreSteps: false,
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

  basicDetails: {
    fullName: "",
    mobileNumber: "",
    alternateMobileNumber: "",
    email: "",
    dateOfBirth: "",
    city: "",
    motherName: "",
    fatherName: "",
    passportPhoto: null,
    signaturePhoto: null,
  },

  qualification: {
    highestEducation: "",
    graduationCategory: "",
    marksheetFile: null,
  },

  aadhaar: {
    aadhaarNumber: "",
    aadhaarFrontPhoto: null,
    aadhaarBackPhoto: null,
  },

  panCard: {
    panCardNumber: "",
    panCardFrontPhoto: null,
    passingCertificate: null,
  },

  address: {
    houseNumber: "",
    streetName: "",
    locality: "",
    landmark: "",
    district: "",
    state: "",
    pincode: "",
    addressProofFile: null,
    permanentSameAsCurrent: "",
  },

  neighbour: {
    neighbor1Details: "",
    neighbor2Details: "",
    nearestPoliceStation: "",
    howDidYouKnow: "",
  },
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

    updateOnboardingChannel: (state, action) => {
      state.onboardingChannel = {
        ...state.onboardingChannel,
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
} = formSlice.actions;

export default formSlice.reducer;

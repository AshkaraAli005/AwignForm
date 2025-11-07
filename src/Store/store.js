import { configureStore } from '@reduxjs/toolkit';
import formReducer from './formSlice';

export const store = configureStore({
  reducer: {
    form: formReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore File objects in the state
        ignoredActions: [
          'form/updateBasicDetails',
          'form/updateQualification',
          'form/updateAadhaar',
          'form/updatePanCard',
          'form/updateAddress',
        ],
        ignoredPaths: [
          'form.basicDetails.passportPhoto',
          'form.basicDetails.signaturePhoto',
          'form.qualification.marksheetFile',
          'form.aadhaar.aadhaarFrontPhoto',
          'form.aadhaar.aadhaarBackPhoto',
          'form.panCard.panCardFrontPhoto',
          'form.panCard.passingCertificate',
          'form.address.addressProofFile',
        ],
      },
    }),
});

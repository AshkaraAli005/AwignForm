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
          'form.files.passportPhoto',
          'form.files.signaturePhoto',
          'form.files.marksheetFile',
          'form.files.aadhaarFrontPhoto',
          'form.files.aadhaarBackPhoto',
          'form.files.panCardFrontPhoto',
          'form.files.passingCertificate',
          'form.files.addressProofFile',
        ],
      },
    }),
});

export const validateStep = (step, formState) => {
    switch (step) {
      case 0: // Basic Details
        return !!(
          formState.basicDetails.fullName &&
          formState.basicDetails.mobileNumber &&
          formState.basicDetails.alternateMobileNumber &&
          formState.basicDetails.email &&
          formState.basicDetails.dateOfBirth &&
          formState.basicDetails.city &&
          formState.basicDetails.motherName &&
          formState.basicDetails.fatherName &&
          formState.basicDetails.passportPhoto &&
          formState.basicDetails.signaturePhoto
        );
  
      case 1: // Qualification
        return !!(
          formState.qualification.highestEducation &&
          formState.qualification.graduationCategory &&
          formState.qualification.marksheetFile
        );
  
      case 2: // Aadhaar
        return !!(
          formState.aadhaar.aadhaarNumber &&
          formState.aadhaar.aadhaarFrontPhoto &&
          formState.aadhaar.aadhaarBackPhoto
        );
  
      case 3: // PAN Card
        return !!(
          formState.panCard.panCardNumber &&
          formState.panCard.panCardFrontPhoto &&
          formState.panCard.panCardBackPhoto
        );
  
      case 4: // Address
        return !!(
          formState.address.houseNumber &&
          formState.address.streetName &&
          formState.address.locality &&
          formState.address.landmark &&
          formState.address.district &&
          formState.address.state &&
          formState.address.pincode &&
          formState.address.addressProofFile &&
          formState.address.permanentSameAsCurrent
        );
  
      case 5: // Neighbour
        return !!(
          formState.neighbour.neighbor1Details &&
          formState.neighbour.neighbor2Details &&
          formState.neighbour.nearestPoliceStation &&
          formState.neighbour.howDidYouKnow
        );
  
      case 6: // Summary
        return true; // Summary step doesn't need validation
  
      default:
        return false;
    }
  };
  
  export const getStepValidationMessage = (step) => {
    const stepNames = [
      "Basic Details",
      "Education & Qualifications",
      "Aadhaar Verification",
      "PAN Card Verification",
      "Address Details",
      "Reference Information",
      "Review & Verify"
    ];
  
    return `Please fill all required fields in ${stepNames[step]} before proceeding.`;
  };
  
  // ✅ Common reusable validation functions

// --- Email validation ---
export const validateEmail = (email) => {
  if (!email) return "Email is required.";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) ? "" : "Enter a valid email address.";
};

// --- Phone number validation (10-digit) ---
export const validatePhone = (phone) => {
  if (!phone) return "Mobile number is required.";
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(phone)
    ? ""
    : "Enter a valid 10-digit mobile number (starting with 6–9).";
};

// --- Name validation (letters + spaces only) ---
export const validateName = (name) => {
  if (!name) return "Name is required.";
  const nameRegex = /^[A-Za-z\s]+$/;
  return nameRegex.test(name)
    ? ""
    : "Name should contain only alphabets and spaces.";
};

// --- PAN number validation ---
export const validatePAN = (pan) => {
  if (!pan) return "PAN number is required.";
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  return panRegex.test(pan)
    ? ""
    : "Enter a valid PAN number (e.g., ABCDE1234F).";
};

// --- Date of Birth validation (age >= 18) ---
export const validateDOB = (dob) => {
  if (!dob) return "Date of Birth is required.";
  const date = new Date(dob);
  const today = new Date();
  const age = today.getFullYear() - date.getFullYear();
  const isOldEnough =
    age > 18 ||
    (age === 18 &&
      (today.getMonth() > date.getMonth() ||
        (today.getMonth() === date.getMonth() &&
          today.getDate() >= date.getDate())));
  return isOldEnough ? "" : "You must be at least 18 years old.";
};

// --- City validation ---
export const validateCity = (city) => {
  return city ? "" : "Please select your city.";
};

// --- File upload validation ---
export const validateFile = (file, fieldName) => {
  if (!file) return `${fieldName} is required.`;
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  const maxSizeMB = 2;
  if (!allowedTypes.includes(file.type)) {
    return `${fieldName} must be a JPG or PNG image.`;
  }
  if (file.size > maxSizeMB * 1024 * 1024) {
    return `${fieldName} must be smaller than ${maxSizeMB}MB.`;
  }
  return "";
};

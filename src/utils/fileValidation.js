export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes

export const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
export const ALLOWED_DOCUMENT_TYPES = [...ALLOWED_IMAGE_TYPES, "application/pdf"];


export const validateImageFile = (file) => {
  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    return {
      isValid: false,
      error: `File size must be less than 5MB. Current size: ${(file.size / (1024 * 1024)).toFixed(2)}MB`,
    };
  }

  // Check file type
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return {
      isValid: false,
      error: "Only image files (JPEG, JPG, PNG, WEBP) are allowed",
    };
  }

  return { isValid: true };
};


export const validateDocumentFile = (file) => {
  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    return {
      isValid: false,
      error: `File size must be less than 5MB. Current size: ${(file.size / (1024 * 1024)).toFixed(2)}MB`,
    };
  }

  // Check file type
  if (!ALLOWED_DOCUMENT_TYPES.includes(file.type)) {
    return {
      isValid: false,
      error: "Only image files (JPEG, JPG, PNG, WEBP) or PDF files are allowed",
    };
  }

  return { isValid: true };
};

export const formatFileSize = (bytes) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
};

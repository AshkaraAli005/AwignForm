import { useRef } from "react";
import { Badge } from "../Components/Ui/badge";
import { Separator } from "../Components/Ui/separator";
import {
  FileText,
  Image as ImageIcon,
  AlertTriangle,
  X,
  Loader2,
  Upload,
  Copy,
} from "lucide-react";
import { updateAadhaar, updatePanCard } from "../Store/formSlice";
import { toast } from "sonner";



export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  return emailRegex.test(email);
};

export const isValidPAN = (pan) => {
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  return panRegex.test(pan.toUpperCase());
};

export const sanitizeInput = (value, allowedPattern) => {
  return value.replace(new RegExp(`[^${allowedPattern}]`, "g"), "");
};

export const validationRules = {
  name: "a-zA-Z0-9-_ ", // only letters and numbers
  nameWithoutSpace: "a-zA-Z0-9-_",
  numbers: "0-9", // only digits
  alphabets: "a-zA-Z", // only alphabets
  alphanumericWithSpace: "a-zA-Z0-9 ", // letters, numbers, spaces
  alphanumericWithoutSpace: "a-zA-Z0-9",
  email: "a-zA-Z0-9@._-", // email,
  entityFields: "A-Za-z0-9 !\"#$%&'()*+,-./:;<=>?@[\\]_`{|}\\t\\n",
};

 
 export const getVerificationRes = (verifications, dispatch) => {

    if (!verifications || verifications.length === 0) return null
    return(
       <div>
            <div className="">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-orange-500" />
                <h3 className="text-lg font-bold">Fields Requiring Attention</h3>
              </div>
              <div className="space-y-4">
                {verifications && verifications
                  ?.filter((v) => !v.match)
                  .map((v, i) => {
                    const getFieldSection = (fieldName) => {
                      if (fieldName.toLowerCase().includes("full name")) {
                        return {
                          sectionId: "basicDetails",
                          fieldKey: "fullName",
                        };
                      }
                      if (
                        fieldName.toLowerCase().includes("date of birth") ||
                        fieldName.toLowerCase().includes("dob")
                      ) {
                        return {
                          sectionId: "basic",
                          fieldKey: "dateOfBirth",
                        };
                      }
                      if (fieldName.toLowerCase().includes("pan")) {
                        return {
                          sectionId: "panCard",
                          fieldKey: "panCardNumber",
                        };
                      }
                      if (fieldName.toLowerCase().includes("aadhaar number")) {
                        return {
                          sectionId: "aadhaar",
                          fieldKey: "aadhaarNumber",
                        };
                      }
                      return {
                        sectionId: "basic",
                        fieldKey: "fullName",
                      };
                    };
    
                    const fieldSection = getFieldSection(v.field);
    
                    {/* const scrollToField = () => {
                      if (fieldSection.ref.current) {
                        fieldSection.ref.current.scrollIntoView({
                          behavior: "smooth",
                          block: "center",
                        });
                        setHighlightedSection(
                          `${fieldSection.sectionId}-${fieldSection.fieldKey}`
                        );
                      }
                    }; */}

                    const handleCopyAndUpdate = (fieldName, value) => {
                      const fieldSection = getFieldSection(fieldName);
                  console.log(fieldName, value);
                      // Copy to clipboard
                      navigator.clipboard.writeText(value).then(() => {
                        toast.success("Copied and updated successfully!");
                      });
                  
                      // Dispatch Redux update
                      // if (fieldSection.action && fieldSection.key) {
                        console.log(fieldSection.fieldKey)
                        if(fieldSection.fieldKey === "aadhaarNumber"){
                          dispatch(updateAadhaar({aadhaarNumber:value}));
                        }if(fieldSection.fieldKey === "panCardNumber"){
                          console.log("panCardNumber")
                          dispatch(updatePanCard({panCardNumber:value}));
                        }
                      // }
                    };
    
                    return (
                      <div
                        key={i}
                        className="p-4 rounded-xl bg-card border border-border cursor-pointer hover:border-primary/50 transition-all
                       border-2 border-orange-500/50 backdrop-blur-xl bg-orange-500/5
                        "
                        // onClick={scrollToField}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="font-semibold">{v.field}</p>
                            <p className="text-sm text-muted-foreground">
                              From {v.document}
                            </p>
                          </div>
                          {/* <Badge
                            variant="outline"
                            className="border-orange-500 text-orange-500"
                          >
                            {v.matchPercentage}% match
                          </Badge> */}
                        </div>
                        <Separator className="my-3" />
                        <div className=" flex flex-col sm:grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground mb-1">
                              You entered:
                            </p>
                            <p className="font-semibold">{v.value}</p>
                          </div>
                          {/* <div>
                            <p className="text-muted-foreground mb-1">
                              Document shows:
                            </p>
                            <p className="font-semibold">{v.documentValue}</p>
                          </div> */}
                                           <div>
                    <p className="text-muted-foreground mb-1 flex items-center justify-between">
                      Document shows:
                    </p>
                    <p className="font-semibold flex items-center">{v.documentValue} 
                    <button
                        onClick={() => handleCopyAndUpdate(v.field, v.documentValue)}
                        className="ml-2 p-1 rounded-md  transition"
                        title="Copy & Update"
                      >
                        <Copy className="w-4 h-4 text-primary" />
                      </button>
                    </p>
                  </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>)}


/**
 * Recursively appends keys and values to FormData
 * Handles nested objects, arrays, and file fields
 */

export const convertToFormData = (data, formData = new FormData(), parentKey = "") => {
  Object.entries(data).forEach(([key, value]) => {
    const fieldKey = parentKey ? `${parentKey}.${key}` : key;

    if (value === null || value === undefined) {
      return; // skip nulls
    }

    // 🖼️ If the value is a File or Blob
    if (value instanceof File || value instanceof Blob) {
      formData.append(fieldKey, value);
    }
    // 📁 If the value is an object (but not a File)
    else if (typeof value === "object" && !(value instanceof Date)) {
      // If it's an empty object (e.g., {})
      if (Object.keys(value).length === 0) {
        formData.append(fieldKey, ""); // treat as empty
      } else {
        convertToFormData(value, formData, fieldKey);
      }
    }
    // 🗓️ Handle dates properly
    else if (value instanceof Date) {
      formData.append(fieldKey, value.toISOString());
    }
    // 🔢 or 📄 Handle strings/numbers/booleans normally
    else {
      formData.append(fieldKey, value);
    }
  });

  return formData;
};


export const FilePreview = ({ label, file, handleViewClick, onFileChange, isFileLoading,accept="image/*" ,canChange = true }) => {
  if (!file || Object.keys(file).length === 0) return null;

  const fileInputRef = useRef(null);

  // Detect file type (supports both API and local files)
  const isImage =
    (file?.type && file.type.startsWith("image/")) ||
    (file?.file_type && file.file_type.startsWith("image/"));

  // Determine proper file URL
  const fileUrl =
    file?.signed_url ||
    (file instanceof File ? URL.createObjectURL(file) : null);

  // Safe fallbacks
  const fileName = file?.name || file?.public_url?.split("/").pop() || "file";
  const fileSize = file?.size ? `${(file.size / 1024).toFixed(2)} KB` : "";

  // Handle file selection (when user clicks “Change File”)
  const handleFileChange = (e) => {
    const newFile = e.target.files?.[0];
    if (newFile && onFileChange) {
      onFileChange(newFile);
    }
    e.target.value = ""; // reset input
  };

  return (
    <div className="space-y-2">
      {label && (
        <span className="text-sm font-semibold text-foreground">{label}</span>
      )}

      <div
        className="relative bg-white group cursor-pointer rounded-xl border-2 border-border/50 hover:border-primary/50 transition-all overflow-hidden bg-secondary/30 hover:shadow-lg"
        onClick={() => isImage && handleViewClick && handleViewClick(fileUrl)}
      >
        {isFileLoading && !isImage && 
                  <div className="relative">
                  {/* 🌀 Image with loader */}
                  <img
                    src={fileUrl}
                    alt={label || "Uploaded image"}
                    className={`w-full h-48 object-contain bg-background/50 rounded-lg transition-opacity duration-300 ${
                      isFileLoading ? "opacity-0" : "opacity-100"
                    }`}
                    // onLoad={() => setIsImageLoading(false)}
                    onError={(e) => {
                      // setIsImageLoading(false);
                      e.target.style.display = "none";
                    }}
                  />     
               <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
              </div></div>}
        {isImage ? (
          <div className="relative">
            {/* 🌀 Image with loader */}
            <img
              src={fileUrl}
              alt={label || "Uploaded image"}
              className={`w-full h-48 object-contain bg-background/50 rounded-lg transition-opacity duration-300 ${
                isFileLoading ? "opacity-0" : "opacity-100"
              }`}
              // onLoad={() => setIsImageLoading(false)}
              onError={(e) => {
                // setIsImageLoading(false);
                e.target.style.display = "none";
              }}
            />

            {/* Loader overlay */}
            {isFileLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
              </div>
            )}

            {/* Hover overlay */}
            {!isFileLoading && (
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                <ImageIcon className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            )}
          </div>
        ) : (
          <div className="h-48 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 flex flex-col items-center justify-center gap-3">
            <FileText className="w-16 h-16 text-primary" />
            <p className="text-sm font-medium text-foreground truncate">
              {fileName}
            </p>
          </div>
        )}

        {/* Footer section */}
        <div className="p-3 rounded-b-md bg-background/80 backdrop-blur-sm border-t border-border/50 flex flex-col sm:flex-row items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground truncate break-all whitespace-normal w-full">{fileName}</p>
            {fileSize && (
              <p className="text-xs text-muted-foreground text-wrap w-full">{fileSize}</p>
            )}
          </div>

          {/* Change File button */}
          {canChange &&<div className="flex items-center gap-2 w-full sm:w-auto">
            <input
              ref={fileInputRef}
              type="file"
              accept={accept}
              className="hidden"
              onChange={handleFileChange}
            />
            <button
              type="button"
              disabled={isFileLoading}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                fileInputRef.current?.click();
              }}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all w-full sm:w-fit mt-2 sm:mt-0 justify-center"
            >
              <Upload className="w-4 h-4" />
              Change File
            </button>
          </div>}
        </div>
      </div>
    </div>
  );
};



export const validateEmail = (email) => {
  if (!email || email.trim() === "") {
    return "Email is required.";
  }

  // Basic email regex pattern (can be adjusted if needed)
  const emailRegex =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!emailRegex.test(email.trim())) {
    return "Please enter a valid email address (e.g., johndoe@example.com).";
  }

  return ""; // ✅ no error
};

export const validatePanCard = (pan) => {
  if (!pan || pan.trim() === "") {
    return "PAN card number is required.";
  }

  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

  if (!panRegex.test(pan.toUpperCase())) {
    return "Please enter a valid PAN card number (e.g., ABCDE1234F).";
  }

  return ""; // ✅ no error
};
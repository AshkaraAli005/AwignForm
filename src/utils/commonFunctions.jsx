import {
  FileText,
  Image as ImageIcon,
  AlertTriangle,
  X,
} from "lucide-react";

import { Badge } from "../Components/Ui/badge";
import { Separator } from "../Components/Ui/separator";
import { useRef } from "react";

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

 
 export const getVerificationRes = (verifications) => {
      if (!verifications || verifications.length === 0) {
    return <p>No verifications available.</p>;
  }
  
      const basicDetailsRef = useRef(null);
      const qualificationRef = useRef(null);
      const aadhaarRef = useRef(null);
      const panCardRef = useRef(null);
      const addressRef = useRef(null);
      const neighbourRef = useRef(null);
    return(
       <div>
            <div className="">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-orange-500" />
                <h3 className="text-lg font-bold">Fields Requiring Attention</h3>
              </div>
              <div className="space-y-4">
                {verifications
                  .filter((v) => !v.match)
                  .map((v, i) => {
                    const getFieldSection = (fieldName) => {
                      if (fieldName.toLowerCase().includes("full name")) {
                        return {
                          ref: basicDetailsRef,
                          sectionId: "basic",
                          fieldKey: "fullName",
                        };
                      }
                      if (
                        fieldName.toLowerCase().includes("date of birth") ||
                        fieldName.toLowerCase().includes("dob")
                      ) {
                        return {
                          ref: basicDetailsRef,
                          sectionId: "basic",
                          fieldKey: "dateOfBirth",
                        };
                      }
                      if (fieldName.toLowerCase().includes("pan")) {
                        return {
                          ref: panCardRef,
                          sectionId: "panCard",
                          fieldKey: "panCardNumber",
                        };
                      }
                      if (fieldName.toLowerCase().includes("aadhaar")) {
                        return {
                          ref: aadhaarRef,
                          sectionId: "aadhaar",
                          fieldKey: "",
                        };
                      }
                      return {
                        ref: basicDetailsRef,
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
                          <Badge
                            variant="outline"
                            className="border-orange-500 text-orange-500"
                          >
                            {v.matchPercentage}% match
                          </Badge>
                        </div>
                        <Separator className="my-3" />
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground mb-1">
                              You entered:
                            </p>
                            <p className="font-semibold">{v.value}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground mb-1">
                              Document shows:
                            </p>
                            <p className="font-semibold">{v.documentValue}</p>
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


export const FilePreview = ({ label, file, handleViewClick, handleRemove }) => {
  if (!file) return null;

  const isImage = file.type.startsWith("image/");
  const fileUrl = URL.createObjectURL(file);

  return (
    <div className="space-y-2">
      <span className="text-sm font-semibold text-foreground">{label}</span>
      <div
  className="relative group cursor-pointer rounded-xl border-2 border-border/50 hover:border-primary/50 transition-all overflow-hidden bg-secondary/30 hover:shadow-lg"
  onClick={() => isImage && handleViewClick(fileUrl)}
>
  {isImage ? (
    <div className="relative">
      <img
        src={fileUrl}
        alt={label}
        className="w-full h-48 object-contain bg-background/50 rounded-lg"
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
        <ImageIcon className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </div>
  ) : (
    <div className="h-48 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 flex flex-col items-center justify-center gap-3">
      <FileText className="w-16 h-16 text-primary" />
      <p className="text-sm font-medium text-foreground">{file.name}</p>
    </div>
  )}

  <div className="p-3 rounded-b-md bg-background/80 backdrop-blur-sm border-t border-border/50 flex items-center justify-between">
    <div>
      <p className="text-xs text-muted-foreground truncate">{file.name}</p>
      <p className="text-xs text-muted-foreground">
        {(file.size / 1024).toFixed(2)} KB
      </p>
    </div>
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation(); // ✅ prevents parent click from firing
        e.preventDefault();
        handleRemove();
      }}
      className="p-2.5 hover:bg-destructive/10 rounded-xl transition-all duration-200 group flex-shrink-0"
    >
      <X className="w-5 h-5 text-destructive group-hover:scale-110 transition-transform" />
    </button>
  </div>
</div>

    </div>
  );
};
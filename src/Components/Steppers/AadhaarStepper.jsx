import { CreditCard } from "lucide-react";
import FormField from "../FormField";
import FileUpload from "../FileUpload";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import { updateAadhaar } from "../../Store/formSlice";
import { useState } from "react";

const AadhaarStep = () => {
  const dispatch = useAppDispatch();
  const aadhaar = useAppSelector((state) => state.form.aadhaar);

    const [aadhaarInput, setAadhaarInput] = useState(
    aadhaar.aadhaarNumber
      ? aadhaar.aadhaarNumber.replace(/(\d{4})(?=\d)/g, "$1 ").trim()
      : ""
  );

  const handleAadhaarChange = (value) => {
    const numericValue = value.replace(/\D/g, "");
    const trimmedValue = numericValue.slice(0, 12);
    const formattedValue = trimmedValue.replace(/(\d{4})(?=\d)/g, "$1 ");
    setAadhaarInput(formattedValue);
    dispatch(updateAadhaar({ aadhaarNumber: trimmedValue }));
  };

  return (
    <div className="space-y-6">
      <FormField
        icon={CreditCard}
        label="Aadhaar Card Number"
        required
        value={aadhaarInput}
        onChange={handleAadhaarChange}
        placeholder="Enter 12-digit Aadhaar number"
        hint="Enter your 12-digit Aadhaar number without spaces"
      />

      <FileUpload
        label="Aadhaar Card Front Side Photo"
        hint="Upload clear photo of the front side of your Aadhaar card"
        required
        validationType="image"
        accept="image/*"
        value={aadhaar.aadhaarFrontPhoto}
        onFileSelect={(file) =>
          dispatch(updateAadhaar({ aadhaarFrontPhoto: file }))
        }
      />

      <FileUpload
        label="Aadhaar Card Back Side Photo"
        value={aadhaar.aadhaarBackPhoto}
        hint="Upload clear photo of the back side of your Aadhaar card"
        required
        validationType="image"
        accept="image/*"
        onFileSelect={(file) =>
          dispatch(updateAadhaar({ aadhaarBackPhoto: file }))
        }
      />
    </div>
  );
};

export default AadhaarStep;

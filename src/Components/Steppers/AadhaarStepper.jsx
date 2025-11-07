import { CreditCard } from "lucide-react";
import FormField from "../FormField";
import FileUpload from "../FileUpload";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import { updateAadhaar } from "../../Store/formSlice";

const AadhaarStep = () => {
  const dispatch = useAppDispatch();
  const aadhaar = useAppSelector((state) => state.form.aadhaar);

  return (
    <div className="space-y-6">
      <FormField
        icon={CreditCard}
        label="Aadhaar Card Number"
        required
        value={aadhaar.aadhaarNumber}
        onChange={(value) => dispatch(updateAadhaar({ aadhaarNumber: value }))}
        placeholder="Enter 12-digit Aadhaar number"
        hint="Enter your 12-digit Aadhaar number without spaces"
      />

      <FileUpload
        label="Aadhaar Card Front Side Photo"
        hint="Upload clear photo of the front side of your Aadhaar card"
        required
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
        onFileSelect={(file) =>
          dispatch(updateAadhaar({ aadhaarBackPhoto: file }))
        }
      />
    </div>
  );
};

export default AadhaarStep;

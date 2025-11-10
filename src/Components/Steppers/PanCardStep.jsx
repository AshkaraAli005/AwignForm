import { CreditCard, FileImage } from "lucide-react";
import FormField from "../FormField";
import FileUpload from "../FileUpload";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import { updatePanCard } from "../../Store/formSlice";
import { getVerificationRes, sanitizeInput, validatePanCard, validationRules } from "../../utils/commonFunctions";
import { useState } from "react";

const PanCardStep = () => {
  const dispatch = useAppDispatch();
    const formData = useAppSelector((state) => state.form);
    const fromEditClick = useAppSelector((state) => state.form.fromEditClick);
      const panCard = useAppSelector((state) => state.form.panCard);
    const [errors, setErrors] = useState({
    panCardNumber: "",
   });

    const panVerifications = [
    {
      field: "PAN Number",
      value: formData.panCard.panCardNumber,
      documentValue: "ABCDE1234F",
      match: formData.panCard.panCardNumber.toUpperCase() === "ABCDE1234F",
      matchPercentage: 100,
      document: "PAN Card Image",
    },
  ];

    const handlePanChange = (value) => {
      let val = sanitizeInput(value.toUpperCase(), validationRules.alphanumericWithoutSpace);
    dispatch(updatePanCard({ panCardNumber: val }));
    const error = validatePanCard(val);
    setErrors((prev) => ({ ...prev, panCardNumber: error }));
  };

  return (
    <div className="space-y-6">
    {fromEditClick && getVerificationRes(panVerifications)}
      <div>
        <FormField
          icon={CreditCard}
          label="PAN Card Number"
          required
          value={panCard.panCardNumber}
          onChange={handlePanChange}
          placeholder="Enter PAN card number"
        />
        {errors.panCardNumber && (
          <p className="text-red-500 text-xs pl-4 mt-1">
            {errors.panCardNumber}
          </p>
        )}
      </div>

      <FileUpload
        label="PAN Card Front Side Photo"
        hint="Upload the original, clear document."
        required
        value={panCard.panCardFrontPhoto}
        onFileSelect={(file) => dispatch(updatePanCard({ panCardFrontPhoto: file }))}
      />

      <FileUpload
        label="
        Upload 10th Passing Certificate or Marks Sheet Photo"
        required
        value={panCard.passingCertificate}
        onFileSelect={(file) => dispatch(updatePanCard({ passingCertificate: file }))}
      />
    </div>
  );
};

export default PanCardStep;

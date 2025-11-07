import { CreditCard, FileImage } from "lucide-react";
import FormField from "../FormField";
import FileUpload from "../FileUpload";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import { updatePanCard } from "../../Store/formSlice";
import { getVerificationRes } from "../../utils/commonFunctions";

const PanCardStep = () => {
  const dispatch = useAppDispatch();
    const formData = useAppSelector((state) => state.form);
    const fromEditClick = useAppSelector((state) => state.form.fromEditClick);

  const panCard = useAppSelector((state) => state.form.panCard);
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

  return (
    <div className="space-y-6">
    {fromEditClick && getVerificationRes(panVerifications)}
      <FormField
        icon={CreditCard}
        label="PAN Card Number"
        required
        value={panCard.panCardNumber}
        onChange={(value) => dispatch(updatePanCard({ panCardNumber: value }))}
        placeholder="Enter PAN card number"
      />

      <FileUpload
        label="PAN Card Front Side Photo"
        hint="Upload the original, clear document."
        required
        value={panCard.panCardFrontPhoto}
        onFileSelect={(file) => dispatch(updatePanCard({ panCardFrontPhoto: file }))}
      />

      <FileUpload
        label="PAN Card Back Side Photo"
        required
        value={panCard.panCardBackPhoto}
        onFileSelect={(file) => dispatch(updatePanCard({ panCardBackPhoto: file }))}
      />
    </div>
  );
};

export default PanCardStep;

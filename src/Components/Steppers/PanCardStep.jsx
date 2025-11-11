import { CreditCard, FileImage } from "lucide-react";
import FormField from "../FormField";
import FileUpload from "../FileUpload";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import { updateFiles, updateLoadingFiles, updatePanCard } from "../../Store/formSlice";
import { getVerificationRes, sanitizeInput, validatePanCard, validationRules } from "../../utils/commonFunctions";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { uploadAwignaFile } from "../../services/api";

const PanCardStep = () => {
  const dispatch = useAppDispatch();
    const formData = useAppSelector((state) => state.form);
    const fromEditClick = useAppSelector((state) => state.form.fromEditClick);
      const panCard = useAppSelector((state) => state.form.panCard);
    const [errors, setErrors] = useState({
    panCardNumber: "",
   });

   const {id} = useParams()

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
        value={formData?.files?.panCardFrontPhoto}
        onFileSelect={(file) =>{
          dispatch(updateLoadingFiles({ panCardFrontPhoto: true }))
          uploadAwignaFile(id, file, "panCardFrontPhoto").then((res) =>{
            dispatch(updateFiles({panCardFrontPhoto : res.data.files.panCardFrontPhoto}))
            dispatch(updateLoadingFiles({ panCardFrontPhoto: false }))
          }).catch((err) => {
            dispatch(updateFiles({panCardFrontPhoto : file}))
            dispatch(updateLoadingFiles({ panCardFrontPhoto: false }))
            console.log(err)})
        }}
        loading={formData?.loadingFiles?.panCardFrontPhoto}
      />

      <FileUpload
        label="
        Upload 10th Passing Certificate or Marks Sheet Photo"
        required
        value={formData?.files?.passingCertificate}
        onFileSelect={(file) =>{
          dispatch(updateLoadingFiles({ passingCertificate: true }))
          uploadAwignaFile(id, file, "passingCertificate").then((res) =>{
            dispatch(updateFiles({passingCertificate : res.data.files.passingCertificate}))
            dispatch(updateLoadingFiles({ passingCertificate: false }))
          }).catch((err) => {
            dispatch(updateFiles({passingCertificate : file}))
            dispatch(updateLoadingFiles({ passingCertificate: false }))
            console.log(err)})
        }}
        loading={formData?.loadingFiles?.passingCertificate}
      />
    </div>
  );
};

export default PanCardStep;

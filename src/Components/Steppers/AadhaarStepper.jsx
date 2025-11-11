import { CreditCard } from "lucide-react";
import FormField from "../FormField";
import FileUpload from "../FileUpload";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import { updateAadhaar, updateFiles, updateLoadingFiles } from "../../Store/formSlice";
import { useState } from "react";
import { initiateOcrExtract, uploadAwignaFile } from "../../services/api";
import { useParams } from "react-router-dom";
import { getVerificationRes } from "../../utils/commonFunctions";

const AadhaarStep = () => {
  const dispatch = useAppDispatch();
  const {id} = useParams()
  const aadhaar = useAppSelector((state) => state.form.aadhaar);
  const formData = useAppSelector((state) => state.form);
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

  console.log(formData.validationsData.aadhaarValidations)

  return (
    <div className="space-y-6">
      {formData?.validationsData?.aadhaarValidations?.match === false && getVerificationRes([formData.validationsData.aadhaarValidations])}
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
        value={formData.files.aadhaarFrontPhoto}
        onFileSelect={(file) =>{
          dispatch(updateLoadingFiles({aadhaarFrontPhoto: true}))
          uploadAwignaFile(id, file, "aadhaarFrontPhoto").then((response) => {
            dispatch(updateFiles({aadhaarFrontPhoto: response.data.files.aadhaarFrontPhoto}));
            dispatch(updateLoadingFiles({aadhaarFrontPhoto: false}))
            // initiateOcrExtract(id)
          })
        }
        }
        loading={formData.loadingFiles.aadhaarFrontPhoto}
      />

      <FileUpload
        label="Aadhaar Card Back Side Photo"
        value={formData.files.aadhaarBackPhoto}
        hint="Upload clear photo of the back side of your Aadhaar card"
        required
        validationType="image"
        accept="image/*"
        onFileSelect={(file) =>{
          dispatch(updateLoadingFiles({aadhaarBackPhoto: true}))
          uploadAwignaFile(id, file, "aadhaarBackPhoto").then((response) => {
            dispatch(updateFiles({aadhaarBackPhoto: response.data.files.aadhaarBackPhoto}));
            dispatch(updateLoadingFiles({aadhaarBackPhoto: false}))
            // initiateOcrExtract(id)
          })

        }}
        loading={formData.loadingFiles.aadhaarBackPhoto}
      />
    </div>
  );
};

export default AadhaarStep;

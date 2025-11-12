import { useEffect, useState } from "react";

import { AlertTriangle, CreditCard } from "lucide-react";
import FormField from "../FormField";
import FileUpload from "../FileUpload";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import { updateAadhaar, updateFiles, updateLoadingFiles } from "../../Store/formSlice";
import { initiateOcrExtract, uploadAwignaFile } from "../../services/api";
import { useParams } from "react-router-dom";
import { getVerificationRes } from "../../utils/commonFunctions";
import { Alert, AlertDescription } from "../Ui/alert";

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

  const isValidImage = formData?.validationsData?.aadhaarValidations?.defaultData?.format_valid === true

  

  const handleAadhaarChange = (value) => {
    const numericValue = value.replace(/\D/g, "");
    const trimmedValue = numericValue.slice(0, 12);
    const formattedValue = trimmedValue.replace(/(\d{4})(?=\d)/g, "$1 ");
    setAadhaarInput(formattedValue);
    dispatch(updateAadhaar({ aadhaarNumber: formattedValue }));
  };

  useEffect(()=>{
    if(aadhaar.aadhaarNumber){
      handleAadhaarChange(aadhaar.aadhaarNumber)
    }
  },[aadhaar.aadhaarNumber])

    // const isValidImage = !formData?.validationsData?.aadhaarValidations?.defaultData?.message.toLowerCase().includes("aadhaar number must be 12 digits")

  return (
    <div className="space-y-6">
      {formData?.validationsData?.aadhaarValidations?.match === false && isValidImage && getVerificationRes([formData.validationsData.aadhaarValidations], dispatch)}

      { formData?.validationsData?.aadhaarValidations?.defaultData?.format_valid === false && 
      <div className=" bg-orange-50 rounded-sm shadow-md flex px-6 py-5 gap-3 " style={{border:"1px solid #ffb456"}}>
      <AlertTriangle className="w-6 h-6 text-orange-500" />
      <div className="text-orange-800 dark:text-orange-200 font-medium">
          Important: The uploaded file is not valid or clear . Please upload a valid image.
      </div>
            </div>}
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
            initiateOcrExtract(id)
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

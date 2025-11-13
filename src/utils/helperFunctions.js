import { toast } from "sonner";
import { setHasCompletedExServiceman, setHasSelectedRole, setSummaryLoading, updateAadhaar, updateAddress, updateBasicDetails, updateFiles, updateNeighbour, updatePanCard, updateQualification, updateValidationsData } from "../Store/formSlice";
import { useAppDispatch } from "../Store/hooks";
import { getAwignFormData, updateAwignFormData, validateDataApi } from "../services/api";



export const extractInvalidFields = (data) => {
    if (!data || data.overall_status !== "invalid") return [];
  
    const result = [];
  
    Object.entries(data).forEach(([key, value]) => {
      if (value && typeof value === "object" && value.is_valid === false) {
        let field = "";
        let userValue = "";
        let documentValue = "";
        let document = "";
        let matchPercentage = null;
  
        switch (key) {
          case "name_validation":
            field = "Full Name";
            userValue = value.user_provided_name || "N/A";
            documentValue = value.aadhaar_name || value.pan_name || "N/A";
            document = value.aadhaar_name ? "Aadhaar" : "PAN";
            matchPercentage = value.aadhaar_similarity || value.pan_similarity || 0;
            break;
  
          case "dob_validation":
            field = "Date of Birth";
            userValue = value.user_dob_normalized || value.user_dob || "N/A";
            documentValue = value.aadhaar_dob_normalized || "N/A";
            document = "Aadhaar";
            break;
  
          case "pan_validation":
            field = "PAN Number";
            userValue = value.user_provided || "N/A";
            documentValue = value.extracted || "Not Found";
            document = "PAN Card";
            break;
  
          case "father_name_validation":
            field = "Father’s Name";
            userValue = value.user_provided_name || "N/A";
            documentValue = value.pan_name || "N/A";
            document = "PAN";
            break;
  
          case "aadhaar_validation":
            field = "Aadhaar Number";
            userValue = value.user_provided || "N/A";
            documentValue = value.extracted || "N/A";
            document = "Aadhaar Card";
            break;
  
          default:
            field = key.replace("_", " ");
            userValue = value.user_provided || "N/A";
            documentValue = value.extracted || "N/A";
        }
  
        result.push({
          field,
          value: userValue,
          documentValue,
          match: false,
          matchPercentage,
          document,
          message: value.message || "",
        });
      }
    });
  
    return result;
  };
  

  export const handleUplaodAndValidateSummary = async (id, formState , fieldToUpdate , value, dispatch) =>{

    const { files, loadingFiles,formErrors,validationsData,validations,isSummaryLoading, ...cleanedFormState } = formState;

    let payload
    if(fieldToUpdate === "Father’s Name"){
      payload = {basicDetails:{fatherName: value}}
    }else if(fieldToUpdate === "Date of Birth"){
        payload = {basicDetails:{dateOfBirth: value}}
    }else if(fieldToUpdate === "Full Name"){
      payload = {basicDetails:{fullName: value}}   
    }
    else{
      payload = {basicDetails:{[fieldToUpdate]: value}}
    }

    dispatch(setSummaryLoading(true));
    try {
   await updateAwignFormData(`/${id}`, payload);

    const res = await validateDataApi(id); 
    try{
    getAllApplicantData(id, dispatch);
      dispatch(updateValidationsData({completeValidations: res, extractedInvalidFields: extractInvalidFields(res)}));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    //   setSummaryLoading(false);

    }catch(error){
      toast.error("Aadhaar validation failed due to network error.");
      return;
    }
    dispatch(setSummaryLoading(false));
  } catch (error) {
    toast.error("Aadhaar validation failed due to network error.");
    return;
  }

  

  }


  export const getAllApplicantData = (id, dispatch) =>{
    getAwignFormData(`/${id}`)
    .then((res) => {
          let data = res.data;
          // dispatch(updateRole({ selectedRole: data?.selectedRole }));

          dispatch(setHasSelectedRole(true));
          dispatch(setHasCompletedExServiceman(true));
          dispatch(updateBasicDetails(data?.basicDetails ));
          dispatch(updateQualification(data?.qualification));
          dispatch(updateAadhaar(data?.aadhaar ));
          dispatch(updatePanCard(data?.panCard ));
          dispatch(updateAddress(data?.address ));
          dispatch(updateNeighbour(data?.neighbour));
          dispatch(updateFiles(data?.files));
          // dispatch(setCurrentStep(res?.current_page));
          dispatch(updateLoadingFiles({
            aadhaarFrontPhoto: false,
            aadhaarBackPhoto: false,
            panCardPhoto: false,
            addressProofPhoto: false,
            neighbourPhoto: false,
          }))
    }).catch((error) => {
      console.error("Error loading form data:", error);
      toast.error("Failed to load form data");
    });
  }
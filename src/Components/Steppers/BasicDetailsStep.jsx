import { User, Phone, Mail, Calendar, MapPin, CalendarIcon } from "lucide-react";
import FormField from "../FormField";
import FileUpload from "../FileUpload";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import { updateBasicDetails, updateFiles, updateFormErrors, updateLoadingFiles } from "../../Store/formSlice";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../Components/Ui/select";
import { Label } from "../../Components/Ui/label";
import { Button } from "../../Components/Ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../../Components/Ui/popover";
import { Calendar as CalendarComponent } from "../../Components/Ui/calendar";  
// import { Box, Typography } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { format } from "date-fns";
import { cn } from "../../lib/utils";
import { useEffect, useState } from "react";
import { validatePhone } from "../../utils/formValidation";
import { sanitizeInput, validateEmail, validationRules } from "../../utils/commonFunctions";
import { uploadAwignaFile } from "../../services/api";
import { useParams } from "react-router-dom";

const BasicDetailsStep = () => {
  const dispatch = useAppDispatch();
  const basicDetails = useAppSelector((state) => state.form.basicDetails);
  const formData = useAppSelector((state) => state.form);

  const [open, setOpen] = useState(false);
  const {id} = useParams()



    const handlePhoneChange = (value) => {
    dispatch(updateBasicDetails({ mobileNumber: value }));
    setErrors((prev) => ({ ...prev, mobileNumber: validatePhone(value) }));
  };

    const [errors, setErrors] = useState({
    fullName: "",
    mobileNumber: "",
    alternateMobileNumber: "",
    email: "",
    dateOfBirth: "",
    city: "",
    motherName: "",
    fatherName: "",
    passportPhoto: "",
    signaturePhoto: "",
  });

  useEffect(() => {
    const hasError = Object.values(errors).some(error => error !== "");
    dispatch(updateFormErrors({ basicDetails: hasError }));  },[errors, dispatch])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  },[])

    const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "fullName":
        if (!value.trim()) error = "Full name is required.";
        break;

      case "mobileNumber":
        error = validatePhone(value);
        break;

      case "alternateMobileNumber":
        if (!value.trim()) error = "Alternate mobile number is required.";
        else if (validatePhone(value))
          error = validatePhone(value);
        else if (value === basicDetails.mobileNumber)
          error = "Alternate number cannot be same as mobile number.";
        break;

      case "email":
        // if (!value.trim()) error = "Email is required.";
        // else if (!validationRules.email.test(value))
          error = validateEmail(value);
        break;

      case "dateOfBirth":
        if (!value) error = "Date of birth is required.";
        break;

      case "city":
        if (!value) error = "Please select a city.";
        break;

      case "motherName":
        if (!value.trim()) error = "Mother's name is required.";
        else if (value.trim().length < 2)
          error = "Please enter a valid name.";
        break;

      case "fatherName":
        if (!value.trim()) error = "Father's name is required.";
        else if (value.trim().length < 2)
          error = "Please enter a valid name.";
        break;

      case "passportPhoto":
        if (!value) error = "Passport photo is required.";
        break;

      case "signaturePhoto":
        if (!value) error = "Signature photo is required.";
        break;

      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
    return error;
  };

    const handleChange = (field, value) => {
    dispatch(updateBasicDetails({ [field]: value }));
    validateField(field, value);
  };

  return (
    <div className="space-y-6">
      <div>
        <FormField
          icon={User}
          label="Full Name"
          required
          value={basicDetails.fullName}
          placeholder="Enter full name"
          onChange={(value) =>
            handleChange("fullName", sanitizeInput(value, validationRules.name))
          }
          hint="Example - Abhishek Kumar Singh"
        />
        {errors.fullName && (
          <p className="text-red-500 text-xs pl-4 mt-1">{errors.fullName}</p>
        )}
      </div>
            <div>
        <FormField
          icon={Phone}
          label="Mobile number"
          required
          type="number"
          hint="Give an active phone number for registration & communication. Do not use already registered mobile numbers."
          value={basicDetails.mobileNumber}
          placeholder="Enter mobile number" 
          onChange={handlePhoneChange}
        />
        {errors.mobileNumber && (
          <p className="text-red-500 text-xs pl-4 mt-2">{errors.mobileNumber}</p>
        )}
      </div>
      <div>
        <FormField
          icon={Phone}
          label="Alternate Mobile Number"
          required
          type="number"
          value={basicDetails.alternateMobileNumber}
          placeholder="Enter alternate mobile number"
          onChange={(value) => handleChange("alternateMobileNumber", value)}
        />
        {errors.alternateMobileNumber && (
          <p className="text-red-500 text-xs pl-4 mt-1">
            {errors.alternateMobileNumber}
          </p>
        )}
      </div>


      <div>
        <FormField
          icon={Mail}
          label="Email ID (For Registration)"
          required
          type="email"
          value={basicDetails.email}
          placeholder="Enter Email ID"
          onChange={(value) =>  handleChange( "email", sanitizeInput(value, validationRules.email) )}
        />
        {errors.email && (
          <p className="text-red-500 text-xs pl-4 mt-1">{errors.email}</p>
        )}
      </div>

<div className="space-y-3 group animate-fade-in">
    <div>
        <Label className="flex items-center gap-2 text-sm font-medium">
           <div className="w-8 h-8 rounded-xl gradient-primary flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
          <Calendar className="w-4 h-4 text-white" />
        </div>
          Date of Birth
          <span className="text-destructive ml-1">*</span>
        </Label>
         <p className="text-xs text-muted-foreground leading-relaxed pl-10">Please mention valid DOB as per documents to avoid rejection.</p>
      </div>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              value={
                basicDetails.dateOfBirth
                  ? new Date(basicDetails.dateOfBirth)
                  : null
              }
              format="dd/MM/yyyy"
              disableFuture
              minDate={new Date("1900-01-01")}
              onChange={(newDate) => {
                if (newDate) {
                  dispatch(
                    updateBasicDetails({
                      dateOfBirth: format(newDate, "yyyy-MM-dd"),
                    })
                  );
                }
              }}
              sx={{ "& .MuiPickersInputBase-root":{
              border:"1px solid #e4e4e7",
                borderRadius:"0.75rem",
                height:"3rem"
              },

              }}
              slotProps={{
                textField: { size: "small", fullWidth: true },
                actionBar: {
                  actions: ["clear", "cancel", "accept"], // adds OK/Cancel buttons
                },
              }}
            />
          </LocalizationProvider>
      </div>

      <div className="space-y-2">
          <div>
        <Label className="flex items-center gap-2 text-sm font-medium">
           <div className="w-8 h-8 rounded-xl gradient-primary flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
          <MapPin className="w-4 h-4 text-white" />
        </div>
          City
          <span className="text-destructive ml-1">*</span>
        </Label>
      </div>
        <Select
          value={basicDetails.city}
          onValueChange={(value) => dispatch(updateBasicDetails({ city: value }))}
        >
          <SelectTrigger className=" data-[placeholder]:text-gray-400">
            <SelectValue placeholder="Select city" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="mumbai">Mumbai</SelectItem>
            <SelectItem value="delhi">Delhi</SelectItem>
            <SelectItem value="bangalore">Bangalore</SelectItem>
            <SelectItem value="kolkata">Kolkata</SelectItem>
            <SelectItem value="chennai">Chennai</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <FormField
        icon={User}
        label="Mother's Name"
        required
        placeholder="Enter mother's name"
        value={basicDetails.motherName}
        onChange={(value) => dispatch(updateBasicDetails({ motherName: sanitizeInput(value, validationRules.name) }))}
      />

      <FormField
        icon={User}
        label="Father's Name"
        required
        
        placeholder="Enter father's name"
        value={basicDetails.fatherName}
        onChange={(value) => dispatch(updateBasicDetails({ fatherName: sanitizeInput(value, validationRules.name) }))}
      />

      <FileUpload
        label="Passport size photo"
        required
        value={ formData?.files?.passportPhoto }
        onFileSelect={(file) =>{
          dispatch(updateLoadingFiles({ passportPhoto: true }))
          uploadAwignaFile(id, file, "passportPhoto").then((res) =>{
            dispatch(updateFiles(res.data.files))
            dispatch(updateLoadingFiles({ passportPhoto: false }))
          }).catch((err) => console.log(err))
        }}
        loading={formData?.loadingFiles?.passportPhoto}
      />

      <FileUpload
        label="Your signature's photo"
        required
        value={formData.files.signaturePhoto}
        onFileSelect={(file) =>{
          dispatch(updateLoadingFiles({ signaturePhoto: true }))
          uploadAwignaFile(id, file, "signaturePhoto").then((res) =>{
            dispatch(updateFiles(res.data.files))
            dispatch(updateLoadingFiles({ signaturePhoto: false }))
          }).catch((err) => console.log(err))
        }}
        loading={formData.loadingFiles.signaturePhoto}
      />
    </div>
  );
};

export default BasicDetailsStep;

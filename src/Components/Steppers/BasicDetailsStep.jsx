import { User, Phone, Mail, Calendar, MapPin, CalendarIcon } from "lucide-react";
import FormField from "../FormField";
import FileUpload from "../FileUpload";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import { updateBasicDetails } from "../../Store/formSlice";
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
import { sanitizeInput, validationRules } from "../../utils/commonFunctions";

const BasicDetailsStep = () => {
  const dispatch = useAppDispatch();
  const basicDetails = useAppSelector((state) => state.form.basicDetails);
  const [open, setOpen] = useState(false);

    const handlePhoneChange = (value) => {
    dispatch(updateBasicDetails({ mobileNumber: value }));
    setErrors((prev) => ({ ...prev, mobileNumber: validatePhone(value) }));
  };

    const [errors, setErrors] = useState({
    mobileNumber: "",
    email: "",
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  },[])

  return (
    <div className="space-y-6">
      <FormField
        icon={User}
        label="Full Name"
        hint="Example - Full Name - Abhishek Kumar Singh (First Name - Abhishek, Middle Name - Kumar, Last Name - Singh)"
        required
        value={basicDetails.fullName}
        placeholder="Enter full name"
        onChange={(value) => dispatch(updateBasicDetails({ fullName: sanitizeInput(value, validationRules.name) }))}
      />
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
      <FormField
        icon={Phone}
        label="Alternate Mobile Number"
        hint="Do not use this mobile number for any registrations."
        required
        type="number"
        value={basicDetails.alternateMobileNumber}
        placeholder="Enter alternate mobile number"
        onChange={(value) => dispatch(updateBasicDetails({ alternateMobileNumber: value }))}
      />


      <FormField
        icon={Mail}
        label="Email ID (For Registration)"
        hint="Email ID - To be used in registration."
        required
        type="email"
        value={basicDetails.email}
        placeholder="Enter Email ID"
        onChange={(value) => dispatch(updateBasicDetails({ email: sanitizeInput(value, validationRules.email) }))}
      />

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
        value={basicDetails.passportPhoto}
        onFileSelect={(file) => dispatch(updateBasicDetails({ passportPhoto: file }))}
      />

      <FileUpload
        label="Your signature's photo"
        required
        value={basicDetails.signaturePhoto}
        onFileSelect={(file) => dispatch(updateBasicDetails({ signaturePhoto: file }))}
      />
    </div>
  );
};

export default BasicDetailsStep;

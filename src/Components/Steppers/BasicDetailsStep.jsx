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
import { useState } from "react";
import { validatePhone } from "../../utils/formValidation";

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

  return (
    <div className="space-y-6">
      <FormField
        icon={User}
        label="Full Name"
        hint="Example - Full Name - Abhishek Kumar Singh (First Name - Abhishek, Middle Name - Kumar, Last Name - Singh)"
        required
        value={basicDetails.fullName}
        placeholder={"Name"}
        onChange={(value) => dispatch(updateBasicDetails({ fullName: value }))}
      />

      {/* <FormField
        icon={Phone}
        label="Mobile number"
        hint="Give an active phone number for registration & communication. Do not use already registered mobile numbers."
        required
        type="number"
        value={basicDetails.mobileNumber}
        onChange={(value) => dispatch(updateBasicDetails({ mobileNumber: value }))}
      /> */}

            <div>
        <FormField
          icon={Phone}
          label="Mobile number"
          required
          type="number"
          value={basicDetails.mobileNumber}
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
        onChange={(value) => dispatch(updateBasicDetails({ alternateMobileNumber: value }))}
      />


      <FormField
        icon={Mail}
        label="Email ID (For Registration)"
        hint="Email ID - To be used in registration."
        required
        type="email"
        value={basicDetails.email}
        onChange={(value) => dispatch(updateBasicDetails({ email: value }))}
      />

<div className="space-y-2">
<div>
        <Label className="flex items-center gap-2 text-sm font-medium">
          <div className="w-6 h-6 rounded bg-[hsl(var(--form-icon-bg))] text-[hsl(var(--form-icon-text))] flex items-center justify-center">
            <Calendar className="w-4 h-4" />
          </div>
          Date of Birth
          <span className="text-destructive ml-1">*</span>
        </Label>
        <p className="text-xs text-muted-foreground">Please mention valid DOB as per documents to avoid rejection.</p>
        </div>
        {/* <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal bg-background",
                !basicDetails.dateOfBirth && "text-muted-foreground"
              )}
            >
              <Calendar className="mr-2 h-4 w-4" />
              {basicDetails.dateOfBirth ? format(new Date(basicDetails.dateOfBirth), "PPP") : "Pick a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-background z-50" align="start">
            <CalendarComponent
              mode="single"
              selected={basicDetails.dateOfBirth ? new Date(basicDetails.dateOfBirth) : undefined}
              onSelect={(date) => date && dispatch(updateBasicDetails({ dateOfBirth: format(date, "yyyy-MM-dd") }))}
              disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
              initialFocus
              onClose={() => setPopoverOpen(false)}
              className="pointer-events-auto"
            />
          </PopoverContent>
        </Popover> */}
              {/* <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outlined"
            fullWidth
            className={cn(
              "justify-start text-left font-normal bg-background",
              !basicDetails.dateOfBirth && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {basicDetails.dateOfBirth
              ? format(new Date(basicDetails.dateOfBirth), "PPP")
              : "Pick a date"}
          </Button>
        </PopoverTrigger> */}
{/* 
        <PopoverContent
          className="p-3 bg-background z-50"
          align="start"
          sideOffset={4}
        > */}
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
        {/* </PopoverContent>
      </Popover> */}
      </div>

      <div className="space-y-2">
        <Label className="flex items-center gap-2 text-sm font-medium">
          <div className="w-6 h-6 rounded bg-[hsl(var(--form-icon-bg))] text-[hsl(var(--form-icon-text))] flex items-center justify-center">
            <MapPin className="w-4 h-4" />
          </div>
          City
          <span className="text-destructive ml-1">*</span>
        </Label>
        <Select
          value={basicDetails.city}
          onValueChange={(value) => dispatch(updateBasicDetails({ city: value }))}
        >
          <SelectTrigger className="bg-background">
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
        value={basicDetails.motherName}
        onChange={(value) => dispatch(updateBasicDetails({ motherName: value }))}
      />

      <FormField
        icon={User}
        label="Father's Name"
        required
        value={basicDetails.fatherName}
        onChange={(value) => dispatch(updateBasicDetails({ fatherName: value }))}
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

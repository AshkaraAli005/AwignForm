import { useState, useRef, useEffect } from "react";
import React from "react";
import {
  CheckCircle2,
  AlertCircle,
  FileText,
  Image as ImageIcon,
  Pencil,
  User,
  GraduationCap,
  CreditCard,
  Home,
  Users,
  AlertTriangle,
  Eye,
  FileCheck,
  Edit,
  Check,
  X,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import { Card,CardContent, CardHeader, CardTitle  } from "../../Components/Ui/card";
import { Badge } from "../../Components/Ui/badge";
import { cn } from "../../lib/utils";
import { Separator } from "../../Components/Ui/separator";
import { Input } from "../../Components/Ui/input";
import { Button } from "../../Components/Ui/button";
import { setCurrentStep, updateFromEditClick } from "../../Store/formSlice";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../Components/Ui/dialog";
import { Grid, TextField, Box, Typography, IconButton, CircularProgress } from "@mui/material";
import {
  updateBasicDetails,
  updateQualification,
  updateAadhaar,
  updatePanCard,
  updateAddress,
  updateNeighbour,
} from "../../Store/formSlice";
import { Alert, AlertDescription, AlertTitle } from "../../Components/Ui/alert";
import { FilePreview } from "../../utils/commonFunctions";
import { format } from "date-fns";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { extractInvalidFields, handleUplaodAndValidateSummary } from "../../utils/helperFunctions";
import { useParams } from "react-router-dom";
import EditFieldModal from "../EditingSummaryModal";




const SummaryStep = () => {
  const dispatch = useAppDispatch();
  const form = useAppSelector((state) => state.form);
  const formData = useAppSelector((state) => state.form);
console.log("formdata",formData);
  const [previewImage, setPreviewImage] = useState(null);
  const {id} = useParams()
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
const [selectedField, setSelectedField] = useState(null);
const [selectedImage, setSelectedImage] = useState(null);

    const [editingIndex, setEditingIndex] = useState(null);
  const [editedValue, setEditedValue] = useState("");
  const [isDateField, setIsDateField] = useState(false);

    const basicDetailsRef = useRef(null);
    const qualificationRef = useRef(null);
    const aadhaarRef = useRef(null);
    const panCardRef = useRef(null);
    const addressRef = useRef(null);
    const neighbourRef = useRef(null);

    // const ExtractedInvalidFields = formData.extractedInvalidFields;
    // const completeValidations = formData.completeValidations;
    // const [isLoading, setIsLoading] = useState(false);


    const handleSaveEdited = (fieldName, editedValue) =>{
      console.log("YEs yes")
      handleUplaodAndValidateSummary(id, formData, fieldName, editedValue, dispatch);
    }

  const Section = ({ title, children, icon: Icon, stepNumber }) => (
    <Card className="overflow-hidden border-2 border-border/50 hover:border-primary/20 transition-all hover:shadow-md">
      <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b border-border/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shadow-lg">
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl font-bold">{title}</CardTitle>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {dispatch(setCurrentStep(stepNumber));dispatch(updateFromEditClick(true)); window.scrollTo({ top: 0, behavior: 'smooth' });}}
            className="gap-2 hover:bg-primary/10"
          >
            <Pencil className="w-4 h-4" />
            Edit
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-6 space-y-3">{children}</CardContent>
    </Card>
  );

  const Field = ({ label, value }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 py-3 border-b border-border/30 last:border-0">
      <span className="text-sm font-semibold text-foreground">{label}</span>
      <span className="text-sm text-muted-foreground md:text-right break-words">
        {value || "Not provided"}
      </span>
    </div>
  );


  return (
    <div className="space-y-6 animate-fade-in">



      <Dialog open={!!previewImage} onOpenChange={() => setPreviewImage(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Image Preview</DialogTitle>
          </DialogHeader>
          {previewImage && (
            <img src={previewImage} alt="Preview" className="w-full h-auto rounded-lg" />
          )}
        </DialogContent>
      </Dialog>
      {formData?.validationsData?.extractedInvalidFields && formData?.validationsData?.extractedInvalidFields?.length > 0 && formData?.validationsData?.extractedInvalidFields.some(v => !v.match) && (
  <div className="border-none">
    <div className="flex items-center gap-3 mb-4">
      <AlertTriangle className="w-6 h-6 text-orange-500" />
      <h3 className="text-lg font-bold">Fields Requiring Attention</h3>
    </div>

    <div className="space-y-4">
      {formData?.validationsData?.extractedInvalidFields.filter(v => !v.match).map((v, i) => {
            const isDobField = v.field.toLowerCase().includes("date of birth") || v.field.toLowerCase().includes("dob");
        const getFieldSection = (fieldName) => {
          const lower = fieldName.toLowerCase();

          if (lower.includes("full name")) {
            return { ref: basicDetailsRef, sectionId: "basic", fieldKey: "fullName" };
          }
          if (lower.includes("date of birth") || lower.includes("dob")) {
            return { ref: basicDetailsRef, sectionId: "basic", fieldKey: "dateOfBirth" };
          }
          if (lower.includes("pan")) {
            return { ref: panCardRef, sectionId: "panCard", fieldKey: "panCardNumber" };
          }

          return { ref: basicDetailsRef, sectionId: "basic", fieldKey: "fullName" };
        };

        const fieldSection = getFieldSection(v.field);

        const scrollToField = () => {
          if (fieldSection.ref.current) {
            fieldSection.ref.current.scrollIntoView({ behavior: "smooth", block: "center" });
            setHighlightedSection(`${fieldSection.sectionId}-${fieldSection.fieldKey}`);
          }
        };

        return (
          <div
            key={i}
            className=" p-6 border-2 bg-[#fffbf5] border-orange-500/50 backdrop-blur-xl rounded-xl bg-card  cursor-pointer hover:shadow-lg transition-all"
            style={{backgroundColor:"#fffbf5"}}
            // onClick={scrollToField}
          >
            <div>
            <div className="flex items-start justify-between mb-2">
              <div className="flex justify-between w-full ">
              <div>
                <p className="font-semibold">{v.field}</p>
                <p className="text-sm text-muted-foreground">From {v.document}</p>
                {/* <p className="text-xs text-primary mt-1">Click to edit</p> */}
              </div>
              {editingIndex !== i && <button className="rounded-lg px-4 gap-2 h-8 py-1 hover:bg-primary/10 hover:shadow-md bg-white"  style={{border:"1px solid #d1d5db", display:'flex', alignItems:"center",}}
              //   onClick={() => {
              //   setEditingIndex(i);
              //   setEditedValue(v.value || "");
              //   setIsDateField(isDobField);
              // }}
              onClick={() => {
                setSelectedField({
                  index: i,
                  label: v.field,
                  value: v.value || "",
                  isDobField,
                  documentValue:v.documentValue
                });
                setSelectedImage(
                  v.document.toLowerCase().includes("pan")?form.files.panCardFrontPhoto:form.files.aadhaarFrontPhoto
                );
                setIsEditModalOpen(true);
              }}
              
              >
                <Edit className="w-4 h-4"/> Edit
              </button>}
              </div>
            </div>

            <Separator className="my-3" />

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground mb-1">You entered:</p>
                {/* <p className="font-semibold text-[16px]">{v.value}</p> */}
                        {editingIndex === i ? (
                          <div className="flex items-center">
                            {isDateField ? (
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                              <DatePicker
                                value={
                                  editedValue ? new Date(editedValue) : null
                                }
                                disableFuture
                                onChange={(newDate) => {
                                  if (newDate) {
                                    setEditedValue(format(newDate, "yyyy-MM-dd"));
                                  }
                                }}
                                slotProps={{
                                  textField: {
                                    size: "small",
                                    fullWidth: true,
                                    sx: {
                                      "& .MuiOutlinedInput-root": {
                                        borderRadius: "0.75rem",
                                      },
                                    },
                                  },
                                }}
                              />
                            </LocalizationProvider>):
                            <input
                            type="text"
                            className="w-full border-2 border-primary/30 focus:border-primary px-3 py-2 rounded-lg focus:outline-none"
                            value={editedValue}
                            onChange={(e) => setEditedValue(e.target.value)}
                            autoFocus
                          />}
                          <IconButton className="w-8 h-8 " onClick={() => {handleSaveEdited(v.field);setEditingIndex(null)}}><Check style={{color:"green"}} /></IconButton>
                          <IconButton className="w-8 h-8" onClick={() => setEditingIndex(null)} ><X style={{color:"red"}}/></IconButton> 

                          </div>
                        ) : (
                          <p className="font-semibold text-[16px]">
 {isDateField && v.value && !isNaN(new Date(v.value))
  ? format(new Date(v.value), "dd/MM/yyyy")
  : v.value || "N/A"}

                          </p>
                        )}
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Document shows:</p>
                <p className="font-semibold text-[16px]">{v.documentValue}</p>
              </div>
            </div>
          </div>
          <div className="mt-6">
          <FilePreview  handleViewClick={(imgUrl) => {setPreviewImage(imgUrl)}} file={v.document.toLowerCase().includes("pan")?form.files.panCardFrontPhoto:form.files.aadhaarFrontPhoto} canChange={false}/>
          </div>
          </div>
        );
      })}
    </div>
  </div>
)}

<EditFieldModal
  open={isEditModalOpen}
  onClose={() => setIsEditModalOpen(false)}
  fieldLabel={selectedField?.label || ""}
  fieldValue={selectedField?.value || ""}
  isDateField={selectedField?.isDobField}
  imageFile={selectedImage}
  allValues = {selectedField}
  onChange={(val) => setSelectedField((prev) => ({ ...prev, value: val }))}
  onSave={() => {
    handleSaveEdited(selectedField?.label, selectedField?.value);
    setIsEditModalOpen(false);
  }}
/>



      <Section title="Basic Details" icon={User} stepNumber={0}>
        {/* {getVerificationRes(basicVerifications)} */}
         {/* <Separator className="my-3" /> */}
        <Field label="Full Name" value={form.basicDetails.fullName} />
        <Field label="Mobile number" value={form.basicDetails.mobileNumber} />
        <Field label="Alternate Mobile Number" value={form.basicDetails.alternateMobileNumber} />
        <Field label="Email ID (For Registration)" value={form.basicDetails.email} />
        <Field label="Date of Birth" value={form.basicDetails.dateOfBirth} />
        <Field label="City" value={form.basicDetails.city} />
        <Field label="Mother's Name" value={form.basicDetails.motherName} />
        <Field label="Father's Name" value={form.basicDetails.fatherName} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <FilePreview label="Passport size photo" file={form.files.passportPhoto} handleViewClick={(imgUrl) => {setPreviewImage(imgUrl)}} canChange={false}/>
          <FilePreview label="Your signature's photo" file={form.files.signaturePhoto} handleViewClick={(imgUrl) => {setPreviewImage(imgUrl)}} canChange={false} />
        </div>
      </Section>

      <Section title="Qualification Details" icon={GraduationCap} stepNumber={1}>
        <Field label="Highest Education" value={form.qualification.highestEducation} />
        <Field label="Graduation Category" value={form.qualification.graduationCategory} />
        <FilePreview
          label="Upload Final Marksheet or Passing Certificate of Highest Qualification"
          file={form.files.marksheetFile}
          handleViewClick={(imgUrl) => {setPreviewImage(imgUrl)}}
          canChange={false}
        />
      </Section>

      <Section title="Aadhaar Details" icon={CreditCard} stepNumber={2}>
        <Field label="Aadhaar Card Number" value={form.aadhaar.aadhaarNumber} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <FilePreview label="Aadhaar Card Front Side Photo" handleViewClick={(imgUrl) => {setPreviewImage(imgUrl)}} file={form.files.aadhaarFrontPhoto} canChange={false} />
          <FilePreview label="Aadhaar Card Back Side Photo" handleViewClick={(imgUrl) => {setPreviewImage(imgUrl)}} file={form.files.aadhaarBackPhoto} canChange={false} />
        </div>
      </Section>

      <Section title="PAN Card Details" icon={CreditCard} stepNumber={3}>
        {/* {getVerificationRes(panVerifications)} */}
        <Field label="PAN Card Number" value={form.panCard.panCardNumber} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <FilePreview label="PAN Card Front Side Photo" file={form.files.panCardFrontPhoto} handleViewClick={(imgUrl) => {setPreviewImage(imgUrl)}} canChange={false}/>
          <FilePreview
            label="PAN Card Back Side Photo"
            file={form.files.passingCertificate}
            canChange={false}
            handleViewClick={(imgUrl) => {setPreviewImage(imgUrl)}}
          />
        </div>
      </Section>

      <Section title="Address Details" icon={Home} stepNumber={4}>
        <Field label="House number" value={form.address.houseNumber} />
        <Field label="Street name" value={form.address.streetName} />
        <Field label="Locality" value={form.address.locality} />
        <Field label="Landmark" value={form.address.landmark} />
        <Field label="District" value={form.address.district} />
        <Field label="State" value={form.address.state} />
        <Field label="Pincode" value={form.address.pincode} />
        <Field
          label="Permanent Address Same as Current Address"
          value={form.address.permanentSameAsCurrent}
          canChange={false}
        />
        {form.files.addressProofFile && form.files.addressProofFile.map((file) => (<FilePreview
          label="Upload Permanent Address Proof (Minimum Last 10 Years Address proof)"
          file={file}
          canChange={false}
          handleViewClick={(imgUrl) => {setPreviewImage(imgUrl)}}
        />))}
      </Section>

      {/* <Section title="Neighbour Details" icon={Users} stepNumber={5}>
        <Field label="Neighbor 1 Details" value={form.neighbour.neighbor1Details} />
        <Field label="Neighbor 2 Details" value={form.neighbour.neighbor2Details} />
        <Field label="Nearest Police Station" value={form.neighbour.nearestPoliceStation} />
        <Field label="How Did You Know" value={form.neighbour.howDidYouKnow} />
      </Section> */}

        <Section title="Neighbor Information" icon={Users}>
        <h2 className="text-lg font-semibold mb-2">Neighbor 1</h2>
        <Field label="Name" value={formData.neighbour.neighbor1Name} fieldKey="neighbor1Name" section="neighbour" />
        <Field label="Mobile Number" value={formData.neighbour.neighbor1Mobile} fieldKey="neighbor1Mobile" section="neighbour" />
        <Field label="Address" value={formData.neighbour.neighbor1Address} fieldKey="neighbor1Address" section="neighbour" />
        
        <Separator className="my-4" />
        
        <h4 className="text-lg font-semibold mb-2">Neighbor 2</h4>
        <Field label="Name" value={formData.neighbour.neighbor2Name} fieldKey="neighbor2Name" section="neighbour" />
        <Field label="Mobile Number" value={formData.neighbour.neighbor2Mobile} fieldKey="neighbor2Mobile" section="neighbour" />
        <Field label="Address" value={formData.neighbour.neighbor2Address} fieldKey="neighbor2Address" section="neighbour" />
        
        <Separator className="my-4" />
        
        <Field label="Nearest Police Station" value={formData.neighbour.nearestPoliceStation} fieldKey="nearestPoliceStation" section="neighbour" />
        <Field label="How did you know" value={formData.neighbour.howDidYouKnow} fieldKey="howDidYouKnow" section="neighbour" />
      </Section>
    </div>
  );
};

export default SummaryStep;


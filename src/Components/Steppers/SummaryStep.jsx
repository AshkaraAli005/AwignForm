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
import { Grid, TextField, Box, Typography, IconButton } from "@mui/material";
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




const SummaryStep = () => {
  const dispatch = useAppDispatch();
  const form = useAppSelector((state) => state.form);
  const formData = useAppSelector((state) => state.form);
console.log("formdata",formData);
  const [previewImage, setPreviewImage] = useState(null);

    const [editingIndex, setEditingIndex] = useState(null);
  const [editedValue, setEditedValue] = useState("");

      const panVerifications = [
    {
      field: "PAN Number",
      value: formData.panCard.panCardNumber,
      documentValue: "ABCDE1234F",
      match: formData.panCard.panCardNumber.toUpperCase() === "ABCDE1234F",
      matchPercentage: 100,
      document: "PAN Card Image",
    },
    // {
    //   field: "Aadhaar Number",
    //   value: formData.aadhaar.aadhaarNumber,
    //   documentValue: "432112345632",
    //   match: formData.aadhaar.aadhaarNumber?.toUpperCase() === "432112345632",
    //   matchPercentage: 92,
    //   document: "PAN Card Image",
    // },
  ];

    const verifications = [
    {
      field: "Full Name",
      value: formData.basicDetails.fullName,
      documentValue: "John Michael Doe",
      match: formData.basicDetails.fullName.toLowerCase().includes("john"),
      matchPercentage: 95,
      document: "Aadhaar Card",
    },
    {
      field: "Date of Birth",
      value: formData.basicDetails.dateOfBirth,
      documentValue: "1990-05-15",
      match: formData.basicDetails.dateOfBirth === "1990-05-15",
      matchPercentage: 100,
      document: "PAN Card",
    },
        {
      field: "Aadhaar Number",
      value: formData.aadhaar.aadhaarNumber,
      documentValue: "432112345632",
      match: formData.aadhaar.aadhaarNumber?.toUpperCase() === "432112345632",
      matchPercentage: 92,
      document: "PAN Card Image",
    },
  ];
      const basicVerifications = [
    {
      field: "Full Name",
      value: formData.basicDetails.fullName,
      documentValue: "John Michael Doe",
      match: formData.basicDetails.fullName.toLowerCase().includes("john"),
      matchPercentage: 95,
      document: "Aadhaar Card",
    },
    {
      field: "Date of Birth",
      value: formData.basicDetails.dateOfBirth,
      documentValue: "1990-05-15",
      match: formData.basicDetails.dateOfBirth === "1990-05-15",
      matchPercentage: 100,
      document: "PAN Card",
    },
        {
      field: "Aadhaar Number",
      value: formData.aadhaar.aadhaarNumber,
      documentValue: "432112345632",
      match: formData.aadhaar.aadhaarNumber?.toUpperCase() === "432112345632",
      matchPercentage: 92,
      document: "PAN Card Image",
    },
  ];

    const basicDetailsRef = useRef(null);
    const qualificationRef = useRef(null);
    const aadhaarRef = useRef(null);
    const panCardRef = useRef(null);
    const addressRef = useRef(null);
    const neighbourRef = useRef(null);

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

  // const FilePreview = ({ label, file }) => {
  //   if (!file) return null;
  //   let isMultipleFiles = false;
  //   if(Array.isArray(file)){
  //     isMultipleFiles = true;
  //   }
  //   const isImage = !isMultipleFiles && file.type.startsWith("image/");
  //   const fileUrl = !isMultipleFiles && URL.createObjectURL(file);

  //   return (
  //     !isMultipleFiles ?<div className="space-y-2">
  //       <span className="text-sm font-semibold text-foreground">{label}</span>
  //       <div
  //         className="relative group cursor-pointer rounded-xl border-2 border-border/50 hover:border-primary/50 transition-all overflow-hidden bg-secondary/30 hover:shadow-lg"
  //         onClick={() => isImage && setPreviewImage(fileUrl)}
  //       >
  //         {isImage ? (
  //           <div className="relative">
  //             <img
  //               src={fileUrl}
  //               alt={label}
  //               className="w-full h-48 object-contain bg-background/50 rounded-lg"
  //             />
  //             <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
  //               <ImageIcon className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
  //             </div>
  //           </div>
  //         ) : (
  //           <div className="h-48 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 flex flex-col items-center justify-center gap-3">
  //             <FileText className="w-16 h-16 text-primary" />
  //             <p className="text-sm font-medium text-foreground">{file.name}</p>
  //           </div>
  //         )}
  //         <div className="p-3 rounded-b-md bg-background/80 backdrop-blur-sm border-t border-border/50">
  //           <p className="text-xs text-muted-foreground truncate">{file.name}</p>
  //           <p className="text-xs text-muted-foreground">
  //             {(file.size / 1024).toFixed(2)} KB
  //           </p>
  //         </div>
  //       </div>
  //     </div> :  
  //      <div className="space-y-2">
  //         {file.map((f, index) => (
            
  //           <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 border border-border/50">
  //             <div className="flex items-center gap-2">
  //               {f.type.startsWith("image/") ?
  //                <div className="relative group">
  //                     <img
  //                       src={URL.createObjectURL(f)}
  //                       alt="Preview"
  //                       className="w-20 h-20 object-cover rounded-xl shadow-md ring-2 ring-primary/20"
  //                     />
  //                     <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 rounded-xl transition-colors" />
  //                   </div>: 
  //                   <div className="w-20 h-20 rounded-xl gradient-primary flex items-center justify-center shadow-md">
  //                     <FileCheck className="w-8 h-8 text-white" />
  //               </div>}
  //               <div>
  //                 <p className="text-sm font-medium">{label} {file.length > 1 ? `(${index + 1}/${file.length})` : ''}</p>
  //                 <p className="text-xs text-muted-foreground">{f.name}</p>
  //               </div>
  //             </div>
  //             <Button
  //               size="sm"
  //               variant="outline"
  //               onClick={() =>  setPreviewImage(URL.createObjectURL(f))}
  //               className="h-8 gap-1"
  //             >
  //               <Eye className="w-3 h-3" />
  //               Preview
  //             </Button>
  //           </div>
  //         ))}
  //       </div>
  //   );
  // };

  // const getVerificationRes = (verifications) => {
  //     if (!verifications || verifications.length === 0) {
  //   return <p>No verifications available.</p>;
  // }
  //   return(
  //      <div>
  //           <div className="">
  //             <div className="flex items-center gap-3 mb-4">
  //               <AlertTriangle className="w-6 h-6 text-orange-500" />
  //               <h3 className="text-lg font-bold">Fields Requiring Attention</h3>
  //             </div>
  //             <div className="space-y-4">
  //               {verifications
  //                 .filter((v) => !v.match)
  //                 .map((v, i) => {
  //                   const getFieldSection = (fieldName) => {
  //                     if (fieldName.toLowerCase().includes("full name")) {
  //                       return {
  //                         ref: basicDetailsRef,
  //                         sectionId: "basic",
  //                         fieldKey: "fullName",
  //                       };
  //                     }
  //                     if (
  //                       fieldName.toLowerCase().includes("date of birth") ||
  //                       fieldName.toLowerCase().includes("dob")
  //                     ) {
  //                       return {
  //                         ref: basicDetailsRef,
  //                         sectionId: "basic",
  //                         fieldKey: "dateOfBirth",
  //                       };
  //                     }
  //                     if (fieldName.toLowerCase().includes("pan")) {
  //                       return {
  //                         ref: panCardRef,
  //                         sectionId: "panCard",
  //                         fieldKey: "panCardNumber",
  //                       };
  //                     }
  //                     if (fieldName.toLowerCase().includes("aadhaar")) {
  //                       return {
  //                         ref: aadhaarRef,
  //                         sectionId: "aadhaar",
  //                         fieldKey: "",
  //                       };
  //                     }
  //                     return {
  //                       ref: basicDetailsRef,
  //                       sectionId: "basic",
  //                       fieldKey: "fullName",
  //                     };
  //                   };
    
  //                   const fieldSection = getFieldSection(v.field);
    
  //                   const scrollToField = () => {
  //                     if (fieldSection.ref.current) {
  //                       fieldSection.ref.current.scrollIntoView({
  //                         behavior: "smooth",
  //                         block: "center",
  //                       });
  //                       setHighlightedSection(
  //                         `${fieldSection.sectionId}-${fieldSection.fieldKey}`
  //                       );
  //                     }
  //                   };
    
  //                   return (
  //                     <div
  //                       key={i}
  //                       className="p-4 rounded-xl bg-card border border-border cursor-pointer hover:border-primary/50 transition-all
  //                      border-2 border-orange-500/50 backdrop-blur-xl bg-orange-500/5
  //                       "
  //                       onClick={scrollToField}
  //                     >
  //                       <div className="flex items-start justify-between mb-2">
  //                         <div>
  //                           <p className="font-semibold">{v.field}</p>
  //                           <p className="text-sm text-muted-foreground">
  //                             From {v.document}
  //                           </p>
  //                         </div>
  //                         <Badge
  //                           variant="outline"
  //                           className="border-orange-500 text-orange-500"
  //                         >
  //                           {v.matchPercentage}% match
  //                         </Badge>
  //                       </div>
  //                       <Separator className="my-3" />
  //                       <div className="grid grid-cols-2 gap-4 text-sm">
  //                         <div>
  //                           <p className="text-muted-foreground mb-1">
  //                             You entered:
  //                           </p>
  //                           <p className="font-semibold">{v.value}</p>
  //                         </div>
  //                         <div>
  //                           <p className="text-muted-foreground mb-1">
  //                             Document shows:
  //                           </p>
  //                           <p className="font-semibold">{v.documentValue}</p>
  //                         </div>
  //                       </div>
  //                     </div>
  //                   );
  //                 })}
  //             </div>
  //           </div>
  //         </div>)}

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
      {verifications.some(v => !v.match) && (
  <div className="border-none">
    <div className="flex items-center gap-3 mb-4">
      <AlertTriangle className="w-6 h-6 text-orange-500" />
      <h3 className="text-lg font-bold">Fields Requiring Attention</h3>
    </div>

    <div className="space-y-4">
      {verifications.filter(v => !v.match).map((v, i) => {
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
              {editingIndex !== i && <button className="rounded-md px-4 gap-2 h-8 py-1 hover:bg-primary/10 hover:shadow-md"  style={{border:"1px solid #d1d5db", display:'flex', alignItems:"center",}}
                onClick={() => {
                setEditingIndex(i);
                setEditedValue(v.value || "");
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
                          <div className="flex items-center"><input
                            type="text"
                            className="w-full border-2 border-primary/30 focus:border-primary px-3 py-2 rounded-lg focus:outline-none"
                            value={editedValue}
                            onChange={(e) => setEditedValue(e.target.value)}
                            autoFocus
                          />
                          <IconButton className="w-8 h-8 "><Check style={{color:"green"}}/></IconButton>
                          <IconButton className="w-8 h-8" onClick={() => setEditingIndex(null)} ><X style={{color:"red"}}/></IconButton> 

                          </div>
                        ) : (
                          <p className="font-semibold text-[16px]">
                            {v.value}
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
          <FilePreview label="Passport size photo" file={form.files.passportPhoto} handleViewClick={(imgUrl) => {setPreviewImage(imgUrl)}}/>
          <FilePreview label="Your signature's photo" file={form.files.signaturePhoto} handleViewClick={(imgUrl) => {setPreviewImage(imgUrl)}} />
        </div>
      </Section>

      <Section title="Qualification Details" icon={GraduationCap} stepNumber={1}>
        <Field label="Highest Education" value={form.qualification.highestEducation} />
        <Field label="Graduation Category" value={form.qualification.graduationCategory} />
        <FilePreview
          label="Upload Final Marksheet or Passing Certificate of Highest Qualification"
          file={form.qualification.marksheetFile}
          handleViewClick={(imgUrl) => {setPreviewImage(imgUrl)}}
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
          <FilePreview label="PAN Card Front Side Photo" file={form.files.panCardFrontPhoto} handleViewClick={(imgUrl) => {setPreviewImage(imgUrl)}}/>
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
        <FilePreview
          label="Upload Permanent Address Proof (Minimum Last 10 Years Address proof)"
          file={form.files.addressProofFile}
          canChange={false}
          handleViewClick={(imgUrl) => {setPreviewImage(imgUrl)}}
        />
      </Section>

      <Section title="Neighbour Details" icon={Users} stepNumber={5}>
        <Field label="Neighbor 1 Details" value={form.neighbour.neighbor1Details} />
        <Field label="Neighbor 2 Details" value={form.neighbour.neighbor2Details} />
        <Field label="Nearest Police Station" value={form.neighbour.nearestPoliceStation} />
        <Field label="How Did You Know" value={form.neighbour.howDidYouKnow} />
      </Section>
    </div>
  );
};

export default SummaryStep;


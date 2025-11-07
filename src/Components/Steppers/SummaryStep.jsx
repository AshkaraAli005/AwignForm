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
import { Grid, TextField, Box, Typography } from "@mui/material";
import {
  updateBasicDetails,
  updateQualification,
  updateAadhaar,
  updatePanCard,
  updateAddress,
  updateNeighbour,
} from "../../Store/formSlice";
import { Alert, AlertDescription, AlertTitle } from "../../Components/Ui/alert";




const SummaryStep = () => {
  const dispatch = useAppDispatch();
  const form = useAppSelector((state) => state.form);
  const formData = useAppSelector((state) => state.form);
console.log("formdata",formData);
  const [previewImage, setPreviewImage] = useState(null);

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
            onClick={() => {dispatch(setCurrentStep(stepNumber));dispatch(updateFromEditClick(true));}}
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

  const FilePreview = ({ label, file }) => {
    if (!file) return null;

    const isImage = file.type.startsWith("image/");
    const fileUrl = URL.createObjectURL(file);

    return (
      <div className="space-y-2">
        <span className="text-sm font-semibold text-foreground">{label}</span>
        <div
          className="relative group cursor-pointer rounded-xl border-2 border-border/50 hover:border-primary/50 transition-all overflow-hidden bg-secondary/30 hover:shadow-lg"
          onClick={() => isImage && setPreviewImage(fileUrl)}
        >
          {isImage ? (
            <div className="relative">
              <img
                src={fileUrl}
                alt={label}
                className="w-full h-48 object-contain bg-background/50 rounded-lg"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                <ImageIcon className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          ) : (
            <div className="h-48 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 flex flex-col items-center justify-center gap-3">
              <FileText className="w-16 h-16 text-primary" />
              <p className="text-sm font-medium text-foreground">{file.name}</p>
            </div>
          )}
          <div className="p-3 bg-background/80 backdrop-blur-sm border-t border-border/50">
            <p className="text-xs text-muted-foreground truncate">{file.name}</p>
            <p className="text-xs text-muted-foreground">
              {(file.size / 1024).toFixed(2)} KB
            </p>
          </div>
        </div>
      </div>
    );
  };

  const getVerificationRes = (verifications) => {
      if (!verifications || verifications.length === 0) {
    return <p>No verifications available.</p>;
  }
    return(
       <div>
            <div className="">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-orange-500" />
                <h3 className="text-lg font-bold">Fields Requiring Attention</h3>
              </div>
              <div className="space-y-4">
                {verifications
                  .filter((v) => !v.match)
                  .map((v, i) => {
                    const getFieldSection = (fieldName) => {
                      if (fieldName.toLowerCase().includes("full name")) {
                        return {
                          ref: basicDetailsRef,
                          sectionId: "basic",
                          fieldKey: "fullName",
                        };
                      }
                      if (
                        fieldName.toLowerCase().includes("date of birth") ||
                        fieldName.toLowerCase().includes("dob")
                      ) {
                        return {
                          ref: basicDetailsRef,
                          sectionId: "basic",
                          fieldKey: "dateOfBirth",
                        };
                      }
                      if (fieldName.toLowerCase().includes("pan")) {
                        return {
                          ref: panCardRef,
                          sectionId: "panCard",
                          fieldKey: "panCardNumber",
                        };
                      }
                      if (fieldName.toLowerCase().includes("aadhaar")) {
                        return {
                          ref: aadhaarRef,
                          sectionId: "aadhaar",
                          fieldKey: "",
                        };
                      }
                      return {
                        ref: basicDetailsRef,
                        sectionId: "basic",
                        fieldKey: "fullName",
                      };
                    };
    
                    const fieldSection = getFieldSection(v.field);
    
                    const scrollToField = () => {
                      if (fieldSection.ref.current) {
                        fieldSection.ref.current.scrollIntoView({
                          behavior: "smooth",
                          block: "center",
                        });
                        setHighlightedSection(
                          `${fieldSection.sectionId}-${fieldSection.fieldKey}`
                        );
                      }
                    };
    
                    return (
                      <div
                        key={i}
                        className="p-4 rounded-xl bg-card border border-border cursor-pointer hover:border-primary/50 transition-all
                       border-2 border-orange-500/50 backdrop-blur-xl bg-orange-500/5
                        "
                        onClick={scrollToField}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="font-semibold">{v.field}</p>
                            <p className="text-sm text-muted-foreground">
                              From {v.document}
                            </p>
                          </div>
                          <Badge
                            variant="outline"
                            className="border-orange-500 text-orange-500"
                          >
                            {v.matchPercentage}% match
                          </Badge>
                        </div>
                        <Separator className="my-3" />
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground mb-1">
                              You entered:
                            </p>
                            <p className="font-semibold">{v.value}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground mb-1">
                              Document shows:
                            </p>
                            <p className="font-semibold">{v.documentValue}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>)}

  return (
    <div className="space-y-6 animate-fade-in">
      <Alert className="border-primary/50 bg-primary/5 shadow-sm">
        <CheckCircle2 className="h-5 w-5 text-primary" />
        <AlertTitle className="text-lg font-bold">Review Your Information</AlertTitle>
        <AlertDescription className="text-sm">
          Please review all your information carefully before submitting. You can edit any section
          by clicking the edit button.
        </AlertDescription>
      </Alert>

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

      {/* Document Verification Requirements */}
      <Card className="border-2 border-blue-500/50 bg-blue-500/5">
        <CardHeader>
          <div className="flex items-start gap-4 align-middle">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-lg flex-shrink-0">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-xl font-bold text-blue-700 dark:text-blue-400">
                Document Verification Requirements
              </CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0"></span>
              <span>
                The <strong>name</strong> and <strong>father's name</strong> must exactly match the
                provided ID card, maintaining the same sequence, order, and spacing (first, middle,
                and last names should be identical).
              </span>
            </p>
            <p className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0"></span>
              <span>
                <strong>Date of Birth (DOB)</strong> must match the ID card.
              </span>
            </p>
            <p className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0"></span>
              <span>
                <strong>Father's name</strong> is mandatory on the ID card.
              </span>
            </p>
            <p className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0"></span>
              <span>
                <strong>Signature</strong> is mandatory on the ID card.
              </span>
            </p>
            <p className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0"></span>
              <span>
                <strong>DOB</strong> must be mentioned on the ID card.
              </span>
            </p>
            <p className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0"></span>
              <span>
                Document image quality should be <strong>clear and legible</strong>.
              </span>
            </p>
          </div>
        </CardContent>
      </Card>

      <Section title="Basic Details" icon={User} stepNumber={0}>
        {getVerificationRes(basicVerifications)}
         <Separator className="my-3" />
        <Field label="Full Name" value={form.basicDetails.fullName} />
        <Field label="Mobile number" value={form.basicDetails.mobileNumber} />
        <Field label="Alternate Mobile Number" value={form.basicDetails.alternateMobileNumber} />
        <Field label="Email ID (For Registration)" value={form.basicDetails.email} />
        <Field label="Date of Birth" value={form.basicDetails.dateOfBirth} />
        <Field label="City" value={form.basicDetails.city} />
        <Field label="Mother's Name" value={form.basicDetails.motherName} />
        <Field label="Father's Name" value={form.basicDetails.fatherName} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <FilePreview label="Passport size photo" file={form.basicDetails.passportPhoto} />
          <FilePreview label="Your signature's photo" file={form.basicDetails.signaturePhoto} />
        </div>
      </Section>

      <Section title="Qualification Details" icon={GraduationCap} stepNumber={1}>
        <Field label="Highest Education" value={form.qualification.highestEducation} />
        <Field label="Graduation Category" value={form.qualification.graduationCategory} />
        <FilePreview
          label="Upload Final Marksheet or Passing Certificate of Highest Qualification"
          file={form.qualification.marksheetFile}
        />
      </Section>

      <Section title="Aadhaar Details" icon={CreditCard} stepNumber={2}>
        <Field label="Aadhaar Card Number" value={form.aadhaar.aadhaarNumber} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <FilePreview label="Aadhaar Card Front Side Photo" file={form.aadhaar.aadhaarFrontPhoto} />
          <FilePreview label="Aadhaar Card Back Side Photo" file={form.aadhaar.aadhaarBackPhoto} />
        </div>
      </Section>

      <Section title="PAN Card Details" icon={CreditCard} stepNumber={3}>
        {getVerificationRes(panVerifications)}
        <Field label="PAN Card Number" value={form.panCard.panCardNumber} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <FilePreview label="PAN Card Front Side Photo" file={form.panCard.panCardFrontPhoto} />
          <FilePreview
            label="PAN Card Back Side Photo"
            file={form.panCard.panCardBackPhoto}
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
        />
        <FilePreview
          label="Upload Permanent Address Proof (Minimum Last 10 Years Address proof)"
          file={form.address.addressProofFile}
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


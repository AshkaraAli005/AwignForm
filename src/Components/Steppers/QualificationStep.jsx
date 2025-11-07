import { GraduationCap, FileCheck } from "lucide-react";
import FileUpload from "../FileUpload";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import { updateQualification } from "../../Store/formSlice";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../Components/Ui/select";
import { Label } from "../../Components/Ui/label";

const QualificationStep = () => {
  const dispatch = useAppDispatch();
  const qualification = useAppSelector((state) => state.form.qualification);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label className="flex items-center gap-2 text-sm font-medium">
          <div className="w-6 h-6 rounded bg-[hsl(var(--form-icon-bg))] text-[hsl(var(--form-icon-text))] flex items-center justify-center">
            <GraduationCap className="w-4 h-4" />
          </div>
          Highest Education
          <span className="text-destructive ml-1">*</span>
        </Label>
        <Select
          value={qualification.highestEducation}
          onValueChange={(value) => dispatch(updateQualification({ highestEducation: value }))}
        >
          <SelectTrigger className="bg-background">
            <SelectValue placeholder="Select highest education" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10th">10th Standard</SelectItem>
            <SelectItem value="12th">12th Standard</SelectItem>
            <SelectItem value="diploma">Diploma</SelectItem>
            <SelectItem value="graduate">Graduate</SelectItem>
            <SelectItem value="postgraduate">Post Graduate</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label className="flex items-center gap-2 text-sm font-medium">
          <div className="w-6 h-6 rounded bg-[hsl(var(--form-icon-bg))] text-[hsl(var(--form-icon-text))] flex items-center justify-center">
            <FileCheck className="w-4 h-4" />
          </div>
          Graduation Category
          <span className="text-destructive ml-1">*</span>
        </Label>
        <p className="text-xs text-muted-foreground">
          Choose the highest certification that you have accomplished.
        </p>
        <Select
          value={qualification.graduationCategory}
          onValueChange={(value) => dispatch(updateQualification({ graduationCategory: value }))}
        >
          <SelectTrigger className="bg-background">
            <SelectValue placeholder="Select graduation category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="arts">Arts</SelectItem>
            <SelectItem value="science">Science</SelectItem>
            <SelectItem value="commerce">Commerce</SelectItem>
            <SelectItem value="engineering">Engineering</SelectItem>
            <SelectItem value="medical">Medical</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <FileUpload
        label="Upload Final Marksheet or Passing Certificate of Highest Qualification"
        hint="Consolidated Marksheet or All year's semester marksheet (Hint - Combine all of the semester's / year's marksheets into a single PDF file, then upload it.)"
        required
        accept=".pdf,image/*"
        value={qualification.marksheetFile}
        onFileSelect={(file) => dispatch(updateQualification({ marksheetFile: file }))}
      />
    </div>
  );
};

export default QualificationStep;

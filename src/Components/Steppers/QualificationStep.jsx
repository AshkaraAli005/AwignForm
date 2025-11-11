import { GraduationCap, FileCheck } from "lucide-react";
import FileUpload from "../FileUpload";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import { updateFiles, updateLoadingFiles, updateQualification } from "../../Store/formSlice";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../Components/Ui/select";
import { Label } from "../../Components/Ui/label";
import { useParams } from "react-router-dom";
import { uploadAwignaFile } from "../../services/api";

const QualificationStep = () => {
  const dispatch = useAppDispatch();
  const qualification = useAppSelector((state) => state.form.qualification);
  const {id} = useParams()
  // const aadhaar = useAppSelector((state) => state.form.aadhaar);
  const formData = useAppSelector((state) => state.form);
  return (
    <div className="space-y-6">
      <div className="space-y-2">
      <div>
        <Label className="flex items-center gap-2 text-sm font-medium">
           <div className="w-8 h-8 rounded-xl gradient-primary flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
          <GraduationCap className="w-4 h-4 text-white" />
        </div>
          Highest Education
          <span className="text-destructive ml-1">*</span>
        </Label>
      </div>

        <Select
          value={qualification.highestEducation}
          onValueChange={(value) => dispatch(updateQualification({ highestEducation: value }))}
        >
          <SelectTrigger className="data-[placeholder]:text-gray-400">
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
        <div>
        <Label className="flex items-center gap-2 text-sm font-medium">
           <div className="w-8 h-8 rounded-xl gradient-primary flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
          <FileCheck className="w-4 h-4 text-white" />
        </div>
          Graduation Category
          <span className="text-destructive ml-1">*</span>
        </Label>
         <p className="text-xs text-muted-foreground leading-relaxed pl-10">
          Choose the highest certification that you have accomplished.
        </p>
      </div>

        <Select
          value={qualification.graduationCategory}
          onValueChange={(value) => dispatch(updateQualification({ graduationCategory: value }))}
        >
          <SelectTrigger className="data-[placeholder]:text-gray-400">
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
        value={formData.files.marksheetFile}
        // onFileSelect={(file) => dispatch(updateQualification({ marksheetFile: file }))}
        onFileSelect={(file) =>{
          dispatch(updateLoadingFiles({marksheetFile: true}))
          uploadAwignaFile(id, file, "marksheetFile").then((response) => {
            dispatch(updateFiles({marksheetFile: response.data.files.marksheetFile}));
            dispatch(updateLoadingFiles({marksheetFile: false}))
            // initiateOcrExtract(id)
          })
        }}
      />
    </div>
  );
};

export default QualificationStep;

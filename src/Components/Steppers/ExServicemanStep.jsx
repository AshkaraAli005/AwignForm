import { Shield, FileCheck } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../Components/Ui/select";
import { Label } from "../../Components/Ui/label";
import { cn } from "../../lib/utils";
import FileUpload from "../FileUpload";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import { updateExServiceman, updateFiles, updateLoadingFiles } from "../../Store/formSlice";
import { useParams } from "react-router-dom";
import { uploadAwignaFile } from "../../services/api";

const ExServicemanStep = () => {
  const dispatch = useAppDispatch();
  const exServiceman = useAppSelector((state) => state.form.exServiceman);
  const formData = useAppSelector((state) => state.form);
     const {id} = useParams()
  

  return (
    <div className="space-y-6">
      <div className="space-y-3 group animate-fade-in">
        <Label className="flex items-center gap-2.5 text-sm font-semibold text-foreground">
          <div className="w-8 h-8 rounded-xl gradient-primary flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
            <Shield className="w-4 h-4 text-white" />
          </div>
          <span>Are you an Ex-Army / Ex-Service Personnel?</span>
          <span className="text-destructive text-base">*</span>
        </Label>
        <Select 
          value={exServiceman.isExServiceman} 
          onValueChange={(value) => dispatch(updateExServiceman({ isExServiceman: value }))}
        >
          <SelectTrigger className={cn(
            "h-12 px-4 rounded-xl border-2 transition-all duration-300",
            "bg-card/50 backdrop-blur-sm",
            "border-border focus:border-primary focus:ring-4 focus:ring-primary/10",
            "hover:border-primary/50 hover:shadow-md"
          )}>
            <SelectValue placeholder="Select option" />
          </SelectTrigger>
          <SelectContent className="bg-background border-border">
            <SelectItem value="yes">Yes</SelectItem>
            <SelectItem value="no">No</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {exServiceman.isExServiceman === 'yes' && (
        <div className="space-y-6 p-6 rounded-2xl bg-gradient-to-br from-secondary/30 to-secondary/10 border border-border animate-fade-in">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-xl gradient-primary flex items-center justify-center shadow-lg">
              <FileCheck className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-base font-semibold text-foreground">Ex-serviceman document</h3>
          </div>
          
          <FileUpload
            label="Please attach the Discharge Book issued by the services"
            required
            validationType="document"
            accept="image/*,.pdf"
            value={formData?.files?.exServiceDischargeBook}
            // onFileSelect={(file) => dispatch(updateExServiceman({ exServiceDischargeBook: file }))}
            onFileSelect={(file) =>{
              dispatch(updateLoadingFiles({ exServiceDischargeBook: true }))
              uploadAwignaFile(id, file, "exServiceDischargeBook").then((res) =>{
                dispatch(updateFiles({exServiceDischargeBook : res.data.files.exServiceDischargeBook}))
                dispatch(updateLoadingFiles({ exServiceDischargeBook: false }))
              }).catch((err) => {
                dispatch(updateFiles({exServiceDischargeBook : file}))
                dispatch(updateLoadingFiles({ exServiceDischargeBook: false }))
                console.log(err)})
                dispatch(updateFiles({exServiceDischargeBook : file}))
            }}
            loading={formData?.loadingFiles?.exServiceDischargeBook}
          />

          <FileUpload
            label="Please attach Ex-serviceman ID issued by Zila Sanik Board"
            required
            validationType="document"
            accept="image/*,.pdf"
            value={formData?.files?.exServicemanIdZilaSanikBoard}
            // onFileSelect={(file) => dispatch(updateExServiceman({ exServicemanIdZilaSanikBoard: file }))}
                        onFileSelect={(file) =>{
              dispatch(updateLoadingFiles({ exServicemanIdZilaSanikBoard: true }))
              uploadAwignaFile(id, file, "exServicemanIdZilaSanikBoard").then((res) =>{
                dispatch(updateFiles({exServicemanIdZilaSanikBoard : res.data.files.exServicemanIdZilaSanikBoard}))
                dispatch(updateLoadingFiles({ exServicemanIdZilaSanikBoard: false }))
              }).catch((err) => {
                dispatch(updateFiles({exServicemanIdZilaSanikBoard : file}))
                dispatch(updateLoadingFiles({ exServicemanIdZilaSanikBoard: false }))
                console.log(err)})
                dispatch(updateFiles({exServicemanIdZilaSanikBoard : file}))
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ExServicemanStep;
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "./Ui/dialog";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { IconButton } from "@mui/material";
import { ZoomIn, ZoomOut, RotateCcw, Check, X, ZoomInIcon } from "lucide-react";
import { format, isValid, parse } from "date-fns";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { Button } from "./Ui/button";
import { useState } from "react";
import { Rotate90DegreesCcwOutlined, Rotate90DegreesCwRounded } from "@mui/icons-material";

const EditFieldModal = ({
  open,
  onClose,
  fieldLabel,
  fieldValue,
  onChange,
  onSave,
  imageFile,
  isDateField,
  allValues={}
}) => {
  const [zoomRotation, setZoomRotation] = useState(0);
  const handleRotate = () => {
    setZoomRotation((prev) => prev + 90);
  };

  console.log(fieldValue)


  const parsedDate = isDateField && fieldValue
  ? parse(fieldValue, "dd/MM/yyyy", new Date()) // ✅ Parse from dd/MM/yyyy
  : null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent     className="
    max-w-5xl 
    w-[95vw]               /* prevent overflow on small screens */
    max-h-[90vh]           /* make sure modal fits inside viewport */
    overflow-y-auto         /* allow vertical scroll */
    p-6
  "

    >
        <DialogHeader>
          <DialogTitle>Edit {fieldLabel}</DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6 mt-4">
          {/* Left: Editable Field */}
          <div className="space-y-5">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Document Shows:</p>
            <p className="font-semibold text-[16px]">{allValues?.documentValue}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">You entered:</p>
            {isDateField ? (
            //   <LocalizationProvider dateAdapter={AdapterDateFns}>
            //   <DatePicker
            //     value={isValid(parsedDate) ? parsedDate : null} // ✅ Ensure valid
            //     disableFuture
            //     // onChange={(newDate) => {
            //     //   if (newDate) {
            //     //     // Always store as dd/MM/yyyy or yyyy-MM-dd as per your backend
            //     //     onChange(format(newDate, "dd/MM/yyyy"));
            //     //   }
                  
            //     // }}
            //     onChange={(newDate) => {
            //         if (newDate) {
            //             onchange(format(newDate, "dd/MM/yyyy"));
            //         //   dispatch(
            //         //     updateBasicDetails({
            //         //       dateOfBirth: format(newDate, "yyyy-MM-dd"),
            //         //     })
            //         //   );
            //         }
            //       }}
            //     slotProps={{
            //       textField: {
            //         size: "small",
            //         fullWidth: true,
            //         sx: {
            //           "& .MuiOutlinedInput-root": {
            //             borderRadius: "0.75rem",
            //           },
            //         },
            //       },
            //     }}
            //   />
            // </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
  <DatePicker
    value={parsedDate}
    disableFuture
    format="dd/MM/yyyy"
    minDate={new Date("1900-01-01")}
    onChange={(newDate) => {
      if (newDate) {
        onChange(format(newDate, "dd/MM/yyyy"));
      }
    }}
    sx={{
      "& .MuiPickersInputBase-root": {
        border: "1px solid #e4e4e7",
        borderRadius: "0.75rem",
        height: "3rem",
      },
    }}
    slotProps={{
      textField: { size: "small", fullWidth: true },
      actionBar: {
        actions: ["clear", "cancel", "accept"],
      },
      popper: {
        container: () => document.body,
        sx: { zIndex: 99999 },
      },
    }}
  />
</LocalizationProvider>

            
            ) : (
              <input
                type="text"
                value={fieldValue}
                onChange={(e) => onChange(e.target.value)}
                className="w-full border-2 border-primary/30 focus:border-primary px-3 py-2 rounded-lg focus:outline-none"
              />
            )}
          </div>
          </div>

          {/* Right: Zoomable & Rotatable Image */}
          <div className="flex flex-col items-center">
            <div className="relative border rounded-lg overflow-hidden w-full h-[350px] bg-black/5 flex items-center justify-center">
              {imageFile ? (
                <TransformWrapper
                initialScale={1}
                minScale={0.5}
                maxScale={5}
                
                wheel={{ step: 0.2 }}
              >
                  {({ zoomIn, zoomOut, resetTransform }) => (
                    <div className="w-full h-full flex flex-col items-center justify-center">
                      <div className="flex gap-2 justify-end w-full px-2 py-2">
                        <IconButton  onClick={() => zoomIn()} size="small">
                          <ZoomIn className="w-4 h-4" />
                        </IconButton>
                        <IconButton onClick={() => zoomOut()} size="small">
                          <ZoomOut  className="w-4 h-4"/>
                        </IconButton>
                        <IconButton onClick={handleRotate} size="small">
                          <Rotate90DegreesCwRounded sx={{fontSize:"20px"}} className="w-2 h-2" />
                        </IconButton>
                        <IconButton onClick={() => resetTransform()} size="small">
                          <X className="w-4 h-4" />
                        </IconButton>
                      </div>

                      <TransformComponent contentStyle={{ width: "100%", height: "100%" }}>
                        <img
                          src={imageFile?.signed_url}
                          alt="Preview"
                          className="max-h-[320px] max-w-full transition-transform duration-300"
                          style={{ transform: `rotate(${zoomRotation}deg)` }}
                        />
                      </TransformComponent>
                    </div>
                  )}
                </TransformWrapper>
              ) : (
                <p className="text-sm text-muted-foreground">No image available</p>
              )}
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <DialogFooter className="mt-6 flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onSave}>
            <Check className="w-4 h-4 mr-2" /> Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};


export default EditFieldModal;
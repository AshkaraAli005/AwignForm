import { Home, MapPin, Hash } from "lucide-react";
import FormField from "../FormField";
import FileUpload from "../FileUpload";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import { updateAddress } from "../../Store/formSlice";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../Components/Ui/select";
import { Label } from "../../Components/Ui/label";
import { Button } from "../../Components/Ui/button";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../Components/Ui/dialog";

const AddressStep = () => {
  const dispatch = useAppDispatch();
  const address = useAppSelector((state) => state.form.address);
  const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false);

  const handleSaveAddress = () => {
    setIsAddressDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label className="flex items-center gap-2 text-sm font-medium">
          <div className="w-6 h-6 rounded bg-[hsl(var(--form-icon-bg))] text-[hsl(var(--form-icon-text))] flex items-center justify-center">
            <Home className="w-4 h-4" />
          </div>
          Permanent Address
          <span className="text-destructive ml-1">*</span>
        </Label>
        <Dialog
          open={isAddressDialogOpen}
          onOpenChange={setIsAddressDialogOpen}
        >
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="text-primary border-primary hover:bg-primary/10"
            >
              Fill details &gt;
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Permanent Address Details</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <FormField
                icon={Home}
                label="House number"
                required
                value={address.houseNumber}
                onChange={(value) =>
                  dispatch(updateAddress({ houseNumber: value }))
                }
              />
              <FormField
                icon={MapPin}
                label="Street name"
                required
                value={address.streetName}
                onChange={(value) =>
                  dispatch(updateAddress({ streetName: value }))
                }
              />
              <FormField
                icon={MapPin}
                label="Locality"
                required
                value={address.locality}
                onChange={(value) =>
                  dispatch(updateAddress({ locality: value }))
                }
              />
              <FormField
                icon={MapPin}
                label="Landmark"
                required
                value={address.landmark}
                onChange={(value) =>
                  dispatch(updateAddress({ landmark: value }))
                }
              />
              <FormField
                icon={MapPin}
                label="District"
                required
                value={address.district}
                onChange={(value) =>
                  dispatch(updateAddress({ district: value }))
                }
              />
              <FormField
                icon={MapPin}
                label="State"
                required
                value={address.state}
                onChange={(value) => dispatch(updateAddress({ state: value }))}
              />
              <FormField
                icon={Hash}
                label="Pincode"
                required
                type="text"
                value={address.pincode}
                onChange={(value) =>
                  dispatch(updateAddress({ pincode: value }))
                }
              />
              <Button onClick={handleSaveAddress} className="w-full">
                Save Address
              </Button>
            </div>
          </DialogContent>
        </Dialog>
        {address.houseNumber && (
          <p className="text-sm text-muted-foreground mt-2">
            {address.houseNumber}, {address.streetName}, {address.locality},{" "}
            {address.district}, {address.state} - {address.pincode}
          </p>
        )}
      </div>

      <FileUpload
        label="Upload Permanent Address Proof (Minimum Last 10 Years Address proof)"
        required
        value={address.addressProofFile}
        multiple={true}
        validationType="document"
        accept="image/*,.pdf"
        onFileSelect={(file) =>
          dispatch(updateAddress({ addressProofFile: file }))
        }
      />

      <div className="space-y-2">
        <Label className="flex items-center gap-2 text-sm font-medium">
          <div className="w-6 h-6 rounded bg-[hsl(var(--form-icon-bg))] text-[hsl(var(--form-icon-text))] flex items-center justify-center">
            <Home className="w-4 h-4" />
          </div>
          Permanent Address Same as Current Address
          <span className="text-destructive ml-1">*</span>
        </Label>
        <p className="text-xs text-muted-foreground">
          Background verification will be done.
        </p>
        <Select
          value={address.permanentSameAsCurrent}
          onValueChange={(value) =>
            dispatch(updateAddress({ permanentSameAsCurrent: value }))
          }
        >
          <SelectTrigger className=" data-[placeholder]:text-gray-400">
            <SelectValue placeholder="Select option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="yes">Yes</SelectItem>
            <SelectItem value="no">No</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default AddressStep;

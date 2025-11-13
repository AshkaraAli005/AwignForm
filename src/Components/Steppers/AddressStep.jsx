import { Home, MapPin, Hash, ChevronsUpDown, Check } from "lucide-react";
import FormField from "../FormField";
import FileUpload from "../FileUpload";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import { updateAddress, updateFiles, updateLoadingFiles } from "../../Store/formSlice";
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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../../Components/Ui/command";
import { cn } from "../../lib/utils";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../Components/Ui/popover";
import { uploadAwignaFile } from "../../services/api";
import { useParams } from "react-router-dom";
import { INDIAN_STATES } from "../../utils/constantDatas";

const AddressStep = () => {
  const dispatch = useAppDispatch();
  const address = useAppSelector((state) => state.form.address);
  const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false);
    const [isCurrentAddressDialogOpen, setIsCurrentAddressDialogOpen] = useState(false);
      const [stateOpen, setStateOpen] = useState(false);


    const {id} = useParams()
  const formData = useAppSelector((state) => state.form);


  const handleSaveAddress = () => {
    setIsAddressDialogOpen(false);
  };
   const handleSaveCurrentAddress = () => {
    setIsCurrentAddressDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label className="flex items-center gap-2 text-sm font-medium">
          <div className="w-8 h-8 rounded-xl gradient-primary flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
            <Home className="w-4 h-4 text-white" />
          </div>
          Permanent Address
          <span className="text-destructive ml-1">*</span>
        </Label>
        {/* <Dialog
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
        )} */}

        {/* Address Fields Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            // icon={Home}
            label="House Number"
            placeholder={"Enter House No."}
            required
            value={address.houseNumber}
            onChange={(value) => dispatch(updateAddress({ houseNumber: value }))}
          />
          <FormField
            // icon={MapPin}
            label="Street Name"
            placeholder={"Enter Street Name"}
            required
            value={address.streetName}
            onChange={(value) => dispatch(updateAddress({ streetName: value }))}
          />
          <FormField
            // icon={MapPin}
            label="Locality"
            placeholder={"Enter Locality"}
            required
            value={address.locality}
            onChange={(value) => dispatch(updateAddress({ locality: value }))}
          />
          <FormField
            // icon={MapPin}
            label="Landmark"
            required
            placeholder={"Enter Landmark"}
            value={address.landmark}
            onChange={(value) => dispatch(updateAddress({ landmark: value }))}
          />
          <FormField
            // icon={MapPin}
            label="District"
            placeholder={"Enter District"}
            required
            value={address.district}
            onChange={(value) => dispatch(updateAddress({ district: value }))}
          />
          
          {/* State Selector with Search */}
          <div className="space-y-2 group animate-fade-in">
            <Label className="flex items-center gap-2.5 text-sm font-semibold text-foreground ml-2">
              {/* <div className="w-8 h-8 rounded-xl gradient-primary flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <MapPin className="w-4 h-4 text-white" />
              </div> */}
              <span>State</span>
              <span className="text-destructive text-base">*</span>
            </Label>
            <Popover open={stateOpen} onOpenChange={setStateOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={stateOpen}
                  className={cn(
                    "h-12 w-full justify-between rounded-xl border-2 transition-all duration-300",
                    "bg-card/50 backdrop-blur-sm",
                    "border-border hover:border-primary/50 hover:shadow-md hover:bg-white active:border-primary/30",
                    address.state && "focus:ring-4 focus:ring-primary/10"
                  )}
                >
                  {address.state || "Select state..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0" align="start">
                <Command>
                  <CommandInput placeholder="Search state..." />
                  <CommandList>
                    <CommandEmpty>No state found.</CommandEmpty>
                    <CommandGroup>
                      {INDIAN_STATES.map((state) => (
                        <CommandItem
                          key={state}
                          value={state}
                          onSelect={(currentValue) => {
                            dispatch(updateAddress({ state: currentValue }));
                            setStateOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              address.state === state ? "opacity-100" : "opacity-0"
                            )}
                          />
                          {state}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          <FormField
            // icon={Hash}
            label="Pincode"
            required
            placeholder={"Enter 6 digit pincode"}
            type="number"
            value={address.pincode}
            onChange={(value) => dispatch(updateAddress({ pincode: value }))}
          />
        </div>
      </div>

      <FileUpload
        label="Upload Permanent Address Proof (Minimum Last 10 Years Address proof)"
        required
        value={formData.files.addressProofFile}
        multiple={true}
        validationType="document"
        accept="image/*,.pdf"
        onFileSelect={(file) =>
          dispatch(updateFiles({ addressProofFile: file }))
        }
        // onFileSelect={(file) =>{
        //   dispatch(updateLoadingFiles({ addressProofFile: true }))
        //   uploadAwignaFile(id, file, "addressProofFile").then((res) =>{
        //     dispatch(updateFiles({addressProofFile : res.data.files.addressProofFile}))
        //     dispatch(updateLoadingFiles({ addressProofFile: false }))
        //   }).catch((err) => {
        //     dispatch(updateFiles({addressProofFile : file}))
        //     dispatch(updateLoadingFiles({ addressProofFile: false }))
        //     console.log(err)})
        // }}
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
      {address.permanentSameAsCurrent === "no" && (
        <div className="space-y-4 border-t border-border/50 pt-6">
          <h3 className="text-lg font-semibold text-foreground">
            Current Address Details
          </h3>

          {/* Dialog for Current Address */}
          <Dialog
            open={isCurrentAddressDialogOpen}
            onOpenChange={setIsCurrentAddressDialogOpen}
          >
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="text-primary border-primary hover:bg-primary/10"
              >
                Fill Current Address Details &gt;
              </Button>
            </DialogTrigger>

            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Current Address Details</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <FormField
                  icon={Home}
                  label="House number"
                  required
                  value={address.currentHouseNumber}
                  onChange={(value) =>
                    dispatch(updateAddress({ currentHouseNumber: value }))
                  }
                />
                <FormField
                  icon={MapPin}
                  label="Street name"
                  required
                  value={address.currentStreetName}
                  onChange={(value) =>
                    dispatch(updateAddress({ currentStreetName: value }))
                  }
                />
                <FormField
                  icon={MapPin}
                  label="Locality"
                  required
                  value={address.currentLocality}
                  onChange={(value) =>
                    dispatch(updateAddress({ currentLocality: value }))
                  }
                />
                <FormField
                  icon={MapPin}
                  label="Landmark"
                  required
                  value={address.currentLandmark}
                  onChange={(value) =>
                    dispatch(updateAddress({ currentLandmark: value }))
                  }
                />
                <FormField
                  icon={MapPin}
                  label="District"
                  required
                  value={address.currentDistrict}
                  onChange={(value) =>
                    dispatch(updateAddress({ currentDistrict: value }))
                  }
                />
                <FormField
                  icon={MapPin}
                  label="State"
                  required
                  value={address.currentState}
                  onChange={(value) =>
                    dispatch(updateAddress({ currentState: value }))
                  }
                />
                <FormField
                  icon={Hash}
                  label="Pincode"
                  required
                  type="text"
                  value={address.currentPincode}
                  onChange={(value) =>
                    dispatch(updateAddress({ currentPincode: value }))
                  }
                />
                <Button onClick={handleSaveCurrentAddress} className="w-full">
                  Save Current Address
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          {/* ✅ Show saved current address summary */}
          {address.currentHouseNumber && (
            <p className="text-sm text-muted-foreground mt-2">
              {address.currentHouseNumber}, {address.currentStreetName},{" "}
              {address.currentLocality}, {address.currentDistrict},{" "}
              {address.currentState} - {address.currentPincode}
            </p>
          )}

          {/* ✅ Current Address Proof */}
          <FileUpload
            label="Upload Current Address Proof"
            required
            value={address.currentAddressProofFile}
            multiple={true}
            validationType="document"
            accept="image/*,.pdf"
            onFileSelect={(file) =>
              dispatch(updateAddress({ currentAddressProofFile: file }))
            }
          />
        </div>
      )}
    </div>
  );
};

export default AddressStep;

import { Users, MapPin, Home, Phone } from "lucide-react";
import FormField from "../FormField";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import { updateNeighbour } from "../../Store/formSlice";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../Components/Ui/select";
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

const NeighbourStep = () => {
  const dispatch = useAppDispatch();
  const neighbour = useAppSelector((state) => state.form.neighbour);
  const [isNeighbor1DialogOpen, setIsNeighbor1DialogOpen] = useState(false);
  const [isNeighbor2DialogOpen, setIsNeighbor2DialogOpen] = useState(false);

  return (
    <div className="space-y-6">


            <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Users className="w-5 h-5" />
          Neighbor 1 Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            icon={Users}
            label="Neighbor 1 Name"
            required
            value={neighbour.neighbor1Name}
            onChange={(value) => dispatch(updateNeighbour({ neighbor1Name: value }))}
            placeholder="Enter name"
          />
          <FormField
            icon={Phone}
            label="Mobile Number"
            required
            type="number"
            value={neighbour.neighbor1Mobile}
            onChange={(value) => dispatch(updateNeighbour({ neighbor1Mobile: value }))}
            placeholder="Enter mobile number"
          />
        </div>
        <FormField
          icon={Home}
          label="Address"
          required
          value={neighbour.neighbor1Address}
          onChange={(value) => dispatch(updateNeighbour({ neighbor1Address: value }))}
          placeholder="Enter address"
        />
      </div>

      {/* Neighbor 2 */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Users className="w-5 h-5" />
          Neighbor 2 Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            icon={Users}
            label="Neighbor 2 Name"
            required
            value={neighbour.neighbor2Name}
            onChange={(value) => dispatch(updateNeighbour({ neighbor2Name: value }))}
            placeholder="Enter name"
          />
          <FormField
            icon={Phone}
            label="Mobile Number"
            required

            type="number"
            value={neighbour.neighbor2Mobile}
            onChange={(value) => dispatch(updateNeighbour({ neighbor2Mobile: value }))}
            placeholder="Enter mobile number"
          />
        </div>
        <FormField
          icon={Home}
          label="Address"
          required
          value={neighbour.neighbor2Address}
          onChange={(value) => dispatch(updateNeighbour({ neighbor2Address: value }))}
          placeholder="Enter address"
        />
      </div>

      <FormField
        icon={MapPin}
        label="Nearest Police station"
        required
        placeholder={"Enter nearby police station"}
        value={neighbour.nearestPoliceStation}
        onChange={(value) => dispatch(updateNeighbour({ nearestPoliceStation: value }))}
      />

      <div className="space-y-2">
        <Label className="flex items-center gap-2 text-sm font-medium">
          <div className="w-6 h-6 rounded bg-[hsl(var(--form-icon-bg))] text-[hsl(var(--form-icon-text))] flex items-center justify-center">
            <Users className="w-4 h-4" />
          </div>
          How did you come to know about us?
          <span className="text-destructive ml-1">*</span>
        </Label>
        <Select
          value={neighbour.howDidYouKnow}
          onValueChange={(value) => dispatch(updateNeighbour({ howDidYouKnow: value }))}
        >
          <SelectTrigger className="data-[placeholder]:text-gray-400">
            <SelectValue placeholder="Select option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="social-media">Social Media</SelectItem>
            <SelectItem value="friend">Friend</SelectItem>
            <SelectItem value="advertisement">Advertisement</SelectItem>
            <SelectItem value="website">Website</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default NeighbourStep;

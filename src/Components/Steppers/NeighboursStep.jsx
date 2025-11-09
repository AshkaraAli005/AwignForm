import { Users, MapPin } from "lucide-react";
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
      <div className="space-y-2">
        <Label className="flex items-center gap-2 text-sm font-medium">
          <div className="w-6 h-6 rounded bg-[hsl(var(--form-icon-bg))] text-[hsl(var(--form-icon-text))] flex items-center justify-center">
            <Users className="w-4 h-4" />
          </div>
          Neighbor 1 details
          <span className="text-destructive ml-1">*</span>
        </Label>
        <Dialog open={isNeighbor1DialogOpen} onOpenChange={setIsNeighbor1DialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="text-primary border-primary hover:bg-primary/10">
              Fill details &gt;
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Neighbor 1 Details</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <FormField
                icon={Users}
                label="Neighbor 1 Name"
                required
                value={neighbour.neighbor1Details}
                onChange={(value) => dispatch(updateNeighbour({ neighbor1Details: value }))}
              />
              <Button onClick={() => setIsNeighbor1DialogOpen(false)} className="w-full">
                Save Details
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-2">
        <Label className="flex items-center gap-2 text-sm font-medium">
          <div className="w-6 h-6 rounded bg-[hsl(var(--form-icon-bg))] text-[hsl(var(--form-icon-text))] flex items-center justify-center">
            <Users className="w-4 h-4" />
          </div>
          Neighbor 2 details
          <span className="text-destructive ml-1">*</span>
        </Label>
        <Dialog open={isNeighbor2DialogOpen} onOpenChange={setIsNeighbor2DialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="text-primary border-primary hover:bg-primary/10">
              Fill details &gt;
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Neighbor 2 Details</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <FormField
                icon={Users}
                label="Neighbor 2 Name"
                required
                value={neighbour.neighbor2Details}
                onChange={(value) => dispatch(updateNeighbour({ neighbor2Details: value }))}
              />
              <Button onClick={() => setIsNeighbor2DialogOpen(false)} className="w-full">
                Save Details
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <FormField
        icon={MapPin}
        label="Nearest Police station"
        required
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

import { CheckSquare } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../Components/Ui/select";
import { Label } from "../../Components/Ui/label";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import { updateOnboardingChannel } from "../../Store/formSlice";
import { Card } from "../../Components/Ui/card";

const OnboardingChannelStep = () => {
  const dispatch = useAppDispatch();
  const onboardingChannel = useAppSelector((state) => state.form.onboardingChannel);

  return (
    <div className="space-y-6">
      {/* Info Card */}
      <Card className="p-6 bg-secondary/30 border border-border/50">
        <div className="flex items-start gap-3 mb-4">
          <CheckSquare className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-semibold mb-2">
              Onboarding Channel (Reached By / Sourced By)
            </h3>
            <p className="text-sm text-muted-foreground">
              Please select the correct medium of onboarding or ask the person who
              reached out.
            </p>
          </div>
        </div>
      </Card>

      {/* Select Field */}
      <div className="space-y-2">
        <Label className="flex items-center gap-2 text-sm font-medium">
          Onboarding Channel
          <span className="text-destructive">*</span>
        </Label>
        <Select
          value={onboardingChannel.channel}
          onValueChange={(value) =>
            dispatch(updateOnboardingChannel({ channel: value }))
          }
        >
          <SelectTrigger className="bg-background">
            <SelectValue placeholder="Select onboarding channel" />
          </SelectTrigger>
          <SelectContent className="bg-background z-50">
            <SelectItem value="others">Others</SelectItem>
            <SelectItem value="onx-team">ONX Team</SelectItem>
            <SelectItem value="work-bazar-team">Work Bazar Team</SelectItem>
            <SelectItem value="supply-team">Supply Team</SelectItem>
            <SelectItem value="ops-team">Ops Team</SelectItem>
            <SelectItem value="adminrbhar">Adminrbhar</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default OnboardingChannelStep;

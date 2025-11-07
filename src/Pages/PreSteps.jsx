import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "../Components/Ui/button";
import { Card } from "../Components/Ui/card";
import OnboardingChannelStep from "../Components/Steppers/OnboardingChannelStep";
import DisclaimerStep from "../Components/Steppers/DisclaimerStep";
import { useAppDispatch, useAppSelector } from "../Store/hooks";
import { setHasCompletedPreSteps } from "../Store/formSlice";
import { toast } from "sonner";
import { cn } from "../lib/utils";
import { useState } from "react";

const PreSteps = () => {
  const dispatch = useAppDispatch();
  const onboardingChannel = useAppSelector((state) => state.form.onboardingChannel);
  const disclaimer = useAppSelector((state) => state.form.disclaimer);
  const [currentPreStep, setCurrentPreStep] = useState(0);

  const handleNext = () => {
    if (currentPreStep === 0) {
      if (!onboardingChannel.channel) {
        toast.error("Required Field", {
          description: "Please select an onboarding channel.",
        });
        return;
      }
      setCurrentPreStep(1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      if (disclaimer.proceed !== "yes") {
        toast.error("Required Action", {
          description: "Please agree to proceed by selecting 'Yes'.",
        });
        return;
      }
      dispatch(setHasCompletedPreSteps(true));
    }
  };

  const handleBack = () => {
    if (currentPreStep > 0) {
      setCurrentPreStep(currentPreStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const steps = [
    { component: <OnboardingChannelStep />, title: "Onboarding Channel" },
    { component: <DisclaimerStep />, title: "Important Disclaimer" },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary/30 to-accent/20" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" />
        <div
          className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* Header */}
      <header className="relative border-b border-border/50 backdrop-blur-xl bg-card/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center shadow-glow">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold gradient-text">Awign Portal</h1>
              <p className="text-sm text-muted-foreground">Complete the preliminary steps</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Section */}
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Card className="shadow-modern border-2 border-border/50 rounded-3xl overflow-hidden backdrop-blur-xl bg-card/80 animate-scale-in">
          {/* Card Header */}
          <div className="relative gradient-primary p-8">
            <div className="relative">
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold backdrop-blur-sm">
                  Step {currentPreStep + 1} of 2
                </span>
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">
                {steps[currentPreStep].title}
              </h2>
            </div>
          </div>

          {/* Step Content */}
          <div className="p-8">{steps[currentPreStep].component}</div>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-8 gap-4">
          {currentPreStep > 0 && (
            <Button
              variant="outline"
              onClick={handleBack}
              className="h-12 px-6 rounded-xl border-2 font-semibold"
            >
              Back
            </Button>
          )}

          <Button
            onClick={handleNext}
            className={cn(
              "h-12 px-8 rounded-xl gradient-primary text-white font-bold shadow-glow ml-auto",
              "hover:scale-105 transition-all duration-300"
            )}
          >
            Next
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PreSteps;

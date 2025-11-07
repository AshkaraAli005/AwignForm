import { CheckCircle2, Circle } from "lucide-react";
import { cn } from "../lib/utils";

const FormStepper = ({ steps, onStepClick }) => {
  return (
    <div className="mb-12 px-2 sm:px-4">
      <div className="max-w-4xl mx-auto">
        {/* Mobile View - Compact */}
        <div className="md:hidden">
          <div className="flex items-center gap-2 p-2 overflow-x-auto pb-4 scrollbar-hide">
            <div className="absolute left-0 top-6 w-full h-1 bg-gradient-to-r from-secondary via-muted to-secondary rounded-full -z-10" />

            {steps.map((step, index) => (
              <div
                key={step.number}
                className={cn(
                  "flex flex-col items-center flex-shrink-0 transition-all duration-500 min-w-[60px]",
                  step.isActive && "scale-110",
                  (step.isCompleted || step.isActive) &&
                    onStepClick &&
                    "cursor-pointer"
                )}
                onClick={() => onStepClick && onStepClick(index)}
              >
                {/* Step Circle - Smaller for mobile */}
                <div
                  className={cn(
                    "relative w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-500 border-2",
                    step.isActive &&
                      "gradient-primary border-transparent text-white shadow-glow animate-pulse-glow",
                    step.isCompleted &&
                      !step.isActive &&
                      "bg-gradient-to-br from-green-400 to-green-600 border-transparent text-white shadow-lg",
                    !step.isActive &&
                      !step.isCompleted &&
                      "bg-card border-border text-muted-foreground shadow-md"
                  )}
                >
                  {step.isCompleted ? (
                    <CheckCircle2 className="w-5 h-5 animate-scale-in" />
                  ) : step.isActive ? (
                    <Circle className="w-5 h-5 fill-current" />
                  ) : (
                    <span className="text-sm">{step.number}</span>
                  )}

                  {/* Active Glow Ring */}
                  {step.isActive && (
                    <div className="absolute inset-0 rounded-full gradient-primary opacity-20 animate-ping" />
                  )}
                </div>

                {/* Step Label - Compact for mobile */}
                <div className="mt-2 text-center">
                  <span
                    className={cn(
                      "text-xs font-semibold transition-all duration-300 block whitespace-nowrap",
                      step.isActive && "gradient-text scale-105",
                      step.isCompleted &&
                        !step.isActive &&
                        "text-green-600 dark:text-green-400",
                      !step.isActive &&
                        !step.isCompleted &&
                        "text-muted-foreground"
                    )}
                  >
                    {step.title}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop View - Full Size */}
        <div className="hidden md:block">
          <div className="flex items-center justify-between relative">
            {/* Progress Line Background */}
            <div className="absolute left-0 top-6 w-full h-1 bg-gradient-to-r from-secondary via-muted to-secondary rounded-full -z-10" />

            {/* Animated Progress Line */}
            <div
              className="absolute left-0 top-6 h-1 gradient-primary rounded-full -z-10 transition-all duration-700 ease-out shadow-glow"
              style={{
                width: `${
                  (steps.filter((s) => s.isCompleted).length /
                    (steps.length - 1)) *
                  100
                }%`,
              }}
            />

            {steps.map((step, index) => (
              <div
                key={step.number}
                className={cn(
                  "flex flex-col items-center transition-all duration-500",
                  step.isActive && "scale-110",
                  (step.isCompleted || step.isActive) &&
                    onStepClick &&
                    "cursor-pointer"
                )}
                onClick={() => onStepClick && onStepClick(index)}
              >
                {/* Step Circle */}
                <div
                  className={cn(
                    "relative w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-500 border-2",
                    step.isActive &&
                      "gradient-primary border-transparent text-white shadow-glow animate-pulse-glow",
                    step.isCompleted &&
                      !step.isActive &&
                      "bg-gradient-to-br from-green-400 to-green-600  text-white shadow-lg hover:scale-110",
                    !step.isActive &&
                      !step.isCompleted &&
                      "bg-card border-border text-muted-foreground shadow-md"
                  )}
                >
                  {step.isCompleted ? (
                    <CheckCircle2 className="w-6 h-6 animate-scale-in" />
                  ) : step.isActive ? (
                    <Circle className="w-6 h-6 fill-current" />
                  ) : (
                    <span className="text-base">{step.number}</span>
                  )}

                  {/* Active Glow Ring */}
                  {step.isActive && (
                    <div className="absolute inset-0 rounded-full gradient-primary opacity-20 animate-ping" />
                  )}
                </div>

                {/* Step Label */}
                <div className="mt-3 text-center max-w-[100px]">
                  <span
                    className={cn(
                      "text-sm font-semibold transition-all duration-300 block",
                      step.isActive && "gradient-text scale-105",
                      step.isCompleted &&
                        !step.isActive &&
                        "text-green-600 dark:text-green-400",
                      !step.isActive &&
                        !step.isCompleted &&
                        "text-muted-foreground"
                    )}
                  >
                    {step.title}
                  </span>
                  <span
                    className={cn(
                      "text-xs transition-opacity duration-300 mt-1 block",
                      step.isActive ? "opacity-70 text-foreground" : "opacity-0"
                    )}
                  >
                    Step {step.number} of {steps.length}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormStepper;

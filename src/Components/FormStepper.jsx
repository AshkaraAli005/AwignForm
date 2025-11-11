import { CheckCircle2, Circle } from "lucide-react";
import { cn } from "../lib/utils";
import { useEffect, useState } from "react";

const FormStepper = ({ steps, onStepClick }) => {
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);

  useEffect(() => {
    const header = document.getElementById("main-header");
    if (!header) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsHeaderHidden(!entry.isIntersecting),
      { threshold: 0 }
    );

    observer.observe(header);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Mobile View - Horizontal Compact */}
{/* Mobile View - Horizontal Compact */}
<div className="lg:hidden flex justify-center mb-8 px-2 sm:px-4">
  <div className="relative flex items-center justify-between w-full max-w-md px-4">
    {/* 🟣 Base Connector Line (behind steps) */}
    <div className="absolute left-0 right-0 top-[34%] h-[2px] bg-border transform -translate-y-1/2 rounded-full" />

    {/* 🟢 Progress Line (fills up for completed steps) */}
    <div
      className="absolute left-0 top-[34%] h-[2px] gradient-primary transform -translate-y-1/2 rounded-full transition-all duration-500"
      style={{
        width: `${
          ((steps.filter((s) => s.isCompleted).length - 1) /
            (steps.length - 1)) *
          100
        }%`,
      }}
    />

    {/* 🔹 Step Circles */}
    {steps.map((step, index) => (
      <div
        key={step.number}
        className={cn(
          "flex flex-col items-center z-10 transition-all duration-500",
          step.isActive && "scale-110",
          (step.isCompleted || step.isActive) && onStepClick && "cursor-pointer"
        )}
        onClick={() => onStepClick && onStepClick(index)}
      >
        {/* Step Circle */}
        <div
          className={cn(
            "relative w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-500 border-2",
            step.isActive && "gradient-primary border-transparent text-white shadow-glow animate-pulse-glow",
            step.isCompleted && !step.isActive && "bg-gradient-to-br from-green-400 to-green-600 border-transparent text-white shadow-lg",
            !step.isActive && !step.isCompleted && "bg-card border-border text-muted-foreground shadow-md"
          )}
        >
        {
            step.icon ? (
              <step.icon className="w-5 h-5" />
            ) : (
            <span className="text-sm">{step.number}</span>
          )}
          {/* {step.isCompleted ? (
            <CheckCircle2 className="w-5 h-5 animate-scale-in" />
          ) : step.isActive ? (
            step.icon ? (
              <step.icon className="w-5 h-5" />
            ) : (
              <Circle className="w-5 h-5 fill-current" />
            )
          ) : (
            <span className="text-sm">{step.number}</span>
          )} */}

          {/* Active Glow Ring */}
          {step.isActive && (
            <div className="absolute inset-0 rounded-full gradient-primary opacity-20 animate-ping" />
          )}
        </div>

        {/* Step Label */}
        <div className="mt-2 text-center">
          <span
            className={cn(
              "text-[12px] font-semibold transition-all duration-300 block whitespace-nowrap",
              step.isActive && "gradient-text scale-105 text-[10px]",
              step.isCompleted && !step.isActive && "text-green-600 dark:text-green-400",
              !step.isActive && !step.isCompleted && "text-muted-foreground"
            )}
          >
            {step.title}
          </span>
        </div>
      </div>
    ))}
  </div>
</div>


      {/* Desktop View - Vertical Sidebar (Sticky) */}
      <div className="hidden lg:block w-64 pr-5 ml-2">
        <div
          className={`${isHeaderHidden ? "fixed top-10" : "sticky top-[50px]"
            } transition-all duration-500 w-64`}
        >   
          {/* Header */}
          {/* <div className="mb-8">
            {/* <h3 className="text-lg font-bold gradient-text">Application Steps</h3> *
            <p className="text-xs text-muted-foreground mt-1">Complete all steps to submit</p>
          </div> */}

          {/* Vertical Steps */}
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isLast = index === steps.length - 1;
            
            return (
              <div key={step.number} className="relative">
                {/* Connecting Line */}
                {!isLast && (
                  <div className="absolute left-[2.2rem] top-12 w-0.5 h-16 bg-border">
                    {step.isCompleted && (
                      <div className="w-full h-full bg-gradient-to-br from-green-400 to-green-600 transition-all duration-500" />
                    )}
                  </div>
                )}

                {/* Step Item */}
                <div
                  className={cn(
                    "relative flex items-start gap-4 px-3 py-2 rounded-xl transition-all duration-300",
                    step.isActive && "scale-105",
                    (step.isCompleted || step.isActive) && onStepClick && "cursor-pointer hover:bg-accent/5",
                    !step.isActive && !step.isCompleted && "hover:bg-muted/30"
                  )}
                  onClick={() => onStepClick && onStepClick(index)}
                >
                  {/* Step Icon/Number */}
                  <div
                    className={cn(
                      "relative w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-500 border-2 flex-shrink-0",
                      step.isActive && "gradient-primary border-transparent text-white shadow-glow animate-pulse-glow ml-1",
                      step.isCompleted && !step.isActive && "bg-gradient-to-br from-green-400 to-green-600 text-white shadow-lg",
                      //  bg-[linear-gradient(95deg,_rgb(242,113,33)_0%,_rgb(233,64,87)_50%,_rgb(138,35,135)_100%)]
                      
                      !step.isActive && !step.isCompleted && "bg-card border-border text-muted-foreground"
                    )}
                  >
                    {/* { */}
                      {/* step.isCompleted ? (
                      <CheckCircle2 className="w-6 h-6 animate-scale-in" />
                    ) :  */}
                    { Icon ? (
                      <Icon className="w-6 h-6" />
                    ) : (
                      <span className="text-base">{step.number}</span>
                    )}
                    
                    {/* Active Glow Ring */}
                    {step.isActive && (
                      <div className="absolute inset-0 rounded-full gradient-primary opacity-20 animate-ping" />
                    )}
                  </div>

                  {/* Step Info */}
                  <div className="flex-1 min-w-0 pt-2">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={cn(
                          "text-sm font-semibold transition-all duration-300",
                          step.isActive && "gradient-text",
                          step.isCompleted && !step.isActive && "text-green-600 dark:text-green-400",
                          !step.isActive && !step.isCompleted && "text-muted-foreground"
                        )}
                      >
                        {step.title}
                      </span>
                      {step.isCompleted && !step.isActive && (
                        <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
                      )}
                    </div>
                    <span
                      className={cn(
                        "text-xs transition-opacity duration-300 block",
                        step.isActive ? "text-muted-foreground" : "text-muted-foreground/50"
                      )}
                    >
                      Step {step.number} of {steps.length}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default FormStepper;

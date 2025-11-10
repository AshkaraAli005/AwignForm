import { ArrowLeft, ArrowRight, Sparkles, Save, User, GraduationCap, CreditCard, FileText, Home, Users, ClipboardCheck  } from "lucide-react";
import { Button } from "../Components/Ui/button";
import { Card } from "../Components/Ui/card";
import FormStepper from "../Components/FormStepper";
import BasicDetailsStep from "../Components/Steppers/BasicDetailsStep";
import QualificationStep from "../Components/Steppers/QualificationStep";
import AadhaarStep from "../Components/Steppers/AadhaarStepper";
import PanCardStep from "../Components/Steppers/PanCardStep";
import AddressStep from "../Components/Steppers/AddressStep";
import NeighbourStep from "../Components/Steppers/NeighboursStep";
import SummaryStep from "../Components/Steppers/SummaryStep";
import RoleSelection from "./RoleSelection";
import { useAppDispatch, useAppSelector } from "../Store/hooks";
import { nextStep, prevStep,setCurrentStep, setHasSelectedRole, updateAadhaar, updateAddress, updateBasicDetails, updateNeighbour, updatePanCard, updateQualification } from "../Store/formSlice";
import { toast } from "../Components/Ui/sonner";
import { cn } from "../lib/utils";
import { getStepValidationMessage, validateStep } from "../utils/formValidation";
import { use, useEffect, useState } from "react";
import { convertToFormData } from "../utils/commonFunctions";
import AwignLogo from "../assets/AwignLogo.png";
import { useNavigate, useParams } from "react-router-dom";
import { getAwignFormData, updateAwignFormData } from "../services/api";

const Index = () => {
    const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentStep = useAppSelector((state) => state.form.currentStep);
  const hasSelectedRole = useAppSelector((state) => state.form.hasSelectedRole);
  const formState = useAppSelector((state) => state.form);

  const [isLoading, setIsLoading] = useState(false);

  // If role not selected, show role selection screen


  //   useEffect(() => {
  //   const loadFormData = () => {
  //     if (id && id !== 'new') {
  //       setIsLoading(true);
  //       getAwignFormData(`/${id}`)
  //       .then((res) => {
  //         let data = res.data;
  //         // Load data into Redux store
  //         dispatch(setCurrentStep(data.currentStep));
  //         dispatch(updateRole({ selectedRole: data.selectedRole }));
  //         dispatch(setHasSelectedRole(true));
  //         dispatch(updateBasicDetails(data.basicDetails ));
  //         dispatch(updateQualification(data.qualification));
  //         dispatch(updateAadhaar(data.aadhaar ));
  //         dispatch(updatePanCard(data.panCard ));
  //         dispatch(updateAddress(data.address ));
  //         dispatch(updateNeighbour(data.neighbour));
  //       }).catch((error) => {
  //         console.error("Error loading form data:", error);
  //         toast.error("Failed to load form data");
  //       }).finally(() => {
  //         setIsLoading(false);
  //       })
  //     }
  //   };
  //   loadFormData();
  // }, [id, dispatch]);

  const steps = [
    { number: 1, title: "Basic", isCompleted: currentStep > 0, isActive: currentStep === 0, icon: User },
    { number: 2, title: "Education", isCompleted: currentStep > 1, isActive: currentStep === 1, icon: GraduationCap },
    { number: 3, title: "Aadhaar", isCompleted: currentStep > 2, isActive: currentStep === 2, icon: CreditCard },
    { number: 4, title: "PAN Card", isCompleted: currentStep > 3, isActive: currentStep === 3, icon: FileText },
    { number: 5, title: "Address", isCompleted: currentStep > 4, isActive: currentStep === 4, icon: Home },
    { number: 6, title: "References", isCompleted: currentStep > 5, isActive: currentStep === 5, icon: Users },
    { number: 7, title: "Summary", isCompleted: currentStep > 6, isActive: currentStep === 6, icon: ClipboardCheck },
  ];

  const stepTitles = [
    "Personal Information",
    "Education & Qualifications",
    "Aadhaar Verification",
    "PAN Card Verification",
    "Address Details",
    "Reference Information",
    "Review & Verify",
  ];

  const stepSubtitles = [
    "Let's start with your basic details",
    "Tell us about your educational background",
    "Verify your Aadhaar card",
    "Verify your PAN card details",
    "Provide your address information",
    "Add your references",
    "Review all information and verify documents",
  ];

  const stepComponents = [
    <BasicDetailsStep key="basic" />,
    <QualificationStep key="qualification" />,
    <AadhaarStep key="aadhaar" />,
    <PanCardStep key="pancard" />,
    <AddressStep key="address" />,
    <NeighbourStep key="neighbour" />,
    <SummaryStep key="summary" />,
  ];

  const handleSubmit = async() => {
    const formData = convertToFormData(formState);

// Example POST API call
try {
  const response = await fetch("/api/onboarding", {
    method: "POST",
    body: formData, // directly send FormData
    // ❗️No need to set Content-Type header manually — 
    // fetch automatically sets the right multipart boundary
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const result = await response.json();
  console.log("✅ Upload success:", result);
} catch (error) {
  console.error("❌ Upload failed:", error);
}
  }
  const handleNext = () => {
    // if (currentStep < 6) {
    //   dispatch(nextStep());
    //   window.scrollTo({ top: 0, behavior: "smooth" });
    // } else {
    //   toast.success("🎉 Form submitted successfully!", {
    //     description: "We'll review your application and get back to you soon.",
    //   });
    // }

        // Validate current step before proceeding
        if (currentStep < 6) {
            // if (!validateStep(currentStep, formState)) {
            //   toast.error("Missing Required Fields", {
            //     description: getStepValidationMessage(currentStep),
            //   });
            //   return;
            // }
            updateAwignFormData(`/${id}`, formState)
            dispatch(nextStep());
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            handleSubmit();
            toast.success("🎉 Form submitted successfully!", {
              description: "We'll review your application and get back to you soon.",
            });
          }
        };
      
        const handleStepClick = (stepNumber) => {
          // Allow navigation to previous steps or current step
          if (stepNumber <= currentStep) {
            dispatch(setCurrentStep(stepNumber));
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            // Validate all steps before the target step
            // for (let i = currentStep; i < stepNumber; i++) {
            //   if (!validateStep(i, formState)) {
            //     toast.error("Cannot Skip Steps", {
            //       description: getStepValidationMessage(i),
            //     });
            //     return;
            //   }
            // }
            dispatch(setCurrentStep(stepNumber));
            window.scrollTo({ top: 0, behavior: 'smooth' });
  };

}

useEffect(() => {
  if(id){
    getAwignFormData(`/${id}`)
    .then((res) => {
          let data = res.data;
          // dispatch(updateRole({ selectedRole: data?.selectedRole }));
          dispatch(setHasSelectedRole(true));
          dispatch(updateBasicDetails(data?.basicDetails ));
          dispatch(updateQualification(data?.qualification));
          dispatch(updateAadhaar(data?.aadhaar ));
          dispatch(updatePanCard(data?.panCard ));
          dispatch(updateAddress(data?.address ));
          dispatch(updateNeighbour(data?.neighbour));
    }).catch((error) => {
      console.error("Error loading form data:", error);
      toast.error("Failed to load form data");
    });
  }
  if( currentStep && currentStep > 0){
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  // window.scrollTo({ top: 0, behavior: "smooth" });
},[currentStep])

console.log(formState)
useEffect(() => {
  if(id){
    dispatch(setHasSelectedRole(true));
  }
}, []);

  const handleBack = () => {
    dispatch(prevStep());
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSaveChanges = () => {
    toast.success("💾 Progress saved!", {
      description: "Your changes have been saved successfully.",
    });
  };
    if (!hasSelectedRole) {
    return <RoleSelection />;
  }

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
        <div
          className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"
          style={{ animationDelay: "4s" }}
        />
      </div>

      {/* Modern Header */}
      {/* <header className="relative border-b border-border/50 backdrop-blur-xl bg-card/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
            <img src={AwignLogo} height={"50px"} width={50} alt="Awign Logo" />

              <div>
                <h1 className="text-2xl font-bold gradient-text">Awign Onboarding Interface</h1>
                <p className="text-sm text-muted-foreground">Complete your registration</p>
              </div>
            </div>
            {/* <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary/50 border border-border">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm font-medium text-muted-foreground">Auto-saving</span>
            </div> *
          </div>
        </div>
      </header> */}
        
        <header className="relative border-b border-border/50 backdrop-blur-xl bg-card/50 sticky top-0 z-30">
        <div className="container mx-2 px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
             <img src={AwignLogo} height={"50px"} width={50} alt="Awign Logo" />
              <div>
                <h1 className="text-lg md:text-2xl font-bold gradient-text">Awign Onboarding Interface</h1>
                <p className="text-sm text-muted-foreground">Complete your registration</p>
              </div>
            </div>
            {/* <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary/50 border border-border">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm font-medium text-muted-foreground">Auto-saving</span>
            </div> */}
          </div>
        </div>
      </header>

         <div className="container mx-auto px-4 py-8 max-w-8xl">
        <div className="flex flex-col gap-1 lg:flex-row lg:gap-8">
          {/* Vertical Stepper Sidebar (Desktop) - Scrollable */}
          {/* <FormStepper steps={steps} onStepClick={handleStepClick} /> */}
              {/* <div className="lg:w-1/4 w-full lg:sticky lg:top-[100px] self-start"> */}
      <FormStepper steps={steps} onStepClick={handleStepClick} />
    {/* </div> */}

          {/* Form Content */}
          <div className="flex-1 min-w-0">

        {/* Form Card */}
        <Card className="shadow-modern border-2 border-border/50 rounded-3xl overflow-hidden backdrop-blur-xl bg-card/80 animate-scale-in">
          {/* Card Header with Gradient */}
          <div className="relative gradient-primary p-8 overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iYSIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVHJhbnNmb3JtPSJyb3RhdGUoNDUpIj48cGF0aCBkPSJNLTEwIDMwaDYwdjJoLTYweiIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIuMDUiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjYSkiLz48L3N2Zz4=')] opacity-10" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold backdrop-blur-sm">
                  Step {currentStep + 1} of {steps.length}
                </span>
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">
                {stepTitles[currentStep]}
              </h2>
              <p className="text-white/80 text-sm">
                {stepSubtitles[currentStep]}
              </p>
            </div>
          </div>

          {/* Card Content */}
          <div className="p-8 space-y-6">
            {stepComponents[currentStep]}
          </div>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-8 gap-4 flex-wrap">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 0}
            className={cn(
              "h-12 px-6 rounded-xl border-2 font-semibold transition-all duration-300",
              "hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            )}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          <Button
            variant="ghost"
            onClick={handleSaveChanges}
            className="h-12 px-6 rounded-xl font-semibold hover:bg-secondary/50 transition-all duration-300"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Progress
          </Button>

          <Button
            onClick={handleNext}
            className={cn(
              "h-12 px-8 rounded-xl gradient-primary text-white font-bold shadow-glow",
              "hover:scale-105 transition-all duration-300 hover:shadow-xl",
              "border-0"
            )}
          >
            {currentStep === 6 ? (
              <>
                Submit Application
                <Sparkles className="w-4 h-4 ml-2" />
              </>
            ) : (
              <>
                Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </div>

            {/* Progress Info */}
            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground">
                Progress: <span className="font-semibold gradient-text">{Math.round(((currentStep + 1) / steps.length) * 100)}%</span> complete
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

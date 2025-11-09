import { Briefcase, UserCheck, Building2, Sparkles } from "lucide-react";
import { Card } from "../Components/Ui/card";
import { cn } from "../lib/utils";
import { useAppDispatch, useAppSelector } from "../Store/hooks";
import { updateRole, setHasSelectedRole } from "../Store/formSlice";
import { useEffect, useState } from "react";
import PreSteps from "./PreSteps";
import AwignLogo from "../assets/AwignLogo.png";

const roles = [
  {
    id: "employee",
    title: "Exam Lab Invigilator",
    description: "Monitor exams and ensure fair, secure test conduct.",
    icon: UserCheck,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    id: "contractor",
    title: "System Operator",
    description: "Manage exam systems and provide on-site technical support.",
    icon: Briefcase,
    gradient: "from-purple-500 to-pink-500",
  },
  {
    id: "consultant",
    title: "Support Staff",
    description: "Assist candidates and maintain smooth exam operations.",
    icon: Building2,
    gradient: "from-orange-500 to-red-500",
  },
];

const RoleSelection = () => {
  const dispatch = useAppDispatch();
  const [selectedRole, setSelectedRole] = useState("");
  const hasCompletedPreSteps = useAppSelector((state) => state.form.hasCompletedPreSteps);


    // If pre-steps not completed, redirect to pre-steps


  const handleRoleSelect = (roleId) => {
    setSelectedRole(roleId);
    dispatch(updateRole({ selectedRole: roleId }));
    setTimeout(() => {
      dispatch(setHasSelectedRole(true));
    }, 300);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  },[hasCompletedPreSteps])

  if (!hasCompletedPreSteps) {
    return <PreSteps />;
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

      {/* Header */}
      <header className="relative border-b border-border/50 backdrop-blur-xl bg-card/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-1">
            {/* <div className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center shadow-glow"> */}
              {/* <Sparkles className="w-6 h-6 text-white" /> */}
              <img src={AwignLogo} height={50} width={50} alt="Awign Logo"/>
            {/* </div> */}
            <div>
              <h1 className="text-2xl font-bold gradient-text"> Awign Onboarding Interface</h1>
              <p className="text-sm text-muted-foreground">Select your role to begin</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Choose Your Role
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Select the role that best describes your application purpose. This helps us customize your experience.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {roles.map((role, index) => {
            const Icon = role.icon;
            return (
              <Card
                key={role.id}
                onClick={() => handleRoleSelect(role.id)}
                className={cn(
                  "relative p-8 cursor-pointer transition-all duration-500 hover:scale-105 border-2 backdrop-blur-xl bg-card/80",
                  "animate-scale-in hover:shadow-2xl",
                  selectedRole === role.id
                    ? "border-primary shadow-glow scale-105"
                    : "border-border/50 hover:border-primary/50"
                )}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Gradient Icon Background */}
                <div className="mb-6 relative">
                  <div
                    className={cn(
                      "w-20 h-20 rounded-2xl bg-gradient-to-br mx-auto flex items-center justify-center shadow-lg",
                      role.gradient
                    )}
                  >
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  {selectedRole === role.id && (
                    <div className="absolute inset-0 rounded-2xl gradient-primary opacity-20 animate-ping" />
                  )}
                </div>

                {/* Content */}
                <div className="text-center space-y-3">
                  <h3 className="text-2xl font-bold">{role.title}</h3>
                  <p className="text-muted-foreground">{role.description}</p>
                </div>

                {/* Selection Indicator */}
                {selectedRole === role.id && (
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full gradient-primary flex items-center justify-center animate-scale-in">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                )}

                {/* Hover Gradient Border Effect */}
                <div
                  className={cn(
                    "absolute inset-0 rounded-xl bg-gradient-to-br opacity-0 transition-opacity duration-500",
                    role.gradient,
                    "group-hover:opacity-10"
                  )}
                />
              </Card>
            );
          })}
        </div>

        {selectedRole && (
          <div className="text-center animate-fade-in">
            <p className="text-sm text-muted-foreground">
              Proceeding as{" "}
              <span className="font-semibold gradient-text">
                {roles.find((r) => r.id === selectedRole)?.title}
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoleSelection;

import React, { useEffect } from "react";
import { Button } from "../Components/Ui/button";
import { Card } from "../Components/Ui/card";
import AwignLogo from "../assets/AwignLogo.png";


import { ArrowRight, Sparkles, FileText, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const IndexPre = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/form/new")
  }, []);

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

        <header className="relative border-b border-border/50 backdrop-blur-xl bg-card/50 sticky top-0 z-30">
        <div className="container mx-2 px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
             <img src={AwignLogo} height={"50px"} width={50} alt="Awign Logo" />
              <div>
              <h1 className="text-2xl font-bold gradient-text">Awign Portal</h1>
              <p className="text-sm text-muted-foreground">Complete the preliminary steps</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 pt-8 py-16 max-w-4xl">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold mb-4 gradient-text">Get Started</h2>
          <p className="text-lg text-muted-foreground">
            Choose how you'd like to proceed
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* New Application Card */}
          <Card
            className="p-8 hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer border-2 border-border/50"
            onClick={() => navigate("/form/new")}
          >
            <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center shadow-glow mb-6">
              <Plus className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Create New Application</h3>
            <p className="text-muted-foreground mb-6">
              Start a fresh application form and complete all the required steps to
              submit your information.
            </p>
            <Button className="w-full gradient-primary text-white font-bold shadow-glow hover:scale-105 transition-all">
              Start New Form
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Card>

          {/* Load Existing Form Card */}
          <Card className="p-8 hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-border/50">
            <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mb-6">
              <FileText className="w-8 h-8 text-foreground" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Load Existing Form</h3>
            <p className="text-muted-foreground mb-6">
              Have a form ID? Enter it below to continue editing your previously saved
              application.
            </p>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Enter Form ID"
                className="w-full px-4 py-3 rounded-xl border-2 border-border bg-background focus:border-primary focus:outline-none transition-colors"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && e.currentTarget.value.trim()) {
                    navigate(`/form/${e.currentTarget.value.trim()}`);
                  }
                }}
              />
              <Button
                variant="outline"
                className="w-full h-12 font-semibold"
                onClick={(e) => {
                  const input =
                    e.currentTarget.parentElement?.querySelector("input");
                  if (input?.value.trim()) {
                    navigate(`/form/${input.value.trim()}`);
                  }
                }}
              >
                Load Form
              </Button>
            </div>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            Need help? Contact our support team for assistance.
          </p>
        </div>
      </div>
    </div>
  );
};

export default IndexPre;

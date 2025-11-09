    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-accent/20 overflow-hidden relative">
      {/* Animated floating background */}
      <div className="fixed inset-0 -z-10">
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

      {/* Hide-on-scroll Header */}
      <header
        className={cn(
          "fixed top-0 left-0 w-full border-b border-border/50 backdrop-blur-xl bg-card/60 z-50 transition-transform duration-500",
          showHeader ? "translate-y-0" : "-translate-y-full"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={AwignLogo}
              height="50"
              width="50"
              alt="Awign Logo"
              className="rounded-lg"
            />
            <div>
              <h1 className="text-2xl font-bold gradient-text">
                Awign Onboarding Interface
              </h1>
              <p className="text-sm text-muted-foreground">
                Complete your registration
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Page Layout */}
      <div className="flex pt-[90px] h-full">
        {/* Fixed Stepper Sidebar */}
        <aside className="hidden md:flex flex-col items-center w-[320px] h-full fixed top-[90px] left-0 border-r border-border/40 bg-card/60 backdrop-blur-lg overflow-y-auto p-6">
          <KycVerticalStepper />
        </aside>

        {/* Scrollable Main Section */}
        <main className="flex-1 ml-0 md:ml-[320px] h-[calc(100vh-90px)] overflow-y-auto p-8">
          <div className="max-w-3xl mx-auto">
            {/* Glass Form Card */}
            <Card
              className={cn(
                "shadow-2xl border border-border/40 rounded-3xl overflow-hidden backdrop-blur-xl bg-card/80 animate-scale-in",
                "transition-all duration-500"
              )}
            >
              {/* Card Header */}
              <div className="relative gradient-primary p-8 overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iYSIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVHJhbnNmb3JtPSJyb3RhdGUoNDUpIj48cGF0aCBkPSJNLTEwIDMwaDYwdjJoLTYweiIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIuMDUiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjYSkiLz48L3N2Zz4=')] opacity-10" />
                <div className="relative">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold backdrop-blur-sm">
                      Step {currentStep + 1} of {steps.length}
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-1">
                    {stepTitles[currentStep]}
                  </h2>
                  <p className="text-white/80 text-sm">
                    {stepSubtitles[currentStep]}
                  </p>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-8 space-y-6 text-foreground">
                {stepComponents[currentStep]}
              </div>
            </Card>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-8 gap-4 flex-wrap">
              <Button
                variant="outlined"
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
                variant="text"
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
                  "hover:scale-105 transition-all duration-300 hover:shadow-xl"
                )}
              >
                {currentStep === steps.length - 1 ? (
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
                Progress:{" "}
                <span className="font-semibold gradient-text">
                  {Math.round(((currentStep + 1) / steps.length) * 100)}%
                </span>{" "}
                complete
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
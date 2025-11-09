import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Step,
  StepLabel,
  Stepper,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  CheckCircle,
  RadioButtonUnchecked,
  CreditCard,
  Home,
  Description,
  AccountCircle,
  Summarize,
} from "@mui/icons-material";

// ---- Custom Step Icon Styling ----
const StepIconRoot = styled("div")(({ theme, ownerState }) => ({
  color:
    ownerState.active || ownerState.completed
      ? theme.palette.primary.main
      : theme.palette.grey[400],
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 42,
  height: 42,
  borderRadius: "50%",
  border:
    ownerState.active || ownerState.completed
      ? `2px solid ${theme.palette.primary.main}`
      : `2px solid ${theme.palette.grey[300]}`,
  backgroundColor:
    ownerState.active || ownerState.completed
      ? theme.palette.background.paper
      : theme.palette.grey[50],
  transition: "all 0.3s ease",
  boxShadow: ownerState.active
    ? "0 0 8px rgba(25, 118, 210, 0.5)"
    : "none",
}));

function CustomStepIcon(props) {
  const { active, completed, icon } = props;

  const icons = {
    1: <AccountCircle />,
    2: <CreditCard />,
    3: <Description />,
    4: <Home />,
    5: <Summarize />,
  };

  return (
    <StepIconRoot ownerState={{ active, completed }}>
      {completed ? (
        <CheckCircle
          sx={{ color: "#22c55e", width: 24, height: 24 }}
        />
      ) : (
        icons[String(icon)] || <RadioButtonUnchecked />
      )}
    </StepIconRoot>
  );
}

// ---- Stepper Component ----
const steps = [
  "Basic Details",
  "Aadhaar Details",
  "PAN Details",
  "Address Details",
  "Summary",
];

const KycVerticalStepper = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleStepClick = (index) => setActiveStep(index);

  const handleNext = () => {
    if (activeStep < steps.length - 1) setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (activeStep > 0) setActiveStep((prev) => prev - 1);
  };

  const handleReset = () => setActiveStep(0);

  return (
    <Box
      sx={{
        background: "linear-gradient(180deg, #f9fafc 0%, #f0f4f9 100%)",
        borderRadius: "16px",
    
        p: 4,
        maxWidth: 420,
        // margin: "40px auto",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
      }}
    >
      <Typography
        variant="h6"
        sx={{ mb: 3, fontWeight: 600, color: "#0f172a" }}
      >
        KYC Verification Steps
      </Typography>

      <Stepper
        activeStep={activeStep}
        orientation="vertical"
        connector={null}
        sx={{
          "& .MuiStepLabel-root": {
            alignItems: "flex-start",
          },
          "& .MuiStepLabel-label": {
            mt: 1,
            ml: 1,
          },
          "& .MuiStep-root": {
            position: "relative",
          },
          "& .MuiStepConnector-line": {
            display: "none",
          },
        }}
      >
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel
              StepIconComponent={CustomStepIcon}
              onClick={() => handleStepClick(index)}
              sx={{
                cursor: "pointer",
                "& .MuiStepLabel-label": {
                  color:
                    index === activeStep
                      ? "#1976d2"
                      : index < activeStep
                      ? "#22c55e"
                      : "#9ca3af",
                  fontWeight: index === activeStep ? 600 : 500,
                  fontSize: "0.95rem",
                },
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  display: "block",
                  fontSize: "0.75rem",
                  color:
                    index === activeStep
                      ? "#1976d2"
                      : index < activeStep
                      ? "#22c55e"
                      : "#9ca3af",
                }}
              >
                STEP {index + 1}
              </Typography>
              {label}
            </StepLabel>

            {/* Custom Line Connector */}
            {index < steps.length - 1 && (
              <Box
                sx={{
                  position: "absolute",
                  left: 20,
                  top: 45,
                  height: 40,
                  width: 2,
                  backgroundColor:
                    index < activeStep
                      ? "#22c55e"
                      : index === activeStep
                      ? "#1976d2"
                      : "#e5e7eb",
                }}
              />
            )}
          </Step>
        ))}
      </Stepper>

    </Box>
  );
};

export default KycVerticalStepper;

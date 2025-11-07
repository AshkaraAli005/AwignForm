import { AlertCircle, CheckCircle2, Info } from "lucide-react";
import { cn } from "../lib/utils";
import { Alert, AlertDescription, AlertTitle } from "../Components/Ui/alert";

const FieldValidationIndicator = ({ isMatch, accuracy, message, fieldLabel }) => {
  if (isMatch && accuracy && accuracy >= 95) return null;

  const getVariant = () => {
    if (!isMatch) return "destructive";
    if (accuracy && accuracy < 95) return "warning";
    return "info";
  };

  const variant = getVariant();

  const Icon = !isMatch ? AlertCircle : accuracy && accuracy < 95 ? Info : CheckCircle2;

  return (
    <Alert
      variant={variant === "destructive" ? "destructive" : "default"}
      className={cn(
        "mt-2 animate-in fade-in-50 slide-in-from-top-2",
        variant === "warning" &&
          "border-amber-500/50 bg-amber-500/5 text-amber-900 dark:text-amber-100",
        variant === "info" && "border-blue-500/50 bg-blue-500/5"
      )}
    >
      <Icon
        className={cn(
          "h-4 w-4",
          variant === "warning" && "text-amber-600 dark:text-amber-400",
          variant === "info" && "text-blue-600 dark:text-blue-400"
        )}
      />
      <AlertTitle className="text-sm font-semibold">
        {!isMatch
          ? `${fieldLabel} Mismatch Detected`
          : `${fieldLabel} Needs Review`}
      </AlertTitle>
      <AlertDescription className="text-xs mt-1">
        {message ||
          (!isMatch
            ? "The information you entered doesn't match the uploaded document. Please verify and correct it."
            : `Match accuracy: ${accuracy}%. Please verify the information is correct.`)}
      </AlertDescription>
    </Alert>
  );
};

export default FieldValidationIndicator;

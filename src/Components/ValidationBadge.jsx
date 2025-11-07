import { CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const ValidationBadge = ({ isMatch, accuracy, message, className }) => {
  const getVariant = () => {
    if (isMatch) {
      if (accuracy && accuracy >= 95) return "success";
      if (accuracy && accuracy >= 80) return "warning";
      return "success";
    }
    return "error";
  };

  const variant = getVariant();

  const variantStyles = {
    success: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    warning: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    error: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
  };

  const Icon =
    variant === "success"
      ? CheckCircle2
      : variant === "warning"
      ? AlertCircle
      : XCircle;

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium transition-all",
        variantStyles[variant],
        className
      )}
    >
      <Icon className="w-3.5 h-3.5" />
      <span>
        {isMatch ? "Verified" : "Mismatch"}
        {accuracy !== undefined && ` (${accuracy}%)`}
      </span>
      {message && <span className="text-xs opacity-80">• {message}</span>}
    </div>
  );
};

export default ValidationBadge;

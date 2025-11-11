import { Input } from "../Components/Ui/input";
import { Label } from "../Components/Ui/label";
import { cn } from "../lib/utils";

const FormField = ({
  icon: Icon,
  label,
  hint,
  required = false,
  type = "text",
  value,
  onChange,
  placeholder,
}) => {
  return (
    <div className="space-y-2 group animate-fade-in">
    <div>
      <Label className={"flex items-center gap-2.5 text-sm font-semibold text-foreground" + ( !Icon ? " ml-2" : "")}>
        {Icon && <div className="w-8 h-8 rounded-xl gradient-primary flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-4 h-4 text-white" />
        </div>}
        <span>{label}</span>
        {required && <span className="text-destructive text-base">*</span>}
      </Label>

      {hint && (
        <p className="text-xs text-muted-foreground leading-relaxed pl-10">
          {hint}
        </p>
      )}
      </div>

      <div className="relative">
        <Input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          className={cn(
            "h-12 px-4 rounded-xl border-2 transition-all duration-300",
            "bg-card/50 backdrop-blur-sm",
            "border-border focus:border-primary focus:ring-4 focus:ring-primary/10",
            "hover:border-primary/50 hover:shadow-md",
            "placeholder:text-muted-foreground/50"
          )}
        />
        {value && (
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl blur-sm" />
        )}
      </div>
    </div>
  );
};

export default FormField;

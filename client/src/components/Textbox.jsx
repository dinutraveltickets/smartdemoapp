import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const Textbox = ({ 
  label, 
  error, 
  className, 
  id,
  required,
  ...props 
}) => {
  return (
    <div className="space-y-2">
      {label && (
        <Label 
          htmlFor={id}
          className={cn(
            "text-sm font-medium text-slate-700",
            required && "after:content-['*'] after:text-red-500 after:ml-1"
          )}
        >
          {label}
        </Label>
      )}
      <Input
        id={id}
        className={cn(
          "w-full transition-colors",
          error && "border-red-500 focus:border-red-500 focus:ring-red-500",
          className
        )}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default Textbox;

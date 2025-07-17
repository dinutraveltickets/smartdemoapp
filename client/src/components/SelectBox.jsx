import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const SelectBox = ({ 
  label, 
  error, 
  placeholder = "Select an option",
  options = [],
  className,
  id,
  required,
  value,
  onValueChange,
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
      <Select value={value} onValueChange={onValueChange} {...props}>
        <SelectTrigger 
          id={id}
          className={cn(
            "w-full transition-colors",
            error && "border-red-500 focus:border-red-500 focus:ring-red-500",
            className
          )}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default SelectBox;

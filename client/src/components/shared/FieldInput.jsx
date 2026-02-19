/* ---------------------------------------------------------------------------------------
FieldInput.jsx
The input field along with its label 
------------------------------------------------------------------------------------------ */

import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

function FieldInput({
  label,
  name,
  inputType = "text",
  placeholder,
  description = "",
  required = true,
  onChange = () => {},
  onBlur = () => {},
  disabled = false,
}) {
  return (
    <Field>
      <FieldLabel htmlFor={name} >
        {label}
        {required && <span className="text-destructive text-red-600">*</span>}
      </FieldLabel>
      <Input
        id={name}
        type={inputType}
        placeholder={placeholder}
        required={required}
        onChange={onChange}
        onBlur={onBlur}
        name={name}
        disabled={disabled}
        className="sm:py-5 text-md sm:text-lg lg:text-xl border-0"
      />
      {description && (
        <FieldDescription className="text-xs md:text-sm">
          {description}
        </FieldDescription>
      )}
    </Field>
  );
}

export default FieldInput;

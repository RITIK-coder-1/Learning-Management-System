/* ---------------------------------------------------------------------------------------
InputFile.jsx
The input field to upload files
------------------------------------------------------------------------------------------ */

import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

function InputFile({
  name,
  label,
  description,
  onChange,
  required = true,
  disabled = false,
}) {
  return (
    <Field>
      <FieldLabel htmlFor={name} className="text-md">
        {label}
      </FieldLabel>
      <Input
        id={name}
        type="file"
        name={name}
        onChange={onChange}
        disabled={disabled}
        required={required}
      />
      <FieldDescription className="text-xs">{description}</FieldDescription>
    </Field>
  );
}

export default InputFile;

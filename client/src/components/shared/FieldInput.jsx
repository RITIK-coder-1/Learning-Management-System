/* ---------------------------------------------------------------------------------------
FieldInput.jsx
The input field along with its label 
------------------------------------------------------------------------------------------ */

import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

function FieldInput({
  label,
  inputId,
  inputType = "text",
  placeholder,
  description = "",
}) {
  return (
    <Field>
      <FieldLabel htmlFor={inputId}>Username</FieldLabel>
      <Input id={inputId} type={inputType} placeholder={placeholder} />
      <FieldDescription>{description}</FieldDescription>
    </Field>
  );
}

export default FieldInput;

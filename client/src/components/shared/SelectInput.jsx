/* ---------------------------------------------------------------------------------------
SelectInput.jsx
The select input element
------------------------------------------------------------------------------------------ */

import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";

// select with manual options
export function SelectInputManual({
  label,
  option1,
  option2,
  children,
  name,
  required = true,
  disabled = false,
  onChange = () => {},
}) {
  return (
    <NativeSelect
      name={name}
      required={required}
      disabled={disabled}
      onChange={onChange}
      className="bg-black"
    >
      <NativeSelectOption value="" className="text-foreground">
        {label}{" "}
      </NativeSelectOption>
      <NativeSelectOption value={option1}>{option1}</NativeSelectOption>
      <NativeSelectOption value={option2}>{option2}</NativeSelectOption>
      {children}
    </NativeSelect>
  );
}

// select with dynamic options
export function SelectInputDynamic() {
  return (
    <NativeSelect>
      <NativeSelectOption value="">Select a fruit</NativeSelectOption>
      <NativeSelectOption value="apple">Apple</NativeSelectOption>
      <NativeSelectOption value="banana">Banana</NativeSelectOption>
      <NativeSelectOption value="blueberry">Blueberry</NativeSelectOption>
      <NativeSelectOption value="pineapple">Pineapple</NativeSelectOption>
    </NativeSelect>
  );
}

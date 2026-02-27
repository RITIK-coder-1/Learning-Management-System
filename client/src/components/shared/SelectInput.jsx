/* ---------------------------------------------------------------------------------------
SelectInput.jsx
The select input element
------------------------------------------------------------------------------------------ */

import { NativeSelect } from "@/components/ui/native-select";

function SelectInput({
  name,
  children,
  required = true,
  disabled = false,
  onChange,
  value,
  className,
}) {
  return (
    <NativeSelect
      name={name}
      required={required}
      disabled={disabled}
      onChange={onChange}
      className={`bg-black sm:h-10 sm:text-md cursor-pointer ${className}`}
      value={value}
    >
      {children}
    </NativeSelect>
  );
}

export default SelectInput;

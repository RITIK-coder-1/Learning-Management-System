/* ---------------------------------------------------------------------------------------
FieldTextare.jsx
The common UI for text area 
------------------------------------------------------------------------------------------ */

import { FieldLabel } from "../ui/field";

function FieldTextarea({
  name,
  label,
  onChange,
  placeholder,
  value,
  required = true,
}) {
  return (
    <div className="w-full flex flex-col justify-center items-start gap-3">
      <FieldLabel htmlFor={name}>
        {label}
        {required && <span className="text-destructive text-red-600">*</span>}
      </FieldLabel>
      <textarea
        className="resize-none placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input min-h-40 h-auto w-full min-w-0 rounded-md px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50
        focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[1px]
        aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive
        bg-black border-0 text-md sm:text-lg lg:text-xl"
        name={name}
        onChange={onChange}
        id={name}
        placeholder={placeholder}
        value={value}
        required={required}
      />
    </div>
  );
}

export default FieldTextarea;

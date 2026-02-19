/* ---------------------------------------------------------------------------------------
Button.jsx
------------------------------------------------------------------------------------------ */

import { Button } from "@/components/ui/button";

function CommonButton({
  type = "button",
  label,
  onClick = () => {},
  className,
}) {
  return (
    <Button
      type={type}
      className={`text-lg w-50 p-5 shadow-2xl shadow-black hover:bg-purple-950 ${className}`}
      onClick={onClick}
    >
      {label}
    </Button>
  );
}

export default CommonButton;

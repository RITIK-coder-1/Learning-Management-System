/* ---------------------------------------------------------------------------------------
Button.jsx
------------------------------------------------------------------------------------------ */

import { Button } from "@/components/ui/button";

function CommonButton({
  type = "button",
  label,
  onClick = () => {},
  className,
  title
}) {
  return (
    <Button
      type={type}
      className={`text-lg w-50 p-5 shadow-2xl shadow-black hover:bg-purple-950 border border-black/90 ${className}`}
      onClick={onClick}
      title={title}
    >
      {label}
    </Button>
  );
}

export default CommonButton;

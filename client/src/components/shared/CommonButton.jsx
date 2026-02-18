/* ---------------------------------------------------------------------------------------
Button.jsx
------------------------------------------------------------------------------------------ */

import { Button } from "@/components/ui/button";

function CommonButton({ type = "button", label }) {
  return (
    <Button
      type={type}
      className="text-md w-30 shadow-2xl shadow-black hover:bg-purple-950"
    >
      {label}
    </Button>
  );
}

export default CommonButton;

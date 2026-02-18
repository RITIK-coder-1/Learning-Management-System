/* ---------------------------------------------------------------------------------------
OtpInput.jsx
The input filed for OTPs
------------------------------------------------------------------------------------------ */

import * as React from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

function OtpInput({ setterFunction, name, required }) {
  const [value, setValue] = React.useState("");

  return (
    <div className="space-y-2">
      <InputOTP
        maxLength={6}
        value={value}
        onChange={(value) => {
          setValue(value);
          setterFunction(value); // pass the otp value to the parent component
        }}
        required={required}
        name={name}
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      <div className="text-center text-sm">Enter your one-time password.</div>
    </div>
  );
}

export default OtpInput;

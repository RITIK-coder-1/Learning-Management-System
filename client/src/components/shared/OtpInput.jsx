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
    <div className="space-y-2 w-90">
      <InputOTP
        maxLength={6}
        value={value}
        onChange={(value) => {
          setValue(value);
          setterFunction(value); // pass the otp value to the parent component
        }}
        required={required}
        name={name}
        className="w-full"
      >
        <InputOTPGroup className={"w-full flex justify-center items-center"}>
          <InputOTPSlot index={0} className="w-8 sm:w-12" />
          <InputOTPSlot index={1} className="w-8 sm:w-12" />
          <InputOTPSlot index={2} className="w-8 sm:w-12" />
          <InputOTPSlot index={3} className="w-8 sm:w-12" />
          <InputOTPSlot index={4} className="w-8 sm:w-12" />
          <InputOTPSlot index={5} className="w-8 sm:w-12" />
        </InputOTPGroup>
        <span className="text-center text-sm">
          Enter your one-time password.
        </span>
      </InputOTP>
    </div>
  );
}

export default OtpInput;

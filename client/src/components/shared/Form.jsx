/* ---------------------------------------------------------------------------------------
FieldInput.jsx
The form for entering data 
------------------------------------------------------------------------------------------ */
import React from "react";

function Form({ onSubmit, children }) {
  return (
    <form
      onSubmit={onSubmit}
      className="border w-88 h-auto p-3 flex flex-col justify-center gap-2 items-center rounded-md"
    >
      {children}
    </form>
  );
}

export default Form;

/* ---------------------------------------------------------------------------------------
FieldInput.jsx
The form for entering data 
------------------------------------------------------------------------------------------ */

function Form({ onSubmit, children }) {
  return (
    <form
      onSubmit={onSubmit}
      className="border border-white/10 bg-backgroundContrast w-full h-auto p-3 flex flex-col justify-center gap-6 items-center rounded-md shadow-2xl shadow-black/90 sm:w-90 md:w-95 lg:w-[50%]"
    >
      {children}
    </form>
  );
}

export default Form;

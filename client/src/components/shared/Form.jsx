/* ---------------------------------------------------------------------------------------
FieldInput.jsx
The form for entering data 
------------------------------------------------------------------------------------------ */

function Form({ onSubmit, children, className }) {
  return (
    <form
      onSubmit={onSubmit}
      className={`border border-white/10 bg-backgroundContrast w-full h-auto px-5 py-7 flex flex-col justify-center gap-6 items-center rounded-md shadow-2xl shadow-black/90 max-w-[95%] sm:max-w-md md:max-w-lg lg:w-[50%] ${className}`}
    >
      {children}
    </form>
  );
}

export default Form;

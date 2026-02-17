/* ---------------------------------------------------------------------------------------
MainSection.jsx
The main section of the app that containst the main body content of each page 
------------------------------------------------------------------------------------------ */

function MainSection({ children }) {
  return <main className="w-full h-full flex flex-col justify-center items-center gap-1 p-2">{children}</main>;
}

export default MainSection;

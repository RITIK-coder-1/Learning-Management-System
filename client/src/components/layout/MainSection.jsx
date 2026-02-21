/* ---------------------------------------------------------------------------------------
MainSection.jsx
The main section of the app that containst the main body content of each page 
------------------------------------------------------------------------------------------ */

function MainSection({ children }) {
  return (
    <main className="w-full min-h-screen flex flex-col justify-start items-center gap-5 p-3 relative">
      {children}
    </main>
  );
}

export default MainSection;

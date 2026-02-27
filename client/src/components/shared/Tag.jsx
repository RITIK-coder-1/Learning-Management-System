/* ----------------------------------------------------------------------------------------------
Tag.jsx
The UI for tags 
------------------------------------------------------------------------------------------------- */

function Tag({ label }) {
  return (
    <span className="px-1 py-0.5 text-[0.45rem] uppercase tracking-wider border border-purple-500/30 bg-purple-500/10 text-purple-300 rounded-full font-semibold transition-all hover:bg-purple-500/20 lg:text-[0.65rem] md:px-2 lg:px-2.5">
      {label}
    </span>
  );
}

export default Tag;

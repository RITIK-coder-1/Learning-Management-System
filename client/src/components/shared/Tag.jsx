/* ----------------------------------------------------------------------------------------------
Tag.jsx
The UI for tags 
------------------------------------------------------------------------------------------------- */

function Tag({ label }) {
  return (
    <span className="px-2.5 py-0.5 text-[0.65rem] uppercase tracking-wider border border-purple-500/30 bg-purple-500/10 text-purple-300 rounded-full font-semibold transition-all hover:bg-purple-500/20">
      {label}
    </span>
  );
}

export default Tag;

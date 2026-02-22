/* ----------------------------------------------------------------------------------------------
CourseCard.jsx
The common course display card
------------------------------------------------------------------------------------------------- */

function CourseCard({ image, title, instructor, description, price }) {
  let compactDescription = "";
  if (description?.length > 70) {
    compactDescription = description.slice(0, 70);
  }
  return (
    <div
      className="border w-64 border-white/10 rounded-lg overflow-hidden shadow-2xl shadow-black hover:shadow-4xl"
      title="Visit the course"
    >
      <img src={image} alt="course thumbnail" className="w-full" />
      <div className="w-full flex flex-col p-3">
        <h3 className="text-white text-xl font-bold">{title}</h3>
        <span className="text-lg text-foreground">{instructor}</span>
        <span className="text-sm text-white/60">
          {description?.length > 70 ? compactDescription : description}
        </span>
        <span className="text-white/80 font-black">&#8377; {price}</span>
      </div>
    </div>
  );
}

export default CourseCard;

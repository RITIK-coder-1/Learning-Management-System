/* ----------------------------------------------------------------------------------------------
CourseCard.jsx
The common course display card
------------------------------------------------------------------------------------------------- */

function CourseCard({
  image,
  title,
  instructor,
  description,
  price,
  accountType,
}) {
  // trim the description if it's too long
  let compactDescription = "";
  if (description?.length > 70) {
    compactDescription = description.slice(0, 70);
  }
  return (
    <div
      className="border w-64 border-white/10 rounded-lg overflow-hidden shadow-2xl shadow-black hover:shadow-4xl"
      title="Visit the course"
    >
      <img src={image} alt="course thumbnail" className="w-full h-50" />
      <div className="w-full flex flex-col p-3 gap-1">
        <h3 className="text-white text-xl font-bold">{title}</h3>
        {accountType === "Student" && (
          <span className="text-lg text-foreground">{instructor}</span> // instructor name should only be dislayed for students for viweing courses
        )}
        <span className="text-sm text-white/60">
          {description?.length > 70 ? `${compactDescription}.......` : description}
        </span>
        <span className="text-white/80 font-black">
          {price === 0 ? "Free" : `₹ ${price}`}
        </span>
      </div>
    </div>
  );
}

export default CourseCard;

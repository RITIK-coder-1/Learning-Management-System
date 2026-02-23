/* ----------------------------------------------------------------------------------------------
CourseCard.jsx
The common course display card
------------------------------------------------------------------------------------------------- */

import { Navlink } from "../index.components";

function CourseCard({
  image,
  title,
  instructor,
  description,
  price,
  accountType,
  key,
  path
}) {
  // trim the description if it's too long
  let compactDescription = "";
  if (description?.length > 70) {
    compactDescription = description.slice(0, 70);
  }
  return (
    <Navlink
      key={key}
      to={path}
    >
      <div
        className="border w-64 h-84 border-white/10 rounded-lg overflow-hidden shadow-2xl shadow-black hover:shadow-4xl flex flex-col cursor-pointer relative z-50 hover:border-white/50"
        title="Visit the course"
      >
        <img src={image} alt="course thumbnail" className="w-full h-50" />
        <div className="w-full flex flex-col justify-between grow pt-1 p-3 gap-1">
          <h3 className="text-white text-xl font-bold">{title}</h3>
          {accountType === "Student" && (
            <span className="text-lg text-foreground">{instructor}</span> // instructor name should only be dislayed for students for viweing courses
          )}
          <span className="text-sm text-white/60">
            {description?.length > 70
              ? `${compactDescription}.......`
              : description}
          </span>
          <span className="text-white/80 font-black">
            {price === 0 ? "Free" : `₹ ${price}`}
          </span>
        </div>
      </div>
    </Navlink>
  );
}

export default CourseCard;

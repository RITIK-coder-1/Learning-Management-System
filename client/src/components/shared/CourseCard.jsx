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
  path,
}) {
  return (
    <Navlink key={key} to={path}>
      <div
        className="border w-64 h-88 border-white/10 rounded-lg shadow-2xl shadow-black hover:shadow-4xl flex flex-col cursor-pointer relative z-20 hover:border-white/50 overflow-hidden"
        title="Visit the course"
      >
        <img
          src={image}
          alt="course thumbnail"
          className="w-full h-44 object-cover"
        />

        <div className="w-full flex flex-col grow">
          <h3 className="text-yellow-200 text-xl font-bold leading-tight h-7 line-clamp-1 pl-3 pt-1">
            {title}
          </h3>

          <div className="w-full flex flex-col grow p-3">
            <div className="w-full flex flex-col gap-1">
              {accountType === "Student" && (
                <span className="text-md text-white/80">{instructor}</span>
              )}

              <span className="text-xs text-white/60 h-8 line-clamp-2">
                {description}
              </span>
            </div>

            <span
              className={`font-black text-lg mt-auto ${
                price === 0 ? "text-green-500" : "text-white/80"
              }`}
            >
              {price === 0 ? "Free" : `₹ ${price}`}
            </span>
          </div>
        </div>
      </div>
    </Navlink>
  );
}

export default CourseCard;

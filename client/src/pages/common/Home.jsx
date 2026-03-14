/* ----------------------------------------------------------------------------------------------
Home.jsx
The landing page of the application 
------------------------------------------------------------------------------------------------- */

import { CommonButton } from "@/components/index.components";
import { Link } from "react-router-dom";

function Home() {
  // the brand partners
  const brands = [
    "Microsoft Logo.png",
    "Facebook Logo.png",
    "Samsung Logo.png",
    "Walmart Logo.png",
  ];

  return (
    <>
      {/* The header */}
      <header className="w-full border-b pb-2 px-3 border-white/10">
        <nav className="w-full flex justify-between">
          <div className="flex justify-start" title="EduFlow">
            <div className="flex items-center justify-center w-auto gap-1 font-bold md:text-lg md:gap-2">
              {/* The logo */}
              <img
                src="LMS.png"
                alt="the logo"
                className="w-7 h-7 rounded-full md:w-10 md:h-10"
              />
              <span>EduFlow</span>
            </div>
          </div>
          {/* Account links */}
          <div className="flex justify-center items-center gap-6">
            <Link
              className="text-md cursor-pointer hover:text-slate-400 md:text-xl"
              title="Log in"
              to="/login"
            >
              Login
            </Link>
            <Link className="hidden sm:inline" to="/register" title="Register">
              <CommonButton
                label="Create Account"
                className="w-auto text-sm rounded-full px-7 py-4 shadow-none md:text-lg md:py-5 md:px-8"
              />
            </Link>
          </div>
        </nav>
      </header>

      {/* The hero section */}
      <section className="w-full flex flex-col justify-center items-center gap-4 px-2 mt-5">
        <h1 className="text-center text-4xl text-white font-bold md:text-5xl">
          Empowering Education <br /> Through{" "}
          <span className="text-blue-400">Seamless Technology.</span>
        </h1>
        <span className="text-center text-xs text-white/80 md:text-sm">
          Experience a high-performance LMS <br /> featuring secure
          authentication, RBAC, and intuitive course management. <br /> Built
          for the modern learner.
        </span>
        {/* The brand partners */}
        <div className="w-full flex flex-col justify-center items-center mt-5 gap-3">
          <h2 className="text-center text-white/50 font-bold sm:text-lg md:text-xl">
            Trusted By Learners From
          </h2>
          <div className="w-full flex flex-wrap justify-center items-start gap-3 sm:gap-7 lg:gap-20">
            {brands.map((brand) => (
              <img src={brand} className="w-23 sm:w-28 md:w-36" />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;

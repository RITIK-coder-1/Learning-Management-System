/* ----------------------------------------------------------------------------------------------
Home.jsx
The landing page of the application 
------------------------------------------------------------------------------------------------- */

import { useGetAllTheCoursesQuery } from "@/api/index.api";
import {
  CommonButton,
  CourseCard,
  SpinnerCustom,
} from "@/components/index.components";
import filterCourses from "@/utils/filterCourses";
import { Link } from "react-router-dom";

function Home() {
  // the local component for recurring elements
  const Section = ({ children, className = "" }) => (
    <section
      className={`w-full flex flex-col justify-center items-center gap-4 mt-5 p-2 ${className}`}
    >
      {children}
    </section>
  );
  const Span = ({ children, className = "" }) => (
    <span
      className={`text-center text-xs text-white/80 md:text-sm ${className}`}
    >
      {children}
    </span>
  );
  const SecondHeading = ({ children, className = "" }) => (
    <h2 className={`text-center font-bold sm:text-lg md:text-xl ${className}`}>
      {children}
    </h2>
  );
  const BrandLogo = () => (
    <div
      className="flex items-center justify-center w-auto gap-1 font-bold md:text-lg md:gap-2"
      title="EduFlow"
      alt="Company Logo"
    >
      <img
        src="LMS.png"
        alt="the logo"
        className="w-9 h-9 rounded-full md:w-10 md:h-10"
      />
      <span className="text-xl">EduFlow</span>
    </div>
  );

  // the brand partners
  const brands = [
    { id: 1, name: "Microsoft Logo.png" },
    { id: 2, name: "Facebook Logo.png" },
    { id: 3, name: "Samsung Logo.png" },
    { id: 4, name: "Walmart Logo.png" },
  ];

  // the courses to display
  const { data, isLoading } = useGetAllTheCoursesQuery();
  const courses = data?.data.slice(0, 4); // only 4 courses
  const filteredCourses = filterCourses(courses); // filter the data to showcase

  // the testimonials
  const testimonials = [
    {
      id: 1,
      name: "Alex Johnson",
      role: "Product Manager",
      image: "https://randomuser.me/api/portraits/men/57.jpg",
      text: "This application has completely transformed our workflow. Highly recommended!",
    },
    {
      id: 2,
      name: "Sarah Williams",
      role: "Software Engineer",
      image: "https://randomuser.me/api/portraits/women/74.jpg",
      text: "The interface is so intuitive. I was able to get up and running in minutes.",
    },
    {
      id: 3,
      name: "Michael Chen",
      role: "UX Designer",
      image: "https://randomuser.me/api/portraits/men/64.jpg",
      text: "Finally, a tool that actually understands what designers need. Brilliant execution.",
    },
  ];

  return (
    <>
      {/* The header */}
      <header className="w-full border-b pb-2 px-3 border-white/10">
        <nav className="w-full flex justify-between">
          <div className="flex justify-start" title="EduFlow">
            {/* The logo */}
            <BrandLogo />
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
      <Section>
        <h1 className="text-center text-4xl text-white font-bold md:text-5xl">
          Empowering Education <br /> Through{" "}
          <span className="text-blue-400">Seamless Technology.</span>
        </h1>
        <Span>
          Experience a high-performance LMS <br /> featuring secure
          authentication, RBAC, and intuitive course management. <br /> Built
          for the modern learner.
        </Span>
        {/* The brand partners */}
        <div className="w-full flex flex-col justify-center items-center mt-16 gap-3">
          <SecondHeading className="text-white/50">
            {" "}
            Trusted By Learners From
          </SecondHeading>
          <div className="w-full flex flex-wrap justify-center items-start gap-3 sm:gap-7 lg:gap-20">
            {brands.map((brand) => (
              <img
                src={brand.name}
                className="w-23 sm:w-28 md:w-36"
                key={brand.id}
              />
            ))}
          </div>
        </div>
      </Section>

      {/* The courses section */}
      <Section>
        <SecondHeading className="text-white">
          {" "}
          Learn From The Best
        </SecondHeading>

        <Span>Discover our top-rated courses across various categories.</Span>
        <div className="w-full flex flex-col gap-6 px-7 my-5 justify-center items-center sm:flex-row">
          {isLoading ? (
            <SpinnerCustom className="size-10" />
          ) : (
            filteredCourses?.map((course) => (
              <CourseCard
                key={course?.courseId}
                image={course?.img}
                title={course?.title}
                instructor={`${course?.instructorFirstName} ${course?.instructorLastName}`}
                description={course?.desc}
                price={course?.price}
                path={`/app/courses/${course?.courseId}`}
              />
            ))
          )}
        </div>
        <Link to="/app/courses">
          <CommonButton
            label="Show all courses"
            className="bg-transparent border-white/90"
          />
        </Link>
      </Section>

      {/* The testimonials */}
      <Section>
        <SecondHeading>Testimonials</SecondHeading>
        <Span>
          Hear from the learners as they share their journey of learnings and
          transformations.
        </Span>
        <div className="py-3 px-4">
          <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-3">
            {testimonials.map((item) => (
              <div
                key={item.id}
                className="flex flex-col items-center bg-white/5 pb-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-full flex flex-col items-center rounded-2xl pt-8 mb-3 rounded-b-none bg-black/50">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 rounded-full object-cover mb-4"
                  />
                  <h3 className="text-lg font-bold text-white">{item.name}</h3>
                  <p className="text-sm font-medium text-blue-400 mb-4">
                    {item.role}
                  </p>
                </div>
                <p className="text-gray-300 text-center italic leading-relaxed px-8">
                  "{item.text}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Call To Action */}
      <Section className="my-10">
        <SecondHeading>Learn anything, anytime, anywhere.</SecondHeading>
        <Span>Start your learning journey now with EduFlow.</Span>
        <Link to="/register">
          <CommonButton label="Get Started" title="Create Account" />
        </Link>
      </Section>

      {/* The footer */}
      <footer className="w-full h-auto bg-black flex flex-col justify-center items-center pb-10 gap-5 mt-5">
        <div className="w-full h-auto flex flex-col justify-center items-center md:flex-row md:px-8 md:h-56">
          {/* The brand */}
          <div className="w-full flex flex-col justify-center items-center gap-6 py-8 md:items-start">
            <BrandLogo />
            <Span className="md:text-start">
              Experience a high-performance LMS <br /> featuring secure
              authentication, RBAC, and intuitive course management. <br />{" "}
              Built for the modern learner.
            </Span>
          </div>

          {/* The company */}
          <div className="w-full flex flex-col justify-center items-center gap-4 md:h-full md:justify-start md:py-8 md:items-end">
            <span className="text-lg text-white flex flex-col justify-center items-center">
              Company
            </span>
            <ul className="w-full flex justify-center items-center text-sm gap-4 md:flex-col md:items-end md:w-auto">
              <a href="#">
                <li className="cursor-pointer hover:text-blue-500">Home</li>
              </a>
              <a href="#">
                <li className="cursor-pointer hover:text-blue-500">About Us</li>
              </a>
              <a href="#">
                <li className="cursor-pointer hover:text-blue-500">
                  Contact Us
                </li>
              </a>
              <a href="#">
                <li className="cursor-pointer hover:text-blue-500">
                  Privacy Policy
                </li>
              </a>
            </ul>
          </div>
        </div>

        {/* Coyright */}
        <div className="w-full px-8">
          <hr className="w-full" />
        </div>
        <Span className="tracking-wider">
          Copyright 2026 © EduFlow | All Rights Reserved.
        </Span>
      </footer>
    </>
  );
}

export default Home;

/* ----------------------------------------------------------------------------------------------
NotFound.jsx
404 Page  
------------------------------------------------------------------------------------------------- */
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#020617] text-white px-4 text-center">
      <h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-600 animate-pulse">
        404
      </h1>

      <h2 className="mt-4 text-3xl font-bold md:text-4xl">
        Oops! This lesson is missing.
      </h2>

      <p className="mt-4 text-gray-400 max-w-lg text-lg">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable in the EduFlow curriculum.
      </p>

      <div className="mt-8 flex gap-4">
        <Button
          onClick={() => navigate(-1)}
          variant="outline"
          className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white"
        >
          Go Back
        </Button>

        <Button
          onClick={() => navigate("/")}
          className="bg-purple-600 hover:bg-purple-700 text-white"
        >
          Head to Home
        </Button>
      </div>
    </div>
  );
}

export default NotFound;

import { Link, Navigate, useNavigate, useRouteError } from "react-router-dom";
import { Button } from "../../components/Buttons/Button";

export default function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();
  // console.error(error);

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="bg-background-30 p-4 rounded-xl">
          <div className="flex flex-col items-center">
            <h1 className="font-bold typography-h1 text-blue-600 lg:text-6xl">
              404
            </h1>

            <h6 className="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
              <span className="text-red-500">Oops!</span> Page{" "}
              {/* {error.statusText} */}
            </h6>

            <p className="mb-4 text-center text-gray-500 md:text-lg">
              The page you’re looking for doesn’t exist.
            </p>

            <Button variant="primary" onClick={()=>navigate("admin/jobs")}>
              Let's Go Home
            </Button>

          </div>
        </div >
      </div >
    </>
  );
}
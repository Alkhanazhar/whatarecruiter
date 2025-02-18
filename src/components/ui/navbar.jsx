import { Link } from "react-router-dom";
import { Button } from "./button";

const Navbar = () => {
  const token = localStorage.getItem("token");
  return (
    <div className="bg-primary-950 py-2">
      <div className="max-w-7xl px-4 mx-auto flex items-center justify-between">
        <Link to={"/"} className="text-2xl">
          Watta Recruiter
        </Link>
        <div>
          {!token && (
            <Button asChild>
              <Link to={"/login"}>Login</Link>
            </Button>
          )}
          {token && (
            <Button asChild>
              <Link to={"/dashboard"}>Dashboard</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

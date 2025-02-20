import { jwtDecode } from "jwt-decode";
import { User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./sheet";

const Navbar = () => {
  const [showUser, setShowUser] = useState(false);
  const userPanelRef = useRef(null);
  const navigate = useNavigate();

  const role = localStorage.getItem("role");
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    toggleUser();
    navigate("/login");
  };

  const navLinks = {
    SUPER_ADMIN: [{ path: "/superadmin", name: "Dashboard" }],
    COMPANY: [{ path: "/company", name: "Dashboard" }],
    ADMIN: [{ path: "/admin", name: "Dashboard" }],
    EMPLOYEE: [{ path: "/employee", name: "Dashboard" }],
    STUDENT: [{ path: "/student", name: "Dashboard" }],
    RECRUITER: [{ path: "/RECRUITER", name: "Dashboard" }],
  };
  const linksToDisplay = role ? navLinks[role][0] : [];

  const toggleUser = () => {
    setShowUser((prev) => !prev);
  };
  const token = localStorage.getItem("token");
  const userInfo = token && jwtDecode(token);
  useEffect(() => {
    // Click outside logic
    const handleClickOutside = (event) => {
      if (
        userPanelRef.current &&
        !userPanelRef.current.contains(event.target)
      ) {
        setShowUser(false);
      }
    };

    // Add click event listener when the user panel is open
    if (showUser) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Cleanup event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showUser]);

  return (
    <div className="w-100 bg-primary-main">
      <div className="position-sticky main-navbar p-2 position-relative top-0 w-100 border-bottom shadow-lg">
        <div className="d-flex justify-content-between align-items-center">
          <div className="w-100 rounded-5 d-flex justify-content-between px-4 align-items-center">
            <Link
              to={"/"}
              className="text-primary-950 text-decoration-none fs-2"
            >
              {/* <img className="logo" src={logo} alt="logo" /> */}
              <h4 className="my-0">What A Recruiter</h4>
            </Link>
            {/* User Icon */}
            <div className=" ms-auto">
              <Sheet>
                <SheetTrigger asChild>
                  <User />
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>profile</SheetTitle>

                    <div className="d-flex flex-column align-items-start">
                      {userInfo && (
                        <>
                          <div className="user-info-container mb-4 w-100">
                            <div className="d-flex align-items-center justify-content-center my-2">
                              <User
                                className="text-black mx-auto "
                                style={{ width: "64px", height: "64px" }}
                              />
                            </div>
                            <div className="d-flex align-items-center w-100 justify-content-between text-black">
                              <div>Email</div>:{" "}
                              <div>{userInfo?.claims?.email}</div>
                            </div>

                            <div className="d-flex align-items-center w-100 justify-content-between text-black">
                              <div>Name</div>:{" "}
                              <div>{userInfo.claims?.name}</div>
                            </div>
                            <div className="d-flex align-items-center w-100 justify-content-between text-black">
                              <div>Phone Number</div>:{" "}
                              <div>{userInfo.claims?.phone_number}</div>
                            </div>
                          </div>

                          <NavLink
                            to={linksToDisplay.path}
                            className="btn btn-light w-100 text-start mb-2"
                            onClick={toggleUser} // Close dropdown when clicked
                          >
                            {linksToDisplay.name}
                          </NavLink>
                          <NavLink
                            to="/profile"
                            className="btn btn-light w-100 text-start mb-2"
                            onClick={toggleUser} // Close dropdown when clicked
                          >
                            View Profile
                          </NavLink>
                          <NavLink
                            to="/settings"
                            className="btn btn-light w-100 text-start mb-2"
                            onClick={toggleUser} // Close dropdown when clicked
                          >
                            Settings
                          </NavLink>
                          <button
                            className="btn btn-light w-100 text-start text-danger"
                            onClick={handleLogout} // Close dropdown when clicked
                          >
                            Logout
                          </button>
                        </>
                      )}
                      {!userInfo && (
                        <>
                          <div className="text-black p-2 fs-6 text-center w-100 fs-4">
                            Hello! You are New Here
                          </div>
                          {/* <Button> */}
                          <Link
                            to={"/login"}
                            className="btn text-primary-main btn-lg w-100 text-white fw-bold rounded-3 mb-2 fs-6 shadow-sm hover-lift"
                          >
                            Login
                          </Link>

                          <Link
                            to={"/signup"}
                            className="btn border fs-6 btn-outline-blue btn-lg w-100 fw-bold rounded-3 shadow-sm hover-lift"
                          >
                            Sign Up
                          </Link>
                          {/* </Button> */}
                        </>
                      )}
                    </div>
                  </SheetHeader>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

import {
  BaggageClaim,
  Factory,
  Grid2x2Check,
  Grid2x2CheckIcon,
  LogOut,
  User2,
  BriefcaseBusiness,
  Settings,
  FileUser,
} from "lucide-react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
const DashboardLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };
  const navLinks = {
    SUPER_ADMIN: [
      {
        path: "/superadmin",
        name: "Dashboard",
        icon: (
          <Grid2x2Check
            className={` icon-size cursor-pointer ${
              location.pathname === "/superadmin" ? "text-yellow" : "text-white"
            } `}
          />
        ),
      },
      {
        path: "/superadmin/users",
        name: "School",
        icon: (
          <User2
            className={` icon-size cursor-pointer ${
              location.pathname === "/superadmin/users"
                ? "text-yellow"
                : "text-white"
            } `}
          />
        ),
      },
      {
        path: "/superadmin/jobs",
        name: "School",
        icon: (
          <BaggageClaim
            className={` icon-size cursor-pointer ${
              location.pathname === "/superadmin/jobs"
                ? "text-yellow"
                : "text-white"
            } `}
          />
        ),
      },
      {
        path: "/superadmin/company",
        name: "School",
        icon: (
          <Factory
            className={` icon-size cursor-pointer ${
              location.pathname === "/superadmin/company"
                ? "text-yellow"
                : "text-white"
            } `}
          />
        ),
      },
    ],
    COMPANY: [
      {
        path: "/company",
        name: "Dashboard",
        icon: <Grid2x2CheckIcon className="icon-size" />,
      },
      // {
      //   path: "/company/sub-company",
      //   name: "Sub-company",
      //   icon: <UserIcon className="icon-size" />,
      // },
      // {
      //   path: "/company/managers",
      //   name: "Managers",
      //   icon: <Users className="icon-size" />,
      // },
      {
        path: "/company/candidates",
        name: "Candidates",
        icon: <FileUser className="icon-size" />,
      },
      {
        path: "/company/jobs",
        name: "Jobs",
        icon: <BriefcaseBusiness className="icon-size" />,
      },
      {
        path: "/company/settings",
        name: "Settings",
        icon: <Settings className="icon-size" />,
      },
    ],
    ADMIN: [
      {
        path: "/admin",
        name: "Dashboard",
        icon: <Grid2x2CheckIcon className="icon-size" />,
      },
      // {
      //   path: "/admin/sub-admin",
      //   name: "Sub-admin",
      //   icon: <UserIcon className="icon-size" />,
      // },
      // {
      //   path: "/admin/managers",
      //   name: "Managers",
      //   icon: <Users className="icon-size" />,
      // },
      // {
      //   path: "/admin/candidates",
      //   name: "Candidates",
      //   icon: <FileUser  className="icon-size" />,
      // },
      {
        path: "/admin/jobs",
        name: "Jobs",
        icon: <BriefcaseBusiness className="icon-size" />,
      },
      {
        path: "/admin/settings",
        name: "Settings",
        icon: <Settings className="icon-size" />,
      },
    ],
    RECRUITER: [
      {
        path: "/recruiter",
        name: "Dashboard",
        icon: <Grid2x2CheckIcon className="icon-size" />,
      },
      {
        path: "/recruiter/jobs",
        name: "Jobs",
        icon: <BriefcaseBusiness className="icon-size" />,
      },
      // {
      //   path: "/recruiter/employee",
      //   name: "Employee",
      //   icon: <Users className="icon-size" />,
      // },
      {
        path: "/recruiter/settings",
        name: "Settings",
        icon: <Settings className="icon-size" />,
      },
    ],
    EMPLOYEE: [
      {
        path: "/employee",
        name: "Dashboard",
        icon: <Grid2x2CheckIcon className="icon-size" />,
      },
      {
        path: "/employee/jobs",
        name: "Jobs",
        icon: <BriefcaseBusiness className="icon-size" />,
      },
      {
        path: "/employee/settings",
        name: "Settings",
        icon: <Settings className="icon-size" />,
      },
      // {
      //   path: "/employee/candidates",
      //   name: "Candidates",
      //   icon: <Users className="icon-size" />,
      // },
    ],
  };
  const role = localStorage.getItem("role");

  const linksToDisplay = role ? navLinks[role] : navLinks[0];

  return (
    <div className="h-screen flex w-full fixed">
      <div className="bg-primary-950  items-center flex-col px-4 py-5 none md:block h-full hidden">
        <div
          className="logo fs-4  w-100 mb-2 text-center text-white fw-semibold fs-4"
          // onClick={() => navigate("/")}
        >
          WAR
        </div>
        <ul className="nav flex-column mb-auto w-100 ">
          {linksToDisplay.map((link, index) => (
            <li
              key={index}
              className="nav-item mb-2 d-flex align-items-center justify-content-center mt-3"
            >
              <Link
                to={link.path}
                className={`fs-6 d-flex align-items-center justify-content-start  text-decoration-none ${
                  location.pathname === link.path ? "text-yellow" : "text-white"
                }`}
              >
                <span
                  className={`${
                    location.pathname === link.path
                      ? "text-yellow-500"
                      : "text-lime-500"
                  }`}
                >
                  {link.icon}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <div className=" w-100 " style={{ position: "absolute", bottom: 40 }}>
          <button
            className={"text-yellow btn text-center w-100"}
            onClick={handleLogout} // Close dropdown when clicked
          >
            <LogOut />
          </button>
        </div>
      </div>
      <div className="w-100 dashboard-pages">
        <div className="px-4 md:hidden dashboard-nav p-2 bg-primary-950  items-center justify-between flex">
          <div className="fs-3 text-primary-50">WAR</div>
          <div className="d-flex gap-4 align-items-center justify-content-between">
            <div>
              <ul className="nav d-flex gap-4 mb-auto w-100 ">
                {linksToDisplay.map((link, index) => (
                  <li
                    key={index}
                    className="nav-item mb-2 d-flex align-items-center justify-content-center mt-3"
                  >
                    <Link
                      to={link.path}
                      className={`fs-6 d-flex align-items-center justify-content-start  text-decoration-none ${
                        location.pathname === link.path
                          ? "text-yellow-700"
                          : "text-primary-800"
                      }`}
                    >
                      <span
                        className={`${
                          location.pathname === link.path
                            ? "text-yellow"
                            : "text-lime"
                        }`}
                      >
                        {link.icon}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <Button
              onClick={handleLogout} // Close dropdown when clicked
            >
              Logout
            </Button>
          </div>
        </div>
        <div className="h-screen overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;

import { Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode"; // Fixed import
import { useProfileData } from "@/hooks/use-fetch-profile";
import TopBar from "@/components/dashboard/dashboard-header";
import { toast } from "@/hooks/use-toast";

const token = localStorage.getItem("token");
const userData = token && jwtDecode(token);

// Define roles and fields
const roles = [
  "SUPER_ADMIN",
  "COMPANY",
  "ADMIN",
  "RECRUITER",
  "USER",
  "EMPLOYEE",
];
const fieldsByRole = {
  SUPER_ADMIN: ["My Account", "Configuration", "Permissions"],
  COMPANY: ["My Account", "Configuration", "Permissions"],
  ADMIN: ["My Account", "Configuration", "Permissions"],
  RECRUITER: ["My Account"],
  USER: ["My Account"],
  EMPLOYEE: ["My Account"],
};

const routesByRole = {
  SUPER_ADMIN: {
    myProfile: "my-profile",
    loginPassword: "login-password",
    emailPreferences: "#",
    jobFields: "#",
    screeningQuestions: "#",
    userManagement: "#",
    systemRoles: "#",
  },
  COMPANY: {
    myProfile: "my-profile",
    loginPassword: "login-password",
    emailPreferences: "#",
    jobFields: "job-fields",
    screeningQuestions: "#",
    userManagement: "user-management",
    systemRoles: "#",
  },
  ADMIN: {
    myProfile: "my-profile",
    loginPassword: "login-password",
    emailPreferences: "#",
    jobFields: "job-fields",
    screeningQuestions: "#",
    userManagement: "user-management",
    systemRoles: "#",
  },
  RECRUITER: {
    myProfile: "my-profile",
    loginPassword: "login-password",
    emailPreferences: "#",
  },
  USER: {
    myProfile: "my-profile",
    loginPassword: "login-password",
    emailPreferences: "#",
  },
  EMPLOYEE: {
    myProfile: "my-profile",
    loginPassword: "login-password",
    emailPreferences: "#",
  },
};

const SettingsProfile = () => {
  const { profileData, loading } = useProfileData();
  const [accessibleFields, setAccessibleFields] = useState([]);

  useEffect(() => {
    if (
      userData &&
      userData?.claims?.role &&
      roles.includes(userData?.claims?.role)
    ) {
      setAccessibleFields(fieldsByRole[userData?.claims?.role] || []);
    } else {
      toast({ title: "error", description: "Unauthorized access!" });
      navigate("/login");
    }
  }, []);

  const navigate = useNavigate();

  return (
    <div className="me-md-3 ">
      <div>
        <TopBar icon={Settings} title={"Settings"} />
      </div>
      <div className=" mx-10 my-4">
        <div className=" grid md:grid-cols-3 gap-4">
          <div className="col-span-1   p-4 border rounded-2 shadow-sm w-full">
            <img
              className="user-img w-10 h-10"
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              alt="user"
            />
            <div className="mt-2 fw-semibold fs-4">
              {profileData?.name || "Placeholder Name"}
            </div>
            <div className="fw-semibold fs-7">{profileData?.role || "N/A"}</div>
          </div>
          {accessibleFields?.includes("My Account") && (
            <div className="col-span-1  p-4 border rounded-2 shadow-sm">
              <div className="section">
                <h4>
                  <strong>My Account</strong>
                </h4>
                <div className="section-content">
                  <div
                    className="cursor-pointer underline"
                    onClick={() =>
                      navigate(routesByRole[userData.claims.role]?.myProfile)
                    }
                  >
                    My Profile
                  </div>
                  <div
                    className="cursor-pointer underline"
                    onClick={() =>
                      navigate(
                        routesByRole[userData.claims.role]?.loginPassword
                      )
                    }
                  >
                    Login & Password
                  </div>
                  <div
                    className="cursor-pointer underline"
                    onClick={() =>
                      navigate(
                        routesByRole[userData.claims.role]?.emailPreferences
                      )
                    }
                  >
                    Email Preferences
                  </div>
                </div>
              </div>
            </div>
          )}
          {accessibleFields.includes("Configuration") && (
            <div className="col-span-1 border p-4">
              <div className="section">
                <h4>
                  <strong>Configuration</strong>
                </h4>
                <div className="section-content">
                  <div
                    className="cursor-pointer underline"
                    onClick={() =>
                      navigate(routesByRole[userData.claims.role]?.jobFields)
                    }
                  >
                    Job Fields
                  </div>
                  <div
                    className="cursor-pointer underline"
                    onClick={() =>
                      navigate(
                        routesByRole[userData.claims.role]?.screeningQuestions
                      )
                    }
                  >
                    Screening Questions
                  </div>
                </div>
              </div>
            </div>
          )}
          {accessibleFields.includes("Permissions") && (
            <div className="col-span-1 border p-4  rounded-2 shadow-sm">
              <div className="section">
                <h4>
                  <strong>Permissions</strong>
                </h4>
                <div className="section-content">
                  <div
                    className="cursor-pointer underline"
                    onClick={() =>
                      navigate(
                        routesByRole[userData.claims.role]?.userManagement
                      )
                    }
                  >
                    User Management
                  </div>
                  <div
                    className="cursor-pointer underline"
                    onClick={() =>
                      navigate(routesByRole[userData.claims.role]?.systemRoles)
                    }
                  >
                    System Roles
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsProfile;

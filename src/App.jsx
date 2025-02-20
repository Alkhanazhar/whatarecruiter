import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Login from "./pages/Login";

import axios from "axios";
import Home from "./pages/home";
import { Toaster } from "./components/ui/toaster";
import DashboardLayout from "./components/dashboard/dashboar-layout";
import Dashboard from "./components/dashboard/dashboard";
import Jobs from "./pages/jobs";
import Candidates from "./components/dashboard/candidates/Candidates";
import AddCandidates from "./components/dashboard/candidates/AddCandidates";
import CreateJob from "./components/dashboard/jobs/create-jobs";
import SettingsProfile from "./pages/SettingsProfile";
import MyProfile from "./pages/Settings/MyProfile";
import CreateJobFields from "./pages/Settings/CreateJobFields";
import JobFields from "./pages/Settings/JobFields";
import UserManagement from "./pages/Settings/UserManagement";
import CreateUser from "./pages/Settings/CreateUser";
import LoginPassword from "./pages/Settings/LoginPassword";
import ApplicantProfile from "./components/dashboard/jobs/applicants-profile";
import { JobProfile } from "./pages/job-profile";
import Create from "./components/dashboard/company/create";
import Company from "./components/dashboard/company/Company";
import CreateEmployee from "./components/dashboard/employee/CreateEmployee";
import Employee from "./components/dashboard/employee/Employee";
import CreateCandidates from "./components/dashboard/candidates/CreateCandidates";
import CreateManager from "./components/dashboard/manager/CreateManager";
import Managers from "./components/dashboard/manager/Managers";
import NotFound from "./pages/not-found";

axios.defaults.baseURL = "https://app.whatarecruiter.com/api";
// axios.defaults.baseURL = "http://192.168.1.57:8080/api/";
// axios.defaults.baseURL = "http://localhost:8081/api/";
const App = () => {
  function ProtectedRoute({ children, allowedRoles = "" }) {
    const location = useLocation();
    const role = localStorage.getItem("role");
    if (!role || !allowedRoles.includes(role)) {
      return <Navigate to="/not-found" state={{ from: location }} />;
    }
    return children;
  }
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <Routes>
                  <Route path="/" element={<DashboardLayout />}>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/jobs" element={<Jobs />} />
                    <Route path="/jobs/create" element={<CreateJob />} />
                    <Route
                      path="/jobs/job-profile/:jobId/job-applicants/:applicantId"
                      element={<ApplicantProfile />}
                    />
                    {/* <Route path="/managers" element={<Managers />} /> */}
                    <Route path="/settings" element={<SettingsProfile />} />
                    <Route path="settings/my-profile" element={<MyProfile />} />
                    <Route
                      path="settings/job-fields/create"
                      element={<CreateJobFields />}
                    />
                    <Route path="settings/job-fields" element={<JobFields />} />
                    <Route
                      path="settings/user-management"
                      element={<UserManagement />}
                    />
                    <Route
                      path="settings/user-management/create-user"
                      element={<CreateUser />}
                    />
                    <Route path="/candidates" element={<Candidates />} />
                    <Route
                      path="settings/login-password"
                      element={<LoginPassword />}
                    />
                    {/* <Route
                      path="/managers/create"
                      element={<CreateManager />}
                    />
                    <Route path="/sub-admin" element={<Employee />} />
                    <Route
                      path="/sub-admin/create"
                      element={<CreateEmployee />}
                    />
                    <Route
                      path="/jobs/job-profile/:id"
                      element={<JobProfile />}
                    />
                    */}
                  </Route>
                </Routes>
              </ProtectedRoute>
            }
          />
          <Route
            path="/employee/*"
            element={
              <ProtectedRoute allowedRoles={["EMPLOYEE"]}>
                <Routes>
                  <Route path="/" element={<DashboardLayout />}>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/candidates" element={<Candidates />} />
                    <Route path="/candidates/add" element={<AddCandidates />} />
                    <Route path="/jobs" element={<Jobs />} />
                  </Route>
                </Routes>
              </ProtectedRoute>
            }
          />
          <Route
            path="/superadmin/*"
            element={
              <ProtectedRoute allowedRoles={["SUPER_ADMIN"]}>
                <Routes>
                  <Route path="/" element={<DashboardLayout />}>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/jobs" element={<Jobs />} />
                    <Route path="/company" element={<Company />} />
                    <Route path="/company/create" element={<Create />} />
                    <Route
                      path="/jobs/job-profile/:id"
                      element={<JobProfile />}
                    />
                    <Route
                      path="/jobs/job-profile/:jobId/job-applicants/:applicantId"
                      element={<ApplicantProfile />}
                    />
                  </Route>
                </Routes>
              </ProtectedRoute>
            }
          />

          <Route
            path="/company/*"
            element={
              <ProtectedRoute allowedRoles={["COMPANY"]}>
                <Routes>
                  <Route path="/" element={<DashboardLayout />}>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/jobs" element={<Jobs />} />
                    <Route path="/jobs/create-jobs" element={<CreateJob />} />
                    <Route path="/managers" element={<Managers />} />
                    <Route path="/settings" element={<SettingsProfile />} />
                    <Route path="settings/my-profile" element={<MyProfile />} />
                    <Route
                      path="settings/job-fields/create"
                      element={<CreateJobFields />}
                    />
                    <Route path="settings/job-fields" element={<JobFields />} />
                    <Route
                      path="settings/user-management"
                      element={<UserManagement />}
                    />
                    <Route
                      path="settings/user-management/create-user"
                      element={<CreateUser />}
                    />
                    <Route path="/candidates" element={<Candidates />} />
                    <Route
                      path="settings/login-password"
                      element={<LoginPassword />}
                    />
                    <Route
                      path="/managers/create"
                      element={<CreateManager />}
                    />
                    <Route path="/sub-admin" element={<Employee />} />
                    <Route
                      path="/sub-admin/create"
                      element={<CreateEmployee />}
                    />
                    <Route
                      path="/jobs/job-profile/:id"
                      element={<JobProfile />}
                    />
                    <Route
                      path="/jobs/job-profile/:jobId/job-applicants/:applicantId"
                      element={<ApplicantProfile />}
                    />
                  </Route>
                </Routes>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <Routes>
                  <Route path="/" element={<DashboardLayout />}>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/jobs" element={<Jobs />} />
                    <Route path="/jobs/create-jobs" element={<CreateJob />} />
                    <Route path="/managers" element={<Managers />} />
                    <Route path="/settings" element={<SettingsProfile />} />
                    <Route path="settings/my-profile" element={<MyProfile />} />
                    <Route
                      path="settings/job-fields/create"
                      element={<CreateJobFields />}
                    />
                    <Route path="settings/job-fields" element={<JobFields />} />
                    <Route
                      path="settings/user-management"
                      element={<UserManagement />}
                    />
                    <Route
                      path="settings/user-management/create-user"
                      element={<CreateUser />}
                    />
                    <Route path="/candidates" element={<Candidates />} />
                    <Route
                      path="settings/login-password"
                      element={<LoginPassword />}
                    />
                    <Route
                      path="/managers/create"
                      element={<CreateManager />}
                    />
                    <Route path="/sub-admin" element={<Employee />} />
                    <Route
                      path="/sub-admin/create"
                      element={<CreateEmployee />}
                    />
                    <Route
                      path="/jobs/job-profile/:id"
                      element={<JobProfile />}
                    />
                    <Route
                      path="/jobs/job-profile/:jobId/job-applicants/:applicantId"
                      element={<ApplicantProfile />}
                    />
                  </Route>
                </Routes>
              </ProtectedRoute>
            }
          />
          <Route
            path="/employee/*"
            element={
              <ProtectedRoute allowedRoles={["EMPLOYEE"]}>
                <Routes>
                  <Route path="/" element={<DashboardLayout />}>
                    <Route path="/" element={<Dashboard />} />
                    {/* <Route path="/users" element={<User />} /> */}
                    <Route path="/candidates" element={<Candidates />} />
                    <Route path="/candidates/add" element={<AddCandidates />} />
                    <Route path="/jobs" element={<Jobs />} />
                    <Route path="/settings" element={<SettingsProfile />} />
                    <Route path="settings/my-profile" element={<MyProfile />} />
                    <Route
                      path="settings/login-password"
                      element={<LoginPassword />}
                    />
                    <Route path="/jobs/create-jobs" element={<CreateJob />} />
                    <Route
                      path="/candidates/create"
                      element={<CreateCandidates />}
                    />
                    <Route
                      path="/jobs/job-profile/:id"
                      element={<JobProfile />}
                    />
                    <Route
                      path="/jobs/job-profile/:jobId/job-applicants/:applicantId"
                      element={<ApplicantProfile />}
                    />
                  </Route>
                </Routes>
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/*"
            element={
              <ProtectedRoute allowedRoles={["USER"]}>
                <Routes>
                  <Route path="/" element={<DashboardLayout />}>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/jobs" element={<Jobs />} />
                    {/* <Route path="/users" element={<User />} /> */}
                    <Route path="/settings" element={<SettingsProfile />} />
                    <Route path="settings/my-profile" element={<MyProfile />} />
                    <Route
                      path="settings/login-password"
                      element={<LoginPassword />}
                    />
                    <Route
                      path="/jobs/job-profile/:id"
                      element={<JobProfile />}
                    />
                    <Route
                      path="/jobs/job-profile/:jobId/job-applicants/:applicantId"
                      element={<ApplicantProfile />}
                    />
                  </Route>
                </Routes>
              </ProtectedRoute>
            }
          />
          <Route
            path="/recruiter/*"
            element={
              <ProtectedRoute allowedRoles={["RECRUITER"]}>
                <Routes>
                  <Route path="/" element={<DashboardLayout />}>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/jobs" element={<Jobs />} />
                    <Route path="/jobs/create-jobs" element={<CreateJob />} />
                    {/* <Route path="/users" element={<User />} /> */}
                    <Route path="/employee" element={<Employee />} />
                    <Route path="/settings" element={<SettingsProfile />} />
                    <Route path="settings/my-profile" element={<MyProfile />} />
                    <Route
                      path="settings/login-password"
                      element={<LoginPassword />}
                    />
                    <Route
                      path="/employee/create"
                      element={<CreateEmployee />}
                    />
                    <Route
                      path="/jobs/job-profile/:id"
                      element={<JobProfile />}
                    />
                    <Route
                      path="/jobs/job-profile/:jobId/job-applicants/:applicantId"
                      element={<ApplicantProfile />}
                    />
                  </Route>
                </Routes>
              </ProtectedRoute>
            }
          />

          <Route
            path="/recruitment_manager/*"
            element={
              <ProtectedRoute allowedRoles={["RECRUITMENT_MANAGER"]}>
                <Routes>
                  <Route path="/" element={<DashboardLayout />}>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/jobs" element={<Jobs />} />
                    <Route path="/jobs/create-jobs" element={<CreateJob />} />
                    `` <Route path="/employee" element={<Employee />} />
                    <Route path="/settings" element={<SettingsProfile />} />
                    <Route path="settings/my-profile" element={<MyProfile />} />
                    <Route
                      path="settings/login-password"
                      element={<LoginPassword />}
                    />
                    <Route
                      path="/employee/create"
                      element={<CreateEmployee />}
                    />
                    <Route
                      path="/jobs/job-profile/:id"
                      element={<JobProfile />}
                    />
                    <Route
                      path="/jobs/job-profile/:jobId/job-applicants/:applicantId"
                      element={<ApplicantProfile />}
                    />
                  </Route>
                </Routes>
              </ProtectedRoute>
            }
          />

          {/* <Route path="/careers/:parentId" element={<Careers />} />
        
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <Routes>
                  <Route path="/" element={<DashboardLayout />}>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/jobs" element={<Jobs />} />
                    <Route path="/jobs/create-jobs" element={<CreateJob />} />
                    <Route path="/managers" element={<Managers />} />
                    <Route path="/settings" element={<SettingsProfile />} />
                    <Route path="settings/my-profile" element={<MyProfile />} />
                    <Route path="/candidates" element={<Candidates />} />
                    <Route
                      path="settings/login-password"
                      element={<LoginPassword />}
                    />
                    <Route
                      path="/managers/create"
                      element={<CreateManager />}
                    />
                    <Route path="/sub-admin" element={<Employee />} />
                    <Route
                      path="/sub-admin/create"
                      element={<CreateEmployee />}
                    />
                    <Route
                      path="/jobs/job-profile/:id"
                      element={<JobProfile />}
                    />
                    <Route
                      path="/jobs/job-profile/:jobId/job-applicants/:applicantId"
                      element={<ApplicantProfile />}
                    />
                  </Route>
                </Routes>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/user/*"
            element={
              <ProtectedRoute allowedRoles={["USER"]}>
                <Routes>
                  <Route path="/" element={<DashboardLayout />}>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/jobs" element={<Jobs />} />
                    <Route path="/users" element={<User />} />
                    <Route path="/settings" element={<SettingsProfile />} />
                    <Route path="settings/my-profile" element={<MyProfile />} />
                    <Route
                      path="settings/login-password"
                      element={<LoginPassword />}
                    />
                    <Route
                      path="/jobs/job-profile/:id"
                      element={<JobProfile />}
                    />
                    <Route
                      path="/jobs/job-profile/:jobId/job-applicants/:applicantId"
                      element={<ApplicantProfile />}
                    />
                  </Route>
                </Routes>
              </ProtectedRoute>
            }
          />
          <Route
            path="/recruitment_manager/*"
            element={
              <ProtectedRoute allowedRoles={["RECRUITMENT_MANAGER"]}>
                <Routes>
                  <Route path="/" element={<DashboardLayout />}>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/jobs" element={<Jobs />} />
                    <Route path="/jobs/create-jobs" element={<CreateJob />} />
                    <Route path="/users" element={<User />} />
                    <Route path="/employee" element={<Employee />} />
                    <Route path="/settings" element={<SettingsProfile />} />
                    <Route path="settings/my-profile" element={<MyProfile />} />
                    <Route
                      path="settings/login-password"
                      element={<LoginPassword />}
                    />
                    <Route
                      path="/employee/create"
                      element={<CreateEmployee />}
                    />
                    <Route
                      path="/jobs/job-profile/:id"
                      element={<JobProfile />}
                    />
                    <Route
                      path="/jobs/job-profile/:jobId/job-applicants/:applicantId"
                      element={<ApplicantProfile />}
                    />
                  </Route>
                </Routes>
              </ProtectedRoute>
            }
          />

          <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/not-found" />} />
          <Route path="/" element={<Home />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/applicantProfile" element={<ApplicantProfile />} /> */}
          <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/not-found" />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </>
  );
};

export default App;

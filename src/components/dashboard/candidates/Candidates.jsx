import { FileUser, SquareKanban } from "lucide-react";
import Title from "../dashboard/Title";
import DashboardInput from "../dashboard/DashboardInput";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { showToast } from "../global/showToast";

const Candidates = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const applicants = [
    {
      id: "00001",
      name: "Christine Brooks",
      email: "chris@gmail.com",
      date: "04 Sep 2019",
      job: "UI/UX Designer",
    },
    {
      id: "00002",
      name: "Rosie Pearson",
      email: "rosie@gmail.com",
      date: "28 May 2023",
      job: "Frontend",
    },
    {
      id: "00003",
      name: "Darrell Caldwell",
      email: "darr@gmail.com",
      date: "23 Nov 2019",
      job: "Backend",
    },
    {
      id: "00004",
      name: "Gilbert Johnston",
      email: "gillie@gmail.com",
      date: "05 Feb 2019",
      job: "Project Manager",
    },
    {
      id: "00005",
      name: "Alan Cain",
      email: "alan@gmail.com",
      date: "29 Jul 2019",
      job: "CSA",
    },
    {
      id: "00006",
      name: "Alfred Murray",
      email: "alfred@gmail.com",
      date: "15 Aug 2019",
      job: "Manager",
    },
    {
      id: "00007",
      name: "Maggie Sullivan",
      email: "maggie@gmail.com",
      date: "21 Dec 2019",
      job: "SAP Consultant",
    },
    {
      id: "00008",
      name: "Rosie Todd",
      email: "rosie.todd@gmail.com",
      date: "30 Apr 2019",
      job: "Graphic Designer",
    },
    {
      id: "00009",
      name: "Dollie Hines",
      email: "dollie@gmail.com",
      date: "09 Jan 2019",
      job: "UI/UX",
    },
    // Add more items as needed...
  ];

  // Pagination logic
  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentItems = applicants.slice(firstItemIndex, lastItemIndex);
  const totalPages = Math.ceil(applicants.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // const [managers, setManagers] = useState([]);
  // const navigate = useNavigate();
  // const token = localStorage.getItem("token");
  // const userData = token && jwtDecode(token);
  // const role = localStorage.getItem("role");

  // const fetchApplicants = async () => {
  //   try {
  //     const response = await axios.get(
  //       `/job-applications/by-parent-id/${userData.claims.id}`
  //     );
  //     if (!response.error) {
  //       setManagers(() => response.data.meta);
  //     } else if (response.data.error) {
  //       showToast("error", response.data.message);
  //     }
  //   } catch (error) {
  //     if (error.status === 404) {
  //       console.log("No Applicants Found");
  //     } else {
  //       showToast(
  //         "error",
  //         error.response?.data?.message || "An error occurred"
  //       );
  //     }
  //   }
  // };
  // useEffect(() => {
  //   fetchApplicants();
  // }, []);
  return (
    <>
      <div className="container mt-5">
        <h2 className="mb-4">23 Applicants</h2>
        <table className="table table-striped table-bordered table-hover">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Date</th>
              <th>Job</th>
              <th>Resume</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((applicant) => (
              <tr key={applicant.id}>
                <td>{applicant.id}</td>
                <td>{applicant.name}</td>
                <td>{applicant.email}</td>
                <td>{applicant.date}</td>
                <td>{applicant.job}</td>
                <td>
                  <button className="btn btn-primary btn-sm">Resume/CV</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <nav>
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 && "disabled"}`}>
              <button
                className="page-link"
                onClick={() => handlePageChange(currentPage - 1)}
              >
                Previous
              </button>
            </li>
            {[...Array(totalPages)].map((_, index) => (
              <li
                key={index}
                className={`page-item ${currentPage === index + 1 && "active"}`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
            <li
              className={`page-item ${
                currentPage === totalPages && "disabled"
              }`}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
    // <div className="me-md-3">
    //   <div>
    //     <Title icon={FileUser} title={"Applicants"} />
    //   </div>
    //   <div className="w-75 mx-auto mt-4">
    //     <DashboardInput />
    //   </div>
    //   <div className="d-flex gap-4 w-100">
    //     <div className="my-md-4">
    //       <div className="row">
    //         <div className="col">
    //           <select className="form-select rounded-3">
    //             <option>Job Shows</option>
    //             <option>Option 1</option>
    //             <option>Option 2</option>
    //           </select>
    //         </div>
    //         <div className="col">
    //           <select className="form-select rounded-3">
    //             <option>Department</option>
    //             <option>Option 1</option>
    //             <option>Option 2</option>
    //           </select>
    //         </div>
    //         <div className="col">
    //           <select className="form-select rounded-3">
    //             <option>Location</option>
    //             <option>Option 1</option>
    //             <option>Option 2</option>
    //           </select>
    //         </div>
    //       </div>
    //     </div>
    //     {/* <div className="d-flex align-items-center justify-content-center">
    //       <button
    //         className="btn btn-primary btn-theme"
    //         onClick={() => navigate("create")}
    //       >
    //         Create Candidates
    //       </button>
    //     </div> */}
    //   </div>
    //   <JobTable jobs={managers} />
    // </div>
  );
};

export function JobTable({ jobs = [] }) {
  const navigate = useNavigate();
  // Job data array

  return (
    <div className="">
      <table className="table table-striped table-hover border text-center">
        <thead className="table-light">
          <tr>
            <th scope="col">S No.</th>
            <th scope="col">Applicant Name</th>
            <th scope="col">Email</th>
            <th scope="col">Mobile</th>
            <th scope="col">Job Title</th>
            <th scope="col">Resume/CV</th>
          </tr>
        </thead>
        <tbody>
          {jobs?.map((job, index) => (
            <tr key={index} className="cursor-pointer">
              <td>{index + 1}</td>
              <td>{job?.candidateName}</td>
              <td>{job?.email}</td>
              <td>{job?.phone}</td>
              <td>{job?.jobTitle}</td>
              <td>
                <a
                  className="btn btn-primary"
                  href={job?.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Resume/CV
                </a>
              </td>
            </tr>
          ))}

          {jobs?.length === 0 ? (
            <tr>
              <td colSpan={6}>No Applicants Found</td>
            </tr>
          ) : (
            ""
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Candidates;

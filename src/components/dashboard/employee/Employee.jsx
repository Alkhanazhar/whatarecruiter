import { SquareKanban } from "lucide-react";
import Title from "../dashboard/Title";
import DashboardInput from "../dashboard/DashboardInput";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { showToast } from "../global/showToast";
import { Trash2Icon } from "lucide-react";

const token = localStorage.getItem("token");
const userData = token && jwtDecode(token);

const Employee = () => {
  const [managers, setManagers] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const navigate = useNavigate();

  const fetchCompanies = async (page = 1, size = 25) => {
    try {
      const response = await axios.get(
        `/employee/page/parent/${userData.claims?.id}?page=${page}&size=${size}`
      );

      if (!response.data.error) {
        setManagers(response.data.meta.employees);
        setTotalItems(response.data.meta.totalItems);
        setCurrentPage(response.data.meta.currentPage);
        setTotalPages(response.data.meta.totalPages);
      } else {
        showToast("warn", response.data.message);
      }
    } catch (error) {
      if (error.status === 404) {
        console.log("No Employees Found");
      } else {
        showToast(
          "error",
          error.response?.data?.message || "An error occurred"
        );
      }
    }
  };

  useEffect(() => {
    fetchCompanies(currentPage, pageSize); // Fetch data based on page size
  }, [currentPage, pageSize]);

  const goToPage = (page) => {
    setCurrentPage(page);
    fetchCompanies(page, pageSize); // Fetch with updated page size
  };

  const handlePageSizeChange = (event) => {
    const newSize = event.target.value;
    setPageSize(newSize);
    setCurrentPage(1); // Reset to first page when page size changes
  };

  return (
    <div className="me-md-3">
      <div>
        <Title icon={SquareKanban} title={"Employee"} />
      </div>
      <div className="w-75 mx-auto mt-2">
        <DashboardInput />
      </div>
      <div className="d-flex gap-4 w-100 align-items-center justify-content-center">
        <div className="my-md-4">
          <div className="row">
            <div className="col">
              <select className="form-select rounded-3">
                <option>Job Shows</option>
                <option>Option 1</option>
                <option>Option 2</option>
              </select>
            </div>
            <div className="col">
              <select className="form-select rounded-3">
                <option>Department</option>
                <option>Option 1</option>
                <option>Option 2</option>
              </select>
            </div>
            <div className="col">
              <select className="form-select rounded-3">
                <option>Location</option>
                <option>Option 1</option>
                <option>Option 2</option>
              </select>
            </div>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-center">
          <button
            className="btn btn-primary btn-theme"
            onClick={() => navigate("create")}
          >
            Create Employee
          </button>
        </div>
        <div className="col d-flex">
          <select
            className="form-select w-auto"
            value={pageSize}
            onChange={handlePageSizeChange}
          >
            <option value={5}>25</option>
            <option value={50}>50</option>
            <option value={75}>75</option>
            <option value={100}>100</option>
          </select>
        </div>
      </div>
      <JobTable
        jobs={managers}
        fetchCompanies={fetchCompanies}
        currentPage={currentPage}
        totalPages={totalPages}
        goToPage={goToPage}
      />
    </div>
  );
};

export function JobTable({
  jobs = [],
  fetchCompanies,
  currentPage,
  totalPages,
  goToPage,
}) {
  const navigate = useNavigate();
  let employeeIdToDelete = null;

  const setEmployeeIdToDelete = (id) => {
    employeeIdToDelete = id;
  };

  const confirmDelete = async () => {
    const parentId = userData.claims.id;
    try {
      const response = await axios.delete(
        `/employee/${employeeIdToDelete}/parent/${parentId}`
      );
      if (!response.data.error) {
        showToast("success", "Employee deleted successfully");
        fetchCompanies(); // Refresh data after deletion
      } else {
        showToast("warn", response.data.message);
      }
    } catch (error) {
      showToast("error", error.response?.data?.message || "An error occurred");
    }
    const modal = window.bootstrap.Modal.getInstance(
      document.getElementById("deleteModal")
    );
    modal.hide();
  };

  return (
    <div>
      <div className="table-data">
        <table className="table table-striped table-hover border text-center center-table">
          <thead className="table-light">
            <tr>
              <th>S No.</th>
              <th scope="col" style={{ width: "15%" }} className="text-center">
                Name
              </th>
              <th scope="col" style={{ width: "25%" }} className="text-center">
                Email
              </th>
              <th scope="col" style={{ width: "15%" }} className="text-center">
                Mobile
              </th>
              <th scope="col" style={{ width: "15%" }} className="text-center">
                Username
              </th>
              <th scope="col" style={{ width: "10%" }} className="text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {jobs.length > 0 ? (
              jobs
                .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
                .map((job, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{job?.name}</td>
                    <td>{job?.email}</td>
                    <td>{job?.phoneNumber}</td>
                    <td>{job?.username}</td>
                    <td>
                      <button
                        className="btn"
                        data-bs-toggle="modal"
                        data-bs-target="#deleteModal"
                        onClick={() => setEmployeeIdToDelete(job?.id)}
                      >
                        <Trash2Icon color="red" />
                      </button>
                    </td>
                  </tr>
                ))
            ) : (
              <tr>
                <td colSpan={6}>No Employees Found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {jobs.length > 0 ? (
        <nav aria-label="Page navigation">
          <ul className="pagination justify-content-center my-3">
            {/* Previous Button */}
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => goToPage(currentPage - 1)}
              >
                Previous
              </button>
            </li>

            {/* Previous Page */}
            {currentPage > 1 && (
              <li className="page-item">
                <button
                  className="page-link"
                  onClick={() => goToPage(currentPage - 1)}
                >
                  {currentPage - 1}
                </button>
              </li>
            )}

            {/* Current Page */}
            <li className="page-item active">
              <span className="page-link">{currentPage}</span>
            </li>

            {/* Next Page */}
            {currentPage < totalPages && (
              <li className="page-item">
                <button
                  className="page-link"
                  onClick={() => goToPage(currentPage + 1)}
                >
                  {currentPage + 1}
                </button>
              </li>
            )}

            {/* Next Button */}
            <li
              className={`page-item ${
                currentPage === totalPages ? "disabled" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => goToPage(currentPage + 1)}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      ) : (
        ""
      )}

      {/* Delete Confirmation Modal */}
      <div
        className="modal fade"
        id="deleteModal"
        tabIndex="-1"
        aria-labelledby="deleteModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="deleteModalLabel">
                Are you sure you want to delete this employee?
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              Once you delete this employee, it cannot be undone.
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Employee;

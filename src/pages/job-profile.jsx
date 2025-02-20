import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, BaggageClaimIcon } from "lucide-react";
import { Button, Table } from "react-bootstrap";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TopBar from "@/components/dashboard/dashboard-header";
import { formatDateTime } from "@/lib/formatDate";
import { useProfileData } from "@/hooks/use-fetch-profile";
import { toast } from "@/hooks/use-toast";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export function JobProfile() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const navigate = useNavigate();
  const { id } = useParams();
  const [jobDetail, setJobDetail] = useState("");
  const [jobApplicant, setJobApplicant] = useState([]);
  const [time, setTime] = useState("-");
  const [status, setStatus] = useState("");
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [generatedLink, setGeneratedLink] = useState("");
  const { profileData } = useProfileData();
  const role = localStorage.getItem("role");
  useEffect(() => {
    if (role === "COMPANY") {
      setGeneratedLink(`/careers/${profileData?.id}`);
    } else {
      setGeneratedLink(`/careers/${profileData?.parent?.id}`);
    }
  }, [profileData]);

  const fetchJobData = async () => {
    try {
      const response = await axios.get(`/job/${id}`);
      if (!response.data.error) {
        const timeParse = formatDateTime(response.data.meta.createdAt);

        setTime(timeParse);
        setJobDetail(response.data.meta);
        setStatus(response.data.meta.jobApproval);
      } else if (response.data.error) {
        toast({
          title: "error",
          description: `${response.data.message}`,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error fetching job data:", error);
    }
  };

  const fetchJobApplicant = async () => {
    try {
      const response = await axios.get(
        `/job-applications/by-jobId/${id}/page?page=${currentPage}&size=${pageSize}`
      );

      if (!response.data.error) {
        setJobApplicant(response.data.meta.applications);
        setTotalItems(response.data.meta.totalItems);
        setCurrentPage(response.data.meta.currentPage);
        setTotalPages(response.data.meta.totalPages);
      } else if (response.data.error) {
        toast({
          title: "warn",
          description: `${response.data.message}`,
        });
      }
    } catch (error) {
      console.error("Error fetching job applicants:", error);
    }
  };

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (event) => {
    const newSize = parseInt(event.target.value, 10);
    setPageSize(newSize);
    setCurrentPage(1);
  };

  // Add a new `useEffect` to handle page or pageSize changes
  useEffect(() => {
    fetchJobApplicant();
    fetchJobData();
  }, [currentPage, pageSize]);

  const changeJobStatus = async (newStatus) => {
    try {
      const response = await axios.patch(
        `/recruiter/${id}/approval?jobApproval=${newStatus}`
      );

      if (!response.data.error) {
        toast({ title: "success", description: `Job ${newStatus}` });
        setStatus(newStatus);
      } else if (response.data.error) {
        toast({
          title: "warn",
          description: `${response.data.message}`,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="me-md-2 container-scroll">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

      {/* Profile Header */}
      <TopBar icon={BaggageClaimIcon} title={"Job-profile"} />
      <div
        className="d-flex justify-content-between align-items-start align-items-md-center p-3 flex-sm-row flex-column rounded border mt-3 mx-2"
        style={{
          background: "linear-gradient(to bottom right, #B9C0FF, #fff)",
        }}
      >
        <div className="d-flex align-items-start gap-4 justify-content-center ">
          <ArrowLeft onClick={() => navigate(-1)} className="cursor-pointer" />
          <div>
            <h4>
              {jobDetail?.jobTitle} <span> #{jobDetail?.jobCode}</span>
            </h4>
            <p className="mb-0">Hiring Manager: {jobDetail?.createdBy?.name}</p>
            <p className="mb-0">
              Recruiter: {jobDetail?.recruiterAssigned?.name}
            </p>
            <p className="mb-0">{jobDetail?.jobLocation}</p>
            <p className="text-muted mb-0">Current Status: {status || "-"}</p>
            <p className="text-muted mb-0">{time}</p>
          </div>
        </div>
        <div>
          <Button
            variant={
              status === "PUBLISHED"
                ? "danger"
                : status === "APPROVED" || status === "UNPUBLISHED"
                ? "outline-dark"
                : "success"
            }
            className="me-2 btn-sm w-100"
            onClick={() => {
              if (status === "PENDING") {
                changeJobStatus("APPROVED"); // Approve
              } else if (status === "PUBLISHED") {
                changeJobStatus("UNPUBLISHED"); // Unpublish
              } else if (status === "APPROVED" || status === "UNPUBLISHED") {
                changeJobStatus("PUBLISHED"); // Publish
              }
            }}
          >
            {status === "PENDING"
              ? "Approve"
              : status === "PUBLISHED"
              ? "Unpublish"
              : "Publish"}
          </Button>
          <br />
          {status === "PUBLISHED" ? (
            <Button
              className="my-2 w-100 btn-sm"
              variant="secondary"
              onClick={() => window.open(generatedLink, "_blank")}
            >
              See Job
            </Button>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="mt-4 p-3 bg-white rounded border mx-2">
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Applicants" {...a11yProps(0)} />
              <Tab label="Job ad" {...a11yProps(1)} />
              <Tab label="Job details" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <div className="mt-4 p-3 bg-white rounded border mx-2">
              <div className="d-flex align-items-md-center gap-2 justify-content-between flex-column flex-sm-row">
                {/* <div className="text-primary fs-4 fw-bolder text-center text-sm-start d-flex align-items-center justify-content-center">
                  Applicants
                </div> */}

                <div className="col d-flex">
                  <select
                    className="form-select w-auto"
                    value={pageSize}
                    onChange={handlePageSizeChange}
                  >
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={75}>75</option>
                    <option value={100}>100</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Applicants Table */}
            <div className="mt-4 text-center mx-2">
              <div>
                <Table striped bordered hover>
                  <thead className="table-light">
                    <tr>
                      <th>Applicant</th>
                      <th>Company</th>
                      <th>Location</th>
                      <th>Status</th>
                      <th>Application Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobApplicant?.map((data, index) => (
                      <tr
                        key={index}
                        className="cursor-pointer"
                        onClick={() => navigate("job-applicants/" + data?.id)}
                      >
                        <td>{data?.candidateName || "-"}</td>
                        <td>{data?.company || "-"}</td>
                        <td>{data?.location || "-"}</td>
                        <td>{data?.status || "-"}</td>
                        <td>{formatDateTime(data?.appliedAt) || "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
              <div>
                {jobApplicant.length > 0 ? (
                  <nav aria-label="Page navigation">
                    <ul className="pagination justify-content-center my-3">
                      <li
                        className={`page-item ${
                          currentPage === 1 ? "disabled" : ""
                        }`}
                      >
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
              </div>
            </div>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            Job Ad
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <div className="accordion" id="accordionExample">
              <div className="accordion-item my-3">
                <h2 className="accordion-header d-flex" id="headingOne">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    Job Fields
                  </button>
                </h2>
                <div
                  id="collapseOne"
                  className="accordion-collapse collapse show"
                  aria-labelledby="headingOne"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <div className="container">
                      <div className="row my-1">
                        <div className="col-md-6 my-3">
                          <h6 className="mb-0">Company*</h6>
                          <p className="mb-0">
                            Renesas Electronics (China) Co., Ltd. (31A0)
                          </p>
                        </div>
                        <div className="col-md-6 my-3">
                          <h6 className="mb-0">Business Unit*</h6>
                          <p className="mb-0">
                            Power Product Group (300000000000)
                          </p>
                        </div>
                        <div className="col-md-6 my-3">
                          <h6 className="mb-0">Division *</h6>
                          <p className="mb-0">
                            Combined R&D & Methodology Division (301300000000)
                          </p>
                        </div>
                        <div className="col-md-6 my-3">
                          <h6 className="mb-0">Dept</h6>
                          <p className="mb-0">
                            R&D Validation Infrastructure (301314000000)
                          </p>
                        </div>
                        <div className="col-md-6 my-3">
                          <h6 className="mb-0">Cost Center *</h6>
                          <p className="mb-0">37001 (37001)</p>
                        </div>
                        <div className="col-md-6 my-3">
                          <h6 className="mb-0">Location *</h6>
                          <p className="mb-0">RECH(Beijing) (31AT)</p>
                        </div>
                        <div className="col-md-6 my-3">
                          <h6 className="mb-0">Designation *</h6>
                          <p className="mb-0">
                            Application Engineer (EN-AE.AE.P2)
                          </p>
                        </div>
                        <div className="col-md-6 my-3">
                          <h6 className="mb-0">Grade *</h6>
                          <p className="mb-0">C (C)</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="accordion-item my-3">
                <h2 className="accordion-header" id="headingTwo">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                  >
                    Internal Notes
                  </button>
                </h2>
                <div
                  id="collapseTwo"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingTwo"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">No Internal Notes yet</div>
                </div>
              </div>
              <div className="accordion-item my-3">
                <h2 className="accordion-header" id="headingThree">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseThree"
                    aria-expanded="false"
                    aria-controls="collapseThree"
                  >
                    Attachments
                  </button>
                </h2>
                <div
                  id="collapseThree"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingThree"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">No Attachments yet</div>
                </div>
              </div>
            </div>
          </CustomTabPanel>
        </Box>
      </div>
      {/* Search & Filters */}
    </div>
  );
}

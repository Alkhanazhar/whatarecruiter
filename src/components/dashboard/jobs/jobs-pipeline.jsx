import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
const JobsPipeline = () => {
  const jobPipelineData = [
    {
      job: "UI/UX Designer",
      new: "3 Candidates",
      inReview: "3 Candidates",
      interview: "3 Candidates",
      offered: "3 Candidates",
      hired: "3 Candidates",
    },
    {
      job: "Front End Developer",
      new: "3 Candidates",
      inReview: "3 Candidates",
      interview: "3 Candidates",
      offered: "3 Candidates",
      hired: "3 Candidates",
    },
    {
      job: "Backend Developer",
      new: "3 Candidates",
      inReview: "3 Candidates",
      interview: "3 Candidates",
      offered: "3 Candidates",
      hired: "3 Candidates",
    },
    {
      job: "SAP Consultant",
      new: "3 Candidates",
      inReview: "2 Candidates",
      interview: null,
      offered: null,
      hired: null,
    },
    {
      job: "Product Manager",
      new: "3 Candidates",
      inReview: null,
      interview: null,
      offered: null,
      hired: null,
    },
    {
      job: "CSA",
      new: "3 Candidates",
      inReview: null,
      interview: null,
      offered: null,
      hired: null,
    },
    {
      job: "Designer",
      new: "3 Candidates",
      inReview: "3 Candidates",
      interview: null,
      offered: "3 Candidates",
      hired: null,
    },
  ];

  return (
    <div className="py-2">
      <div className="pipeline-container">
        <h3 className="p-2 px-3 border-bottom">Jobs Pipeline</h3>
        <MDBTable responsive className="pipeline-table p-4 w-full">
          <MDBTableHead className="p-2 bg-white ">
            <tr>
              <th className="p-3">Jobs</th>
              <th className="p-3">New</th>
              <th className="p-3">In-Review</th>
              <th className="p-3">Interview</th>
              <th className="p-3">Offered</th>
              <th className="p-3">Hired</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {jobPipelineData?.map((job, index) => (
              <tr key={index} className="m-2">
                <td className=" p-2 px-3 bullet-div">{job.job}</td>
                <td className=" p-1">
                  <div
                    className=" px-3 p-2 m-1 bullet-div first  "
                    style={{ fontSize: ".9rem" }}
                  >
                    {job.new || "-"}
                  </div>
                </td>
                <td className=" p-1">
                  <div
                    className=" px-3 p-2 m-1 bullet-div second "
                    style={{ fontSize: ".9rem" }}
                  >
                    {job.inReview || "-"}
                  </div>
                </td>
                <td className=" p-1">
                  <div
                    className=" px-3 p-2 m-1 bullet-div third  "
                    style={{ fontSize: ".9rem" }}
                  >
                    {job.interview || " -"}
                  </div>
                </td>
                <td className="  p-1">
                  <div
                    className=" px-3 p-2 m-1 bullet-div  forth"
                    style={{ fontSize: ".9rem" }}
                  >
                    {job.offered || "- "}
                  </div>
                </td>
                <td className=" p-1">
                  <div
                    className=" px-3 p-2 m-1 bullet-div fifth "
                    style={{ fontSize: ".9rem" }}
                  >
                    {job.hired || " -"}
                  </div>
                </td>
              </tr>
            ))}
          </MDBTableBody>
        </MDBTable>
      </div>
    </div>
  );
};

export default JobsPipeline;

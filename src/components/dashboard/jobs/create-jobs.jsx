import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import TopBar from "../dashboard-header";
import { MoveLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const CreateJob = () => {
  const [loading, setLoading] = useState(false);
  const [jobDescription, setJobDescription] = useState(
    "<p>Enter job description...</p>"
  );
  const [jobAdditionalInformation, setJobAdditionalInformation] = useState(
    "<p>Additional information...</p>"
  );
  const [formData, setFormData] = useState({
    jobTitle: "",
    // jobDescription: "",
    jobLocation: "",
    // companyDescription: "",
    jobQualification: "",
    jobAdditionalInformation: "",
  });
  const jobDescriptionEditor = useEditor({
    extensions: [StarterKit],
    content: jobDescription,
    onUpdate: ({ editor }) => {
      setJobDescription(editor.getHTML()); // Save content as HTML
    },
  });

  const jobAdditionalInfoEditor = useEditor({
    extensions: [StarterKit],
    content: jobAdditionalInformation,
    onUpdate: ({ editor }) => {
      setJobAdditionalInformation(editor.getHTML());
    },
  });

  const handleQuillChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    const createdBy = decodedToken?.claims?.id;
    const role = localStorage.getItem("role");

    const url =
      role === "EMPLOYEE"
        ? `/employee/job/create/${createdBy}`
        : role === "RECRUITER"
        ? `/recruiter/job/create/${createdBy}`
        : `/admin/job/create/${createdBy}`;

    if (!url) {
      console.error("Invalid role");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(url, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log("Job created successfully:", response.data);

      // return
      navigate(-1);
    } catch (error) {
      console.error("Error creating job:", error);
    } finally {
      setLoading(false);
    }
  };

  const [allManager, setAllManager] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    let parentId = decodedToken?.claims?.id;
    const fetchCompanyManagers = async () => {
      try {
        const response = await axios.get(`recruiter/parent/${parentId}`);
        console.log(response.data);
        setAllManager(() => response.data.meta);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchCompanyManagers();
  }, []);

  return (
    <div
      className="d-flex justify-content-between flex-column"
      style={{ zIndex: 100 }}
    >
      <form onSubmit={handleSubmit}>
        <TopBar title={"Create Job"} />

        <div className="flex flex-1 px-5 flex-col min-h-screen">
          <div>
            <div className="mt-3">
              <div>
                <div className="w-full my-2">
                  <div className="w-full flex items-center justify-between">
                    <div className="flex gap-2 items-center">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="border"
                        onClick={() => navigate(-1)}
                      >
                        <MoveLeft />
                      </Button>
                      <h4 className="mx-2 my-1 fs-5 fw-semibold">
                        Select Recruiter
                      </h4>
                    </div>
                    <select
                      name="assignedRecruiter"
                      value={formData.assignedRecruiter}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select a Recruiter</option>
                      {allManager.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <Label className="mx-2 my-1 fs-5 fw-semibold">
                    Job Title
                  </Label>
                  <Input />

                  <Label className="mx-2 my-1 fs-5 fw-semibold">
                    Job Description
                  </Label>
                  <EditorContent editor={jobAdditionalInfoEditor} />
                  {/* <ReactQuill
                    theme="snow"
                    value={formData.jobDescription}
                    onChange={(value) =>
                      handleQuillChange("jobDescription", value)
                    }
                    modules={{
                      toolbar: [
                        [{ header: "1" }, { header: "2" }, { font: [] }],
                        ["bold", "italic", "underline", "strike", "link"],
                        [{ list: "ordered" }, { list: "bullet" }],
                        ["clean"], // remove formatting button
                      ],
                    }}
                  /> */}

                  <Label className="mx-2 my-1 fs-5 fw-semibold">
                    Job Location
                  </Label>
                  <Input />
                  <Label className="mx-2 my-1 fs-5 fw-semibold">
                    Company Description
                  </Label>
                  {/* <ReactQuill
                    theme="snow"
                    value={formData.companyDescription}
                    onChange={(value) =>
                      handleQuillChange("companyDescription", value)
                    }
                    modules={{
                      toolbar: [
                        [{ header: "1" }, { header: "2" }, { font: [] }],
                        ["bold", "italic", "underline", "strike", "link"],
                        [{ list: "ordered" }, { list: "bullet" }],
                        ["clean"], // remove formatting button
                      ],
                    }}
                  /> */}

                  <Label className="mx-2 my-1 fs-5 fw-semibold">
                    Job Additional Information
                  </Label>
                  {/* <ReactQuill
                    theme="snow"
                    value={formData.jobAdditionalInformation}
                    onChange={(value) =>
                      handleQuillChange("jobAdditionalInformation", value)
                    }
                    modules={{
                      toolbar: [
                        [{ header: "1" }, { header: "2" }, { font: [] }],
                        ["bold", "italic", "underline", "strike", "link"],
                        [{ list: "ordered" }, { list: "bullet" }],
                        ["clean"], // remove formatting button
                      ],
                    }}
                  /> */}

                  <Label className="mx-2 my-1 fs-5 fw-semibold">
                    Job Qualification or Required Skills
                  </Label>
                  {/* <ReactQuill
                    theme="snow"
                    value={formData.jobQualification}
                    onChange={(value) =>
                      handleQuillChange("jobQualification", value)
                    }
                    modules={{
                      toolbar: [
                        [{ header: "1" }, { header: "2" }, { font: [] }],
                        ["bold", "italic", "underline", "strike", "link"],
                        [{ list: "ordered" }, { list: "bullet" }],
                        ["clean"], // remove formatting button
                      ],
                    }}
                  /> */}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-3 d-flex align-items-center justify-content-end gap-5">
          <Button type="submit" disabled={loading}>
            {!loading ? "Create Job" : "Creating..."}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateJob;

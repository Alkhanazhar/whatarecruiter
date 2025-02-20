import { useState } from "react";
import { MartiniIcon, MoveLeft } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import TopBar from "../dashboard-header";
import { toast } from "@/hooks/use-toast";
import { ReusableInput } from "@/components/ui/reusable-input";
import { Button } from "@/components/ui/button";

const CreateManager = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    username: "",
    password: "",
  });
  const token = localStorage.getItem("token");
  const userData = token && jwtDecode(token);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/recruiter/create/" + userData.claims.id,
        formData
      );
      if (!response.data.error) {
        console.log(response.data);
        toast({
          title: "Success",
          description: response?.data?.message,
        });
        navigate(-1);
      } else if (response.data.error) {
        toast({
          title: "error",
          description: response?.data?.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "error",
        description: error.response?.data?.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div
      className=" d-flex justify-content-between flex-column"
      style={{ zIndex: 100 }}
    >
      <form onSubmit={handleSubmit}>
        <TopBar title={"Create Manager"} icon={MartiniIcon} />

        <div
          className=" d-flex flex-grow-1 px-5 flex-column"
          style={{ height: "100%" }}
        >
          <div>
            <div xs={12} className="mt-3">
              <div>
                <div>
                  <button
                    className="btn btn-primary btn-theme mx-2 btn-sm "
                    onClick={() => navigate(-1)}
                  >
                    <MoveLeft />
                  </button>
                </div>
                <div>
                  <label className="mx-2 my-1 fs-5 fw-semibold">Name</label>
                  <ReusableInput
                    label="Designation"
                    name="name"
                    placeholder="Name"
                    onChange={handleChange}
                    value={formData.name}
                    required
                  />
                  {/* <label className="mx-2 my-1 fs-5 fw-semibold">
                    Company Name
                  </label>
                  <ReusableInput
                    label="Company Name"
                    name="companyName"
                    placeholder="Name of the Company"
                    onChange={handleChange}
                    value={formData.companyName}
                    required
                  /> */}
                  <label className="mx-2 my-1 fs-5 fw-semibold">
                    Phone Number
                  </label>
                  <ReusableInput
                    label="Location"
                    name="phoneNumber"
                    placeholder="Enter your Phone Number"
                    onChange={handleChange}
                    value={formData.phoneNumber}
                    maxLength="10"
                    required
                  />
                  <label className="mx-2 my-1 fs-5 fw-semibold">
                    Email Address
                  </label>
                  <ReusableInput
                    label="Email"
                    type="email"
                    name="email"
                    placeholder="Enter your Email"
                    onChange={handleChange}
                    value={formData.email}
                    required
                  />
                  <label className="mx-2 my-1 fs-5 fw-semibold">Username</label>
                  <ReusableInput
                    label="Username"
                    type="text"
                    name="username"
                    placeholder="Enter your Username"
                    onChange={handleChange}
                    value={formData.username}
                    required
                  />
                  <label className="mx-2 my-1 fs-5 fw-semibold">Password</label>
                  <ReusableInput
                    label="Password"
                    type="text"
                    name="password"
                    placeholder="Enter your Password"
                    onChange={handleChange}
                    value={formData.password}
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-3  d-flex align-items-center justify-content-end gap-5">
          <Button type="submit" variant="warning" className="fw-semibold">
            {" "}
            Create Recruiter
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateManager;

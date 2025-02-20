import { useState } from "react";
import { MartiniIcon, MoveLeft, UsersRound } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import TopBar from "@/components/dashboard/dashboard-header";
import { toast } from "@/hooks/use-toast";
import { ReusableInput } from "@/components/ui/reusable-input";
import { BackButton } from "./MyProfile";
import { Button } from "@/components/ui/button";

const CreateUser = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    username: "",
    password: "",
    role: "EMPLOYEE",
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
    console.log(formData);
    // return;
    try {
      const response = await axios.post(
        "user/create/" + userData.claims.id,
        formData
      );

      if (!response.data.error) {
        console.log(response.data);
        toast({
          title: "error",
          description: response?.data?.message || "An error occurred",
          variant: "destructive",
        });
        navigate(-1);
      } else if (response.data.error) {
        toast({
          title: "error",
          description: response?.data?.error || "An error occurred",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className=" d-flex justify-content-between flex-column"
      style={{ zIndex: 100 }}
    >
      <form onSubmit={handleSubmit}>
        <TopBar title={"Create User"} icon={UsersRound} />

        <div
          className=" d-flex flex-grow-1 px-5 flex-column"
          style={{ height: "100%" }}
        >
          <div>
            <div className="mt-3">
              <div>
                <div>
                  <BackButton />
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
                  <label className="mx-2 my-1 fs-5 fw-semibold">
                    User Role
                  </label>
                  <select
                    className="form-select"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                  >
                    <option selected value="EMPLOYEE">
                      Employee
                    </option>
                    <option selected value="HIRING_MANAGER">
                      Hiring Manager
                    </option>
                    <option value="RECRUITER">Recruiter</option>
                    <option value="ADMIN">Admin</option>
                  </select>
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
        <Button className="mx-12 mt-4" type="submit">
          Create Employee
        </Button>
      </form>
    </div>
  );
};

export default CreateUser;

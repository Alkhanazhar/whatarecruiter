import React, { useState } from "react";
import axios from "axios";
import { Button, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { MoveLeft, Lock } from "lucide-react";
import TopBar from "@/components/dashboard/dashboard-header";
import { useProfileData } from "@/hooks/use-fetch-profile";
import { ReusableInput } from "@/components/ui/reusable-input";
import { BackButton } from "./MyProfile";

const LoginPassword = () => {
  const { profileData, loading } = useProfileData();
  console.log(profileData);
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      // Include email in formData
      const payload = {
        ...formData,
        email: profileData?.email,
      };

      console.log("Payload:", payload);

      // Send request
      const response = await axios.post(
        "/superadmin/change-password",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response:", response);

      // Handle success
      if (!response.data.error) {
        setSuccessMessage(
          response.data.message || "Password updated successfully."
        );
        setError("");
        setFormData({
          currentPassword: "",
          newPassword: "",
        });
      }
    } catch (err) {
      // Handle error
      setError(
        err.response?.data?.message || "An error occurred. Please try again."
      );
      setSuccessMessage("");
    }
  };

  return (
    <div
      className="d-flex justify-content-between flex-column"
      style={{ zIndex: 100 }}
    >
      <TopBar title={"Change Password"} icon={Lock} />

      <div
        className="d-flex flex-grow-1 px-5 flex-column"
        style={{ height: "100%" }}
      >
        <div>
          <div className="mt-3">
            <div>
              <BackButton />
              <div>
                <div>
                  <label className="mx-2 my-1 fs-5 fw-semibold">Email</label>
                  <ReusableInput
                    label="email"
                    name="email"
                    placeholder="Email"
                    value={profileData?.email}
                    onChange={handleChange}
                    disabled
                  />
                </div>
                <div>
                  <label className="mx-2 my-1 fs-5 fw-semibold">
                    Current Password
                  </label>
                  <ReusableInput
                    label="Current Password"
                    name="currentPassword"
                    placeholder="Current Password"
                    value={formData.currentPassword}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="mx-2 my-1 fs-5 fw-semibold">
                    New Password
                  </label>
                  <ReusableInput
                    label="New Password"
                    name="newPassword"
                    placeholder="New Password"
                    value={formData.newPassword}
                    onChange={handleChange}
                  />
                </div>
                <div className="p-3 d-flex align-items-center justify-content-end gap-5">
                  {error && <div className="text-danger mt-2">{error}</div>}
                  {successMessage && (
                    <div className="text-success mt-2">{successMessage}</div>
                  )}
                  <Button
                    type="button"
                    variant="warning"
                    className="fw-semibold"
                    onClick={handleSubmit}
                  >
                    Save
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPassword;

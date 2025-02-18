/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Search, X } from "lucide-react";
import { useState, useRef } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Form, InputGroup, FormControl } from "react-bootstrap";

const AddCandidates = () => {
  const [selectTab, setSelectTab] = useState("Brief");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    location: "",
    email: "",
    experience: "",
    education: "",
    profile: null,
  });
  const fileInputRef = useRef(null);
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      const file = files[0];
      setFormData({
        ...formData,
        [name]: file,
      });
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          fileInputRef.current.style.backgroundImage = `url(${e.target.result})`;
          fileInputRef.current.style.backgroundSize = "cover";
          fileInputRef.current.style.backgroundPosition = "center";
        };
        reader.readAsDataURL(file);
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  const renderTabContent = () => {
    switch (selectTab) {
      case "Brief":
        return (
          <Row>
            <Col>
              <ReusableInput
                label="First Name"
                name="firstName"
                placeholder="Enter your first name"
                onChange={handleChange}
                value={formData.firstName}
              />
              <ReusableInput
                label="Last Name"
                name="lastName"
                placeholder="Enter your last name"
                onChange={handleChange}
                value={formData.lastName}
              />
              <ReusableInput
                label="Location"
                name="location"
                placeholder="Enter your location"
                icon={Search}
                onChange={handleChange}
                value={formData.location}
              />
              <ReusableInput
                label="Email"
                type="email"
                name="email"
                placeholder="Enter your email"
                onChange={handleChange}
                value={formData.email}
              />
            </Col>
            <Col className="d-flex align-items-center justify-content-center flex-column">
              <div
                ref={fileInputRef}
                className=" mb-4 rounded-circle border border-primary"
                style={{
                  cursor: "pointer",
                  width: "15rem",
                  height: "15rem",
                  backgroundImage: formData.profile
                    ? `url(${URL.createObjectURL(formData.profile)})`
                    : "https://www.exscribe.com/wp-content/uploads/2021/08/placeholder-image-person-jpg.jpg",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                onClick={() => document.getElementById("profile").click()}
              ></div>
              <Form.Group className="mb-3">
                <Form.Label
                  htmlFor="profile"
                  className="cursor-pointer btn btn-primary btn-theme"
                >
                  Upload Image
                </Form.Label>
                <Form.Control
                  type="file"
                  id="profile"
                  name="profile"
                  onChange={handleChange}
                  className="d-none"
                />
                {/* {formData.profile && (
                  <div className="mt-2">
                    Selected file: {formData.profile.name}
                  </div>
                )} */}
              </Form.Group>
              <button className="btn btn-primary btn-theme">Cancel image</button>
            </Col>
          </Row>
        );
      case "Experience":
        return (
          <Row>
            <Col>
              <ReusableInput
                label="Designation"
                name="designation"
                placeholder="Designation"
                onChange={handleChange}
                value={formData.designation}
              />
              <ReusableInput
                label="Company Name"
                name="companyName"
                placeholder="Company Name"
                onChange={handleChange}
                value={formData.companyName}
              />
              <ReusableInput
                label="Location"
                name="location"
                placeholder="Enter your location"
                icon={Search}
                onChange={handleChange}
                value={formData.location}
              />
              <ReusableInput
                label="Experience"
                type="text"
                name="experience"
                placeholder="Enter your Experience"
                onChange={handleChange}
                value={formData.email}
              />
            </Col>
            <Col>
              <ReusableInput
                label="Notice Period"
                name="noticePeriod"
                placeholder="Notice Period"
                onChange={handleChange}
                value={formData.noticePeriod}
              />
              <ReusableInput
                label="Annual Salary"
                name="annualSalary"
                placeholder="Annual Salary"
                onChange={handleChange}
                value={formData.annualSalary}
              />
              <ReusableInput
                label="Expected Salary"
                name="expectedSalary"
                placeholder="Expected Salary"
                onChange={handleChange}
                value={formData.expectedSalary}
              />
              <ReusableInput
                label="Job Description"
                type="text"
                name="jobDescription"
                placeholder="Enter your Description"
                onChange={handleChange}
                value={formData.jobDescription}
              />
            </Col>
          </Row>
        );
      case "Education":
        return (
          <ReusableInput
            label="Education"
            name="education"
            placeholder="Enter your educational background"
            onChange={handleChange}
            value={formData.education}
            as="textarea"
            rows={4}
          />
        );
      case "Additional Information":
        return (
          <Row>
            <Col>
              <ReusableInput
                label="Enter Skills"
                name="skills"
                placeholder="Enter Skills"
                onChange={handleChange}
                value={formData.skills}
              />
              <ReusableInput
                label="Company Name"
                name="companyName"
                placeholder="Company Name"
                onChange={handleChange}
                value={formData.companyName}
              />
              <ReusableInput
                label="Location"
                name="location"
                placeholder="Enter your location"
                icon={Search}
                onChange={handleChange}
                value={formData.location}
              />
              <ReusableInput
                label="Experience"
                type="text"
                name="experience"
                placeholder="Enter your Experience"
                onChange={handleChange}
                value={formData.email}
              />
            </Col>
            <Col>
              <ReusableInput
                label="Notice Period"
                name="noticePeriod"
                placeholder="Notice Period"
                onChange={handleChange}
                value={formData.noticePeriod}
              />
              <ReusableInput
                label="Annual Salary"
                name="annualSalary"
                placeholder="Annual Salary"
                onChange={handleChange}
                value={formData.annualSalary}
              />
              <ReusableInput
                label="Expected Salary"
                name="expectedSalary"
                placeholder="Expected Salary"
                onChange={handleChange}
                value={formData.expectedSalary}
              />
              <ReusableInput
                label="Job Description"
                type="text"
                name="jobDescription"
                placeholder="Enter your Description"
                onChange={handleChange}
                value={formData.jobDescription}
              />
            </Col>
          </Row>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className=" d-flex justify-content-between flex-column"
      style={{ zIndex: 100 }}
    >
      <div className="p-3 border-bottom d-flex align-items-center justify-content-between px-5">
        <span className="text-primary fs-4 fw-bold text-decoration-none">
          Add Candidates
        </span>
      </div>
      <div
        className="border d-flex flex-grow-1 px-5 flex-column"
        style={{ height: "100%" }}
      >
        <div className="d-flex justify-content-between w-25 gap-5 py-2 fw-bolder fs-5">
          {["Brief", "Experience", "Education", "Additional Information"].map(
            (tab) => (
              <div
                key={tab}
                className={`${
                  selectTab === tab ? "border-main-secondary " : ""
                } cursor-pointer`}
                onClick={() => setSelectTab(tab)}
              >
                {tab}
              </div>
            )
          )}
        </div>
        <Row>
          <Col xs={12} className="mt-5">
            {renderTabContent()}
          </Col>
        </Row>
      </div>
      <div className="p-3 border-top d-flex align-items-center justify-content-end gap-5">
        <span>Cancel</span>
        <Button variant="warning"> Add Candidates</Button>
      </div>
    </div>
  );
};

export const ReusableInput = ({
  label,
  type = "text",
  name,
  placeholder,
  icon: Icon,
  onChange,
  value,
  className = "",
  ...props
}) => {
  return (
    <Form.Group className={`mb-2 ${className}`} controlId={`form${name}`}>
      <InputGroup>
        <FormControl
          type={type}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          {...props}
          className="fs-5"
        />
        {Icon && (
          <InputGroup.Text>
            <Icon />
          </InputGroup.Text>
        )}
      </InputGroup>
    </Form.Group>
  );
};

export default AddCandidates;

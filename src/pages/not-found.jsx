import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="not-found-page d-flex align-items-center justify-content-center">
      <div className="circle-div"></div>
      <div className="container text-center mt-5">
        <h1 className="error-heading text-white " style={{ fontSize: "100px" }}>
          500
        </h1>
        <p className="error-message text-white" style={{ fontSize: "20px" }}>
          Sorry for the inconvenience. Please go back to the home page.
        </p>
        <Link
          to="/"
          className="btn btn-outline-primary fw-bolder text-white border-white border-3 rounded-pill mt-3"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
}

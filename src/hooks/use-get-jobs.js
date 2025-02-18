import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "./use-toast";

export const useGetJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");
  const getJobs = async (toast) => {
    const decodedToken = jwtDecode(token);
    const id = decodedToken.claims.id;
    const role = decodedToken.claims.role;

    try {
      setLoading(true);

      const endpoint =
        role === "ADMIN"
          ? `/job/byParent/${id}`
          : `/job/jobs/by-recruiter-or-creator/${id}`;

      const response = await axios.get(endpoint);
      const meta = response?.data;
      console.log(meta, "use Get jobs");

      if (meta?.error === "false") {
        setJobs(meta?.meta);
        setError(null);
      } else {
        setJobs([]);
        setError(meta?.message);
        toast({ title: "successfully ", description: meta?.message });
      }
    } catch (err) {
      console.log("Error fetching jobs:", err);
      setError("Failed to fetch jobs. Please try again later.");
      toast({
        title: "successfully ",
        description: err?.response?.data?.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getJobs();
  }, []);
  return { jobs, error, loading };
};

import TopBar from "@/components/dashboard/dashboard-header";
import JobList from "@/components/dashboard/jobs/grid-jobs";
import JobListTable from "@/components/dashboard/jobs/job-list";
import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import { useGetJobs } from "@/hooks/use-get-jobs";
import { Filter, Grid, List } from "lucide-react";
import { useState } from "react";

const Jobs = () => {
  const { jobs, error, loading } = useGetJobs();
  console.log(jobs);
  const [isGrid, setIsGridView] = useState(
    JSON.parse(localStorage.getItem("isGrid")) || false
  );

  const handleSetIsGridView = () => {
    localStorage.setItem("isGrid", JSON.stringify(!isGrid));
    setIsGridView((prev) => {
      return !prev;
    });
  };
  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <TopBar title={"Jobs"} />

      <div className="flex items-center justify-between px-4 bg-gray-100">
        <div className="flex gap-3 align-items-center py-3">
          <div className="fw-medium text-2xl">{jobs?.length} active Jobs</div>{" "}
          <Button size="icon">
            <Filter />
          </Button>
          <Button size="icon" onClick={handleSetIsGridView}>
            {isGrid ? (
              <Grid className="scale-125" />
            ) : (
              <List className="scale-125" />
            )}
          </Button>
        </div>
        <Button>Create Jobs</Button>
      </div>
      <div>{!isGrid && <JobList jobs={jobs} />}</div>
      <div className="mt-3">{isGrid && <JobListTable jobs={jobs} />}</div>
    </>
  );
};

export default Jobs;

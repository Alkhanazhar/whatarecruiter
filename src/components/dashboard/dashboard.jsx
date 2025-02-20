import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import JobsPipeline from "./jobs/jobs-pipeline";
import { Calendar } from "../ui/calendar";
import TopBar from "./dashboard-header";

const data = [
  { name: "In-Review", value: 19, color: "#99A8FF" },
  { name: "Interview", value: 32, color: "#547BFF" },
  { name: "Offered", value: 23, color: "#3457D5" },
  { name: "Hired", value: 41, color: "#1E3AA6" },
];

const Dashboard = () => {
  return (
    <div>
      <TopBar title={"Dashboard"} />
      <div className="flex-1 bg-gray-100">
        <div className="p-4 md:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="flex flex-col lg:col-span-2">
            <Card className="min-h-[550px] shadow-md">
              <CardContent>
                <JobsPipeline />
              </CardContent>
            </Card>
            <div className=" gap-4 mt-4 w-full grid grid-cols-2 ">
              <Card className="shadow-md md:col-span-1">
                <CardHeader>
                  <h3 className="py-2 ">New Jobs</h3>
                </CardHeader>
                <CardContent>
                  {[
                    { title: "Frontend Developer", level: "Senior Level" },
                    { title: "UI/UX Designer", level: "Senior Level" },
                    { title: "Backend Developer", level: "Fresher" },
                  ].map((job, index) => (
                    <div
                      key={index}
                      className="flex justify-between mt-4 p-2 border-b"
                    >
                      <div>
                        <p className="font-medium text-sm">{job.title}</p>
                        <p className="text-sm text-gray-500 ">{job.level}</p>
                      </div>
                      <Button className="bg-blue-500 text-white text-xs px-3 py-1">
                        Details
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="shadow-md w-full md:col-span-1">
                <CardContent></CardContent>
              </Card>
            </div>
          </div>

          <Card className="lg:col-span-1 h-[900px]shadow-md w-full">
            <CardHeader>
              <h3 className="py-2 ">Interview</h3>
            </CardHeader>
            <CardContent>
              <Calendar
                className="mx-auto w-full"
                selectedDates={["2024-07-09", "2024-07-15", "2024-07-22"]}
              />
              <div className="mt-4 space-y-4">
                {[
                  { role: "UI/UX designer", date: "13 July 2024" },
                  { role: "Frontend Developer", date: "15 July 2024" },
                  { role: "Backend Developer", date: "26 July 2024" },
                  { role: "Project Manager", date: "22 July 2024" },
                  { role: "Customer Manager", date: "07 July 2024" },
                  { role: "UI/UX designer", date: "12 July 2024" },
                ].map((interview, index) => (
                  <div
                    key={index}
                    className="p-2 rounded-2xl  border-l-8 border-primary-900  border-t border-b border-r"
                  >
                    <p className="font-medium">{interview.role}</p>
                    <p className="text-sm text-gray-500">07:00PM - 08:00PM</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

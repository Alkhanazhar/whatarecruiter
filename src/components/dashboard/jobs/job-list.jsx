import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useState } from "react";

const JobListTable = ({ jobs }) => {
  const [page, setPage] = useState(2);
  return (
    <div className="p-6">
      <Table className="w-full border rounded-lg">
        <TableHeader className="bg-gray-100 text-gray-700 font-semibold">
          <TableRow>
            <TableHead className="px-6 py-3">Job Code</TableHead>
            <TableHead className="px-6 py-3">Position</TableHead>
            <TableHead className="px-6 py-3">Date</TableHead>
            <TableHead className="px-6 py-3">Email</TableHead>
            <TableHead className="px-6 py-3">Location</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobs?.map((job, index) => (
            <TableRow key={job.id} className="border-b">
              <TableCell className="px-6 py-3">{job?.jobCode}</TableCell>
              <TableCell className="px-6 py-3">{job?.jobTitle}</TableCell>
              <TableCell className="px-6 py-3">
                {new Date(job?.createdAt).toLocaleDateString()}{" "}
                {/* Format Date */}
              </TableCell>
              <TableCell className="px-6 py-3">
                {job?.createdBy.email}
              </TableCell>
              <TableCell className="px-6 py-3">{job?.jobLocation}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* <div className="flex justify-center mt-4">
        <Pagination total={3} current={2} /> */}
      <div className="flex justify-center items-center gap-2 mt-6">
        <button className="px-3 py-1 border hover:bg-gray-200 rounded-full">
          Previous
        </button>
        {[1, 2, 3].map((num) => (
          <button
            key={num}
            className={`px-3 py-1 rounded-full ${
              num === page ? "bg-blue-600 text-white" : "border"
            }`}
            onClick={() => setPage(num)}
          >
            {num}
          </button>
        ))}
        <button className="px-3 py-1 border hover:bg-gray-200 rounded-full">
          Next
        </button>
      </div>
    </div>
    // </div>
  );
};

export default JobListTable;

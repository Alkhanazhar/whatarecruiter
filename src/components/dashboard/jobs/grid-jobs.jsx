import { FaMapMarkerAlt, FaRegClock } from "react-icons/fa";
import { MdArrowOutward } from "react-icons/md";
import { Link } from "react-router-dom";

const JobList = ({ jobs }) => {
  console.log(jobs);
  return (
    <div className="flex min-h-[calc(100vh-100px)]">
      <div className="flex-1 bg-gray-100">
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {jobs?.map((job) => (
              <div key={job.id} className="bg-white p-4 shadow-md rounded-lg">
                <h2 className="text-lg md:text-2xl font-bold text-primary-900">
                  {job.jobTitle}
                </h2>
                {/* <p className="text-gray-600 text-sm mt-1">{job.description}</p> */}
                <div
                  className="line-clamp-3"
                  dangerouslySetInnerHTML={{ __html: job.jobDescription }}
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="px-2 py-1 text-xs bg-gray-200 rounded-full">
                    {job.type}
                  </span>
                  <span className="px-2 py-1 text-xs bg-gray-200 rounded-full">
                    {job.location}
                  </span>
                  <span className="px-2 py-1 text-xs bg-gray-200 rounded-full">
                    {job.category}
                  </span>
                </div>
                <div className="flex items-center  text-gray-500 text-xs mt-3 gap-2">
                  <FaRegClock className="mr-1" /> Apply Before {job.deadline}
                </div>
                <div className="flex flex-wrap items-center text-gray-500 text-xs mt-1 justify-between">
                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className="mr-1" /> {job?.jobLocation}
                    {job?.country}
                  </div>
                  <Link
                    to={"/jobs/" + job.link}
                    className="text-primary-600 ml-6 flex text-sm underline gap-1 items-center"
                  >
                    More Details <MdArrowOutward />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobList;

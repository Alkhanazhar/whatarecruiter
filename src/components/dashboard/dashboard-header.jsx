import { FaBell, FaSearch, FaUserCircle } from "react-icons/fa";
import { Input } from "../ui/input";

const TopBar = ({ title, value, onChange }) => {
  return (
    <div className="flex justify-between items-center p-2 px-4 bg-white shadow-md">
      <h1 className="text-2xl font-bold text-primary-950">{title}</h1>
      <div className="flex items-center gap-4 flex-grow mx-4">
        <div className="relative w-full max-w-md flex items-center gap-2">
          <Input
            type="text"
            value={value}
            onChange={onChange}
            placeholder="Search"
          />
          <FaSearch className="cursor-pointer" />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <FaBell className="text-gray-600 text-xl" />
        <FaUserCircle className="text-gray-600 text-2xl" />
      </div>
    </div>
  );
};

export default TopBar;

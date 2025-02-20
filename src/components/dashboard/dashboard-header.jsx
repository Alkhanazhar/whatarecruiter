import { FaBell, FaSearch, FaUserCircle } from "react-icons/fa";
import { Input } from "../ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";

const TopBar = ({ title, value, onChange }) => {
  return (
    <div className="flex justify-between items-center p-2 px-4 bg-white shadow-md">
      <h1 className="md:text-2xl text-xl whitespace-nowrap font-bold text-primary-950 my-auto">
        {title}
      </h1>
      <div className="flex items-center gap-4 flex-grow mx-4">
        <div className="relative w-full max-w-md md:flex items-center gap-2 hidden ">
          <Input
            type="text"
            value={value}
            onChange={onChange}
            placeholder="Search"
          />
          <FaSearch className="cursor-pointer" />
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <FaUserCircle className="text-gray-600 text-2xl scale-125" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuSeparator />
          <DropdownMenuItem>Home</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            Log out
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {/* <FaBell className="text-gray-600 text-xl" /> */}
    </div>
  );
};

export default TopBar;

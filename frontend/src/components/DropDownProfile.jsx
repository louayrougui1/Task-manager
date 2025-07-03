import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDispatch } from "react-redux";
import { reset, logout } from "../Slices/authSlice";
import { useNavigate, Link } from "react-router";
import { FaPen, FaSignOutAlt } from "react-icons/fa";

const DropdownProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await dispatch(logout());
    dispatch(reset());
    navigate("/");
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Account</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="" align="start">
        <DropdownMenuGroup>
          <Link to="/profile">
            <DropdownMenuItem className="w-full text-left py-2 text-sm font-semibold cursor-pointer">
              <FaPen />
              Edit Profile
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem className="w-full text-left py-2 text-sm font-semibold flex-row justify-start items-center gap-2 text-red-500 cursor-pointer">
            <FaSignOutAlt />
            <button className="cursor-pointer" onClick={handleLogout}>
              Logout
            </button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default DropdownProfile;

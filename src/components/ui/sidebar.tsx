import { Link, useNavigate } from "react-router-dom";
import { MdSpaceDashboard } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { useCookies } from "react-cookie";
import useAuth from "@/Hooks/useAuth";
const SideBar = () => {
  const [cookies, setCookies, removeCookie] = useCookies(["user"]);
  const auth = useAuth();
  const navigate = useNavigate();
  function handleLogout() {
    removeCookie("user");
  }
  return (
    <>
      <div className="bg-black w-80 h-screen text-white">
        <div className=" px-10 py-10">
          <h1>Hi, {cookies.user.username}</h1>
        </div>
        <div className=" px-10 flex flex-col gap-4">
          <Link
            to="/account"
            className=" flex items-center gap-3 hover:ml-3 transition-all"
          >
            <MdSpaceDashboard className=" text-2xl" />
            Home
          </Link>
          <Link
            to="/account/settings"
            className=" flex items-center gap-3 hover:ml-3 transition-all"
          >
            <IoMdSettings className=" text-2xl" />
            Account's Setting
          </Link>
          <div
            className=" flex items-center gap-3 cursor-pointer hover:ml-3 transition-all"
            onClick={handleLogout}
          >
            <IoLogOut className=" text-2xl" />
            Logout
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;

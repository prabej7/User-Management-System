import { Link } from "react-router-dom";
import { MdSpaceDashboard } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { useCookies } from "react-cookie";
const SideBar = () => {
    const [cookies, setCookies] = useCookies(['user']);
    return (
        <>
            <div className="bg-black w-80 h-screen text-white">
                <div className=" px-10 py-10">
                    <h1>Hi, {cookies.user.username}</h1>
                </div>
                <div className=" px-10 flex flex-col gap-4" >
                    <Link to='/account' className=" flex items-center gap-3 " >
                        <MdSpaceDashboard className=" text-2xl" />
                        Home
                    </Link>
                    <Link to='/account/settings' className=" flex items-center gap-3 " >
                        <IoMdSettings  className=" text-2xl" />
                        Account's Setting
                    </Link>
                </div>

            </div>
        </>
    )
}

export default SideBar;
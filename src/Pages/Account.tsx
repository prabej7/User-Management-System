import useAuth from "@/Hooks/useAuth";
import SideBar from "@/components/ui/sidebar";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";

const Account: React.FC = () => {
    const [cookie, setCookies] = useCookies(['user']);
    const navigate = useNavigate();

    useAuth();

    // useEffect(() => {
    //     if (!(cookie && cookie.user)) {
    //         navigate('/login');
    //     }
    // }, []);

    return (
        <div  >
            {cookie && cookie.user &&
                <div className=" flex" >
                    {/* <h1 className="font-bold text-2xl  px-12 py-10" >{cookie.user.username}</h1> */}
                    <SideBar />
                </div>
            }
        </div>
    )
};

export default Account;
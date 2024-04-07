import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";

const Account: React.FC = () => {
    const [cookie, setCookies] = useCookies(['user']);
    const navigate = useNavigate();
    useEffect(() => {
        if (!(cookie && cookie.user)) {
            navigate('/login');
        }
    }, []);
    console.log(cookie);
    return (
        <div className=" px-12 py-10" >
            {cookie && cookie.user &&
                <h1 className="font-bold text-2xl" >{cookie.user.username}</h1>
            }  
        </div>
    )
};

export default Account;
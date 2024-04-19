import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function useAuth(){
    const [cookie, setCookies] = useCookies(['user']);
    const navigate = useNavigate();
    useEffect(()=>{
        if(!cookie.user){
            navigate('/login');
        }
    },[cookie]);

    return ""
}

export default useAuth;
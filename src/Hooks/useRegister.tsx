import React, { useState } from "react";
import axios, { AxiosResponse } from 'axios'; 
import url from "@/Url";
import { useCookies } from 'react-cookie';
interface Data {
    username: string,
    password: string
}

const useRegister = () => {
    const [cookie,setCookies] = useCookies(['user']);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [status, setStatus] = useState<number>(0);
    const [ response, setResponse ] = useState<AxiosResponse>();
    async function reg(data: Data) {
        setLoading(true);
        try{
            const response: AxiosResponse = await axios.post(`${url}/register`,data);
            if(response.status==200){
                setCookies('user',response.data);
            }
            setResponse(response);
        }catch(error){
            setStatus(201);
        }finally{
            setLoading(false);
        }
    }
    return {reg, isLoading,response,status }
}

export default useRegister;
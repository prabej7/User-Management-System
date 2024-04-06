import React, { useState } from "react";
import axios, { AxiosResponse } from 'axios'; 
import url from "@/Url";
import { useCookies } from 'react-cookie';

interface Data {
    username: string,
    password: string
}

const useLogin = () => {
    const [cookie, setCookies] = useCookies(['user']);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [status, setStatus] = useState<number>(0);
    const [response, setResponse] = useState<AxiosResponse>();

    async function login(data: Data) {
        setLoading(true);
        try {
            const response: AxiosResponse = await axios.post(`${url}/login`, data);
            setResponse(response);
            if(response.status==200){
                setCookies('user',response.data);
            }
            setStatus(response.status); // Update status after receiving response
        } catch (error) {
            setStatus(201);
        } finally {
            setLoading(false);
        }
    }

    return { login, isLoading, response, status };
}

export default useLogin;

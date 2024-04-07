import { useState, useEffect } from "react";
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

    useEffect(() => {
        if (response) {
            setStatus(response.status);
        }
    }, [response]);

    async function login(data: Data) {
        setLoading(true);

        axios.post(`${url}/login`, data).then((response: AxiosResponse) => {
            setResponse(response);
            setStatus(response.status);
            if (response.status === 200) {
                setCookies('user', response.data, {
                    expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
                });
            }
        });


    }

    return { login, isLoading, response, status };
}

export default useLogin;

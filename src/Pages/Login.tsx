import React from "react";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCookies } from 'react-cookie'
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form'
import useLogin from "@/Hooks/useLogin";

const schema = z.object({
    username: z.string().min(5),
    password: z.string().min(8)
});

type formFields = z.infer<typeof schema>
const Login: React.FC = () => {
    const { response, login, status } = useLogin();
    const [cookie, setCookies, logout] = useCookies(['user']);
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset, setError } = useForm<formFields>({
        resolver: zodResolver(schema),
    });
    async function onSubmit(data: formFields) {
        await login(data);
        
    }

    return (
        <div className="flex h-screen justify-center flex-col items-center" >
            {cookie && cookie.user ?
                <div className="flex flex-col gap-3 items-center">
                    <h1>You are already logged in!</h1>
                    <Button onClick={() => logout('user')} >Logout</Button>
                </div>
                :
                <div>
                    <div className="flex justify-center" >
                        <h1 className=" font-bold mb-5 text-2xl" >
                            Login
                        </h1>
                    </div>
                    {status===201  && <div>
                        <div className=" text-sm text-red-500 mb-5 text-center" >Username or password is incorrect.</div>
                    </div>}
                    {status===203  && <div>
                        <div className=" text-sm text-red-500 mb-5 text-center" >
                            <p>User doesn't exists.</p>
                        </div>
                    </div>}
                    {errors.root && <div>
                        <div className=" text-sm text-red-500 mb-5 text-center" >{errors.root.message}</div>
                    </div>}
                    <form className=" w-72 flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)} >
                        <Input {...register('username')} placeholder="Email or username" />
                        {errors.username && <div className=" text-sm text-red-500" >{errors.username.message}</div>}
                        <Input {...register('password')} placeholder="Password" />
                        {errors.password && <div className=" text-sm text-red-500"  >{errors.password.message}</div>}
                        <Button disabled={isSubmitting} >{isSubmitting ? 'Loading...' : 'Login'}</Button>
                        <div className="flex gap-1 text-sm justify-center mt-2" >
                            <p>Don't have an account? </p><Link to='/register' className=" underline" >Register</Link>
                        </div>

                    </form>
                </div>
            }


        </div>
    )
}

export default Login;
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import useRegister from "../Hooks/useRegister";
import { useCookies } from 'react-cookie'
const schema = z.object({
    username: z.string().min(5),
    password: z.string().min(8)
});

type formFields = z.infer<typeof schema>

const Register: React.FC = () => {
    const [cookie, setCookies] = useCookies(['user']);
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset, setError } = useForm<formFields>({
        resolver: zodResolver(schema),
    });

    const { reg, isLoading, response, status } = useRegister();

    async function onSubmit(data: formFields) {
        await reg(data);
        if(response?.status===200){
            reset();
        }else{
            setError('root',{
                message:'User already exists.',
            })
        }

    }
    return (
        <div className="flex h-screen justify-center flex-col items-center" >
            <div>
                <h1 className=" font-bold mb-5 text-2xl" >
                    Register
                </h1>
            </div>
            {errors.root && <div>
                <div className=" text-sm text-red-500 mb-5" >{errors.root.message}</div>
            </div>}

            <form className=" w-72 flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)} >
                <Input {...register('username')} placeholder="Email or username" />
                {errors.username && <div className=" text-sm text-red-500" >{errors.username.message}</div>}
                <Input {...register('password')} placeholder="Password" />
                {errors.password && <div className=" text-sm text-red-500"  >{errors.password.message}</div>}
                <Button disabled={isSubmitting} >{isSubmitting ? 'Loading...' : 'Register'}</Button>
                <div className="flex gap-1 text-sm justify-center mt-2" >
                    <p>Already have an account? </p><Link to='/login' className=" underline" >Login</Link>
                </div>

            </form>
        </div>
    )
}

export default Register;
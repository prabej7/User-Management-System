import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import useRegister from "../Hooks/useRegister";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
const schema = z.object({
  username: z.string().min(5),
  password: z.string().min(8),
});

type formFields = z.infer<typeof schema>;

const Register: React.FC = () => {
  const [cookie, setCookies] = useCookies(["user"]);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<formFields>({
    resolver: zodResolver(schema),
  });
  const navigate = useNavigate();
  const { reg, isLoading, response, status } = useRegister();
  const [isShowPassword, setShowPassword] = useState<boolean>(false);
  async function onSubmit(data: formFields) {
    await reg(data);
  }

  const showPassword = () => {
    setShowPassword(!isShowPassword);
  };

  useEffect(() => {
    if (response?.status === 200) {
      reset();
      navigate("/account");
    } else if (response?.status === 201) {
      setError("root", {
        message: "User already exists.",
      });
    }
  }, [response]);
  return (
    <div className="flex h-screen justify-center flex-col items-center">
      <div>
        <h1 className=" font-bold mb-5 text-2xl">Register</h1>
      </div>
      {errors.root && (
        <div>
          <div className=" text-sm text-red-500 mb-5">
            {errors.root.message}
          </div>
        </div>
      )}

      <form
        className=" w-72 flex flex-col gap-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input {...register("username")} placeholder="Email or username" />
        {errors.username && (
          <div className=" text-sm text-red-500">{errors.username.message}</div>
        )}
        <div className="relative">
          <Input
            type={isShowPassword ? "text" : "password"}
            {...register("password")}
            placeholder="Password"
          />
          {isShowPassword ? (
            <FaEye
              className="absolute top-2.5 right-3 cursor-pointer"
              onClick={showPassword}
            />
          ) : (
            <FaRegEyeSlash
              className="absolute top-2.5 right-3 cursor-pointer"
              onClick={showPassword}
            />
          )}
        </div>

        {errors.password && (
          <div className=" text-sm text-red-500">{errors.password.message}</div>
        )}
        <Button disabled={isSubmitting}>
          {isSubmitting ? "Loading..." : "Register"}
        </Button>
        <div className="flex gap-1 text-sm justify-center mt-2">
          <p>Already have an account? </p>
          <Link to="/login" className=" underline">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;

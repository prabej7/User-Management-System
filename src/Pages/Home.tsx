import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom'
const Home: React.FC = () => {
    return (
        <div className=" h-screen flex justify-center items-center flex-col gap-5">
            <div className="" >
                <h1 className=" font-bold text-3xl" >User Management System</h1>
                <p className="leading-7 [&:not(:first-child)]:mt-2 text-center">
                    "Made with React, Node.js and MongoDB."
                </p>
            </div>
            <div className="flex gap-3">
                <Button className="" ><Link to='/register' >Register</Link></Button>
                <Button className=" bg-transparent text-black hover:text-customBlack hover:bg-customWhite" ><Link to='/login'>Login</Link></Button>
            </div>
        </div>
    )
};

export default Home;
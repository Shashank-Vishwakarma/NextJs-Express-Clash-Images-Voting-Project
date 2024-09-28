"use client";

// import { loginAction } from "@/actions/authActions";
import SubmitButton from "@/components/shared/SubmitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authContext } from "@/context/AuthContext";
import axios, { AxiosError, AxiosResponse } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
// import { useFormState, useFormStatus } from "react-dom";
import toast from "react-hot-toast";

// const initialState = {
//     message: "",
// };

export default function LoginForm() {
    // const { pending } = useFormStatus();
    // const [state, loginFormAction] = useFormState(loginAction, initialState);

    // useEffect(() => {
    //     if (state?.error) {
    //         toast.error(state?.error);
    //     } else if (state?.success) {
    //         toast.success(state?.message);
    //         redirect("/dashboard");
    //     }
    // }, [state]);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const router = useRouter();
    const { setUser } = useContext(authContext);

    const login = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response: AxiosResponse = await axios.post(
                `http://localhost:5000/api/v1/auth/login`,
                {
                    email,
                    password,
                },
                {
                    withCredentials: true,
                }
            );

            setUser(response.data?.user);
            toast.success(response.data?.message);
            router.replace("/dashboard");
        } catch (error) {
            console.log(
                "Error in login: ",
                (error as AxiosError).response?.data?.error || error
            );
            return { error: (error as AxiosError).response?.data?.error };
        }
    };

    // action={loginFormAction}

    return (
        <form onSubmit={login}>
            <div className="mt-4">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setEmail(e.target.value)
                    }
                    placeholder="Email"
                />
            </div>

            <div className="mt-4">
                <Label htmlFor="password">Password</Label>
                <Input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setPassword(e.target.value)
                    }
                    placeholder="Password"
                />
            </div>

            <div className="mt-2">
                <Link href={"/forgot-password"}>
                    <span className="text-blue-700 cursor-pointer font-medium">
                        Forgot password?
                    </span>
                </Link>
            </div>

            <div className="mt-4">
                <SubmitButton pending={false} text="Login" />
            </div>
        </form>
    );
}

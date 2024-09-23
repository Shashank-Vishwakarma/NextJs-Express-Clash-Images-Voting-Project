"use client";

import { loginAction } from "@/actions/authActions";
import SubmitButton from "@/components/shared/SubmitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useFormState, useFormStatus } from "react-dom";
import toast from "react-hot-toast";

const initialState = {
    message: "",
};

export default function LoginForm() {
    const { pending } = useFormStatus();
    const [state, loginFormAction] = useFormState(loginAction, initialState);

    if (state?.error) {
        toast.error(state?.error);
    } else if (state?.success) {
        toast.success(state?.message);
        redirect("/");
    }

    return (
        <form action={loginFormAction}>
            <div className="mt-4">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" placeholder="Email" />
            </div>

            <div className="mt-4">
                <Label htmlFor="password">Password</Label>
                <Input
                    id="password"
                    name="password"
                    type="password"
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
                <SubmitButton pending={pending} text="Login" />
            </div>
        </form>
    );
}

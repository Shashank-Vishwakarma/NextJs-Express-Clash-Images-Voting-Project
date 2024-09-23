"use client";

import { signupAction } from "@/actions/authActions";
import SubmitButton from "@/components/shared/SubmitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormState, useFormStatus } from "react-dom";
import toast from "react-hot-toast";

const initialState = {
    message: "",
};

export default function SignUpForm() {
    const { pending } = useFormStatus();
    const [state, signupFormAction] = useFormState(signupAction, initialState);

    if (state?.error) {
        toast.error(state?.error);
    } else if (state?.success) {
        toast.success(state?.message);
    }

    return (
        <form action={signupFormAction}>
            <div className="mt-4">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" placeholder="Name" />
            </div>

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

            <div className="mt-4">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                />
            </div>

            <div className="mt-4">
                <SubmitButton pending={pending} text="Sign Up" />
            </div>
        </form>
    );
}

"use client";

import { generateResetTokenAction } from "@/actions/authActions";
import SubmitButton from "@/components/shared/SubmitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import toast from "react-hot-toast";

const initialState = {
    message: "",
};

export default function ForgotPasswordForm() {
    const { pending } = useFormStatus();
    const [state, forgotPasswordFormAction] = useFormState(
        generateResetTokenAction,
        initialState
    );

    useEffect(() => {
        if (state?.error) {
            toast.error(state?.error);
        } else if (state?.success) {
            toast.success(state?.message);
            redirect("/reset-password");
        }
    }, [state]);

    return (
        <form
            action={forgotPasswordFormAction}
            onSubmit={(e) => e.preventDefault()}>
            <div className="mt-4">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" placeholder="Email" />
            </div>

            <div className="mt-4">
                <SubmitButton pending={pending} text="Send Reset Token" />
            </div>
        </form>
    );
}

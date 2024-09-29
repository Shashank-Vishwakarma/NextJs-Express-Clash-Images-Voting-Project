"use client";

import { resetPasswordAction } from "@/actions/authActions";
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

export default function ResetPasswordForm() {
    const { pending } = useFormStatus();
    const [state, resetPasswordFormAction] = useFormState(
        resetPasswordAction,
        initialState
    );

    useEffect(() => {
        if (state?.error) {
            toast.error(state?.error);
        } else if (state?.success) {
            toast.success(state?.message);
            redirect("/login");
        }
    }, [state]);

    return (
        <form
            action={resetPasswordFormAction}
            onSubmit={(e) => e.preventDefault()}>
            <div className="mt-4">
                <Label htmlFor="resetToken">Token</Label>
                <Input
                    id="resetToken"
                    name="resetToken"
                    placeholder="Reset Token"
                />
            </div>

            <div className="mt-4">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" placeholder="Email" />
            </div>

            <div className="mt-4">
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    placeholder="New Password"
                />
            </div>

            <div className="mt-4">
                <Label htmlFor="confirmNewPassword">Confirm New Password</Label>
                <Input
                    id="confirmNewPassword"
                    name="confirmNewPassword"
                    type="password"
                    placeholder="Confirm New Password"
                />
            </div>

            <div className="mt-4">
                <SubmitButton pending={pending} text="Reset Password" />
            </div>
        </form>
    );
}

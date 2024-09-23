import ResetPasswordForm from "@/components/specific/auth/ResetPasswordForm";
import Link from "next/link";

export default function ResetPassword() {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-[550px] bg-slate-100 rounded-lg shadow-md p-5">
                <h1 className="text-center text-2xl md:text-3xl lg:text-4xl font-bold">
                    Reset Password
                </h1>

                <ResetPasswordForm />
            </div>
        </div>
    );
}

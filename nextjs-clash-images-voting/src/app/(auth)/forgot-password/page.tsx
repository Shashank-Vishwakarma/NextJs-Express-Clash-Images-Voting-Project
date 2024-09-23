import ForgotPasswordForm from "@/components/specific/auth/ForgotPasswordForm";

export default function ForgotPassword() {
    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <div className="w-[550px] bg-slate-100 rounded-lg shadow-md p-5">
                <h1 className="text-center text-2xl md:text-3xl lg:text-4xl font-bold">
                    Forgot Password
                </h1>
                <h4 className="text-lg text-center mt-4">
                    Enter your email to get a reset token.
                </h4>

                <ForgotPasswordForm />
            </div>
        </div>
    );
}

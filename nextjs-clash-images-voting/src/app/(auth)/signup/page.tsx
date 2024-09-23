import SignUpForm from "@/components/specific/auth/SignUpForm";
import Link from "next/link";

export default function SignUp() {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-[550px] bg-slate-100 rounded-lg shadow-md p-5">
                <h1 className="text-center text-4xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-pink-400 to-purple-500 text-transparent bg-clip-text">
                    Clash
                </h1>
                <h1 className="text-center text-2xl md:text-3xl lg:text-4xl font-bold">
                    Create a new account
                </h1>

                <SignUpForm />

                <div className="m-2">
                    <p className="text-center">
                        Already have an account?{" "}
                        <Link href={"/login"}>
                            <span className="text-blue-700 cursor-pointer font-medium">
                                Login
                            </span>
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

import LoginForm from "@/components/specific/auth/LoginForm";
import Link from "next/link";

export default function Login() {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-[550px] bg-slate-100 rounded-lg shadow-md p-5">
                <h1 className="text-center text-4xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-pink-400 to-purple-500 text-transparent bg-clip-text">
                    Clash
                </h1>
                <h1 className="text-center text-2xl md:text-3xl lg:text-4xl font-bold">
                    Login
                </h1>

                <LoginForm />

                <div className="text-center m-2">
                    <p>
                        Don't have an account?{" "}
                        <Link href={"/signup"}>
                            <span className="text-blue-700 cursor-pointer font-medium">
                                Create an Account
                            </span>
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

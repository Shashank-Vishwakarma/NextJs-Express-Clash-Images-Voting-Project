import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

                <form>
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
                            placeholder="Password"
                        />
                    </div>

                    <div className="mt-4">
                        <Label htmlFor="confirmPassword">
                            Confirm Password
                        </Label>
                        <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                        />
                    </div>

                    <div className="mt-4">
                        <Button type="submit" className="w-full">
                            Create Account
                        </Button>
                    </div>
                </form>

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

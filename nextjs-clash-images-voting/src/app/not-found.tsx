import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="w-full h-screen justify-center items-center flex flex-col">
            <h2 className="text-5xl font-bold m-2">Not Found</h2>
            <p className="text-3xl m-2">Could not find requested resource</p>
            <div className="m-2">
                <Link href={"/"}>
                    <Button>Return to Home</Button>
                </Link>
            </div>
        </div>
    );
}

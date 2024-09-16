import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="w-full h-screen items-center flex flex-col">
            <Image
                src={"/not-found.svg"}
                width={500}
                height={500}
                alt="Not Found"
            />
            <div>
                <Link href={"/"}>
                    <Button className="w-48 h-12">Return to Home</Button>
                </Link>
            </div>
        </div>
    );
}

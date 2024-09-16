import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

export default function HeroSection() {
    return (
        <div className="w-full h-screen flex flex-col justify-center items-center">
            <div>
                <Image
                    src={"/banner.svg"}
                    width={600}
                    height={600}
                    alt="Banner"
                />
            </div>

            <div className="text-center">
                <h1 className="text-5xl md:text-7xl lg:text-9xl font-extrabold bg-gradient-to-r from-pink-400 to-purple-500 text-transparent bg-clip-text">
                    Clash
                </h1>
                <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-center">
                    Discove the better choice
                </p>

                <Link href={"/login"}>
                    <Button className="w-48 h-12 font-bold text-lg mt-2">
                        Get Started
                    </Button>
                </Link>
            </div>
        </div>
    );
}

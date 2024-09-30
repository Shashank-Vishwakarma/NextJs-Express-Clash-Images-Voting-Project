"use client";

import Navbar from "@/components/base/Navbar";
import SubmitButton from "@/components/shared/SubmitButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThumbsUp } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";

type Comment = {
    text: string;
    createdAt: string;
};

export default function ClashPage() {
    // get the clash id
    const { id } = useParams();

    const [_, setOpen] = useState(false);
    const [comments, setComments] = useState<Comment[]>([]);
    return (
        <>
            <Navbar setOpen={setOpen} />
            <div className="flex justify-center items-center flex-col m-4">
                <h1 className="font-bold text-2xl">{"This is title"}</h1>
                <p>{"this is description"}</p>
            </div>
            <div className="flex flex-col justify-center p-10">
                <div className="flex flex-row items-center justify-around">
                    <div className="flex flex-col justify-center items-center gap-4">
                        <div className="relative border border-black rounded-lg w-60 h-60 flex items-center justify-center cursor-pointer">
                            <Image
                                src={"/image-1.png"}
                                width={230}
                                height={250}
                                alt="Image 1"
                                className="absolute z-10 object-cover"
                            />
                        </div>
                        <Button>
                            <span className="mr-2 text-lg">Vote</span>
                            <ThumbsUp />
                        </Button>
                    </div>
                    <div className="font-bold text-3xl">VS</div>

                    <div className="flex flex-col justify-center items-center gap-4">
                        <div className="border border-black rounded-lg w-60 h-60 flex items-center justify-center cursor-pointer">
                            <Image
                                src={"/image-1.png"}
                                width={230}
                                height={250}
                                alt="Image 1"
                                className="absolute z-10 object-cover"
                            />
                        </div>
                        <Button>
                            <span className="mr-2 text-lg">Vote</span>
                            <ThumbsUp />
                        </Button>
                    </div>
                </div>
            </div>

            <div className="w-full p-5">
                <form>
                    <div className="mt-4">
                        <Input
                            id="comment"
                            name="comment"
                            type="text"
                            placeholder="Type your suggestion..."
                        />
                    </div>

                    <div className="mt-4">
                        <SubmitButton pending={false} text="Submit Comment" />
                    </div>
                </form>
            </div>

            <div className="max-h-80 overflow-y-auto">
                {comments.map((comment) => (
                    <div className="flex flex-col justify-center items-center">
                        <h3 className="font-bold text-lg">{comment.text}</h3>
                        <span>{comment.createdAt}</span>
                    </div>
                ))}
            </div>
        </>
    );
}

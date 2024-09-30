"use client";

import { Clash } from "@/app/dashboard/page";
import Navbar from "@/components/base/Navbar";
import socket from "@/lib/socket";
import Image from "next/image";
import { useEffect, useState } from "react";
import CountUp from "react-countup";

export type Comment = {
    id: string;
    title: string;
    created_at: string;
};

export default function ViewClashItems({ clash }: { clash: Clash }) {
    const [_, setOpen] = useState(false);
    const [comments, setComments] = useState<Comment[]>(clash.comments);
    const [clashItems, setClashItems] = useState(clash?.clashItem);

    useEffect(() => {
        socket.on(`clash-${clash.id}`, (data) => {
            setClashItems((prev) =>
                prev?.map((item) => {
                    return item.id === data?.clashItemId
                        ? { ...item, count: item.count + 1 }
                        : item;
                })
            );
        });

        socket.on(`comments-clash-${clash?.id}`, (data) => {
            setComments((prev) => [data, ...prev]);
        });
    }, [socket]);

    return (
        <>
            <Navbar setOpen={setOpen} />
            <div className="flex justify-center items-center flex-col m-4">
                <h1 className="font-bold text-2xl">{clash?.title}</h1>
                <p>{clash?.description}</p>
            </div>
            <div className="flex flex-col justify-center p-10">
                <div className="flex flex-row items-center justify-around">
                    <div className="flex flex-col justify-center items-center gap-4">
                        <div className="relative border rounded-lg w-96 h-72 flex items-center justify-center cursor-pointer">
                            <Image
                                src={clashItems?.at(0)?.image as string}
                                width={230}
                                height={250}
                                alt="Image 1"
                                className="absolute object-cover w-fit h-full rounded-md"
                            />
                        </div>
                        <CountUp
                            start={0}
                            end={clashItems?.at(0)?.count as number}
                            className="text-xl font-bold"
                        />
                    </div>
                    <div className="font-bold text-3xl">VS</div>

                    <div className="flex flex-col justify-center items-center gap-4">
                        <div className="relative border rounded-lg w-96 h-72 flex items-center justify-center cursor-pointer">
                            <Image
                                src={clashItems?.at(1)?.image as string}
                                width={230}
                                height={250}
                                alt="Image 2"
                                className="absolute object-cover w-fit h-full rounded-md"
                            />
                        </div>
                        <CountUp
                            start={0}
                            end={clashItems?.at(1)?.count as number}
                            className="text-xl font-bold"
                        />
                    </div>
                </div>
            </div>

            {/* Add Comment */}
            {/* <div className="w-full p-5">
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
            </div> */}

            {/* Show All Comments */}
            <div className="max-h-80 overflow-y-auto flex flex-col mx-10 my-2 border-2 border-blue-500 p-3 rounded-md">
                <h1 className="font-bold text-3xl">All Comments</h1>
                {comments &&
                    comments.length > 0 &&
                    comments.map((comment) => (
                        <div
                            key={comment.id}
                            className="flex flex-col mx-10 my-2">
                            <div className="border-2 border-sky-200 p-3 rounded-md">
                                <p className="font-bold text-lg">
                                    {comment.title}
                                </p>
                                <span>{comment.created_at}</span>
                            </div>
                        </div>
                    ))}

                {comments.length === 0 && <div>No Comments</div>}
            </div>
        </>
    );
}

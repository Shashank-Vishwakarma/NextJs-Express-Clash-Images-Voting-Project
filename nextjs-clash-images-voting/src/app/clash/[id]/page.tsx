"use client";

import { Clash } from "@/app/dashboard/page";
import SubmitButton from "@/components/shared/SubmitButton";
import { Comment } from "@/components/specific/clash/ViewClashItems";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fetchClashById } from "@/fetch/fetchClashById";
import { ThumbsUp } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import CountUp from "react-countup";
import socket from "@/lib/socket";
import { v4 as uuidv4 } from "uuid";

export default function ClashPage() {
    const { id } = useParams(); // clash id
    const [clash, setClash] = useState<Clash | null>();

    const [comments, setComments] = useState<Comment[]>(
        clash?.comments as Comment[]
    );

    const [commentText, setCommentText] = useState<string>("");
    const [clashItems, setClashItems] = useState(clash?.clashItem);

    const [hideVote, setHideVote] = useState(false);

    useEffect(() => {
        const fetchClashData = async () => {
            const response = await fetchClashById(id as string);
            if (response.clash) {
                setClash(response.clash as Clash);
                setComments(response.clash.comments);
                setClashItems(response.clash.clashItem);
            } else {
                setClash(null);
                setComments([]);
                toast.error(response.error as string);
            }
        };

        fetchClashData();
    }, []);

    const updateVoteCounter = (clashItemId: string) => {
        setClashItems((prev) =>
            prev?.map((item) => {
                return item.id === clashItemId
                    ? { ...item, count: item.count + 1 }
                    : item;
            })
        );
    };

    const handleVoteCountChange = (clashItemId: string) => {
        if (clash?.clashItem && clash.clashItem.length > 0) {
            setHideVote(true);
            updateVoteCounter(clashItemId);

            // notify socket to increase vote based on clashItemId
            socket.emit(`clash-${clash.id}`, {
                clashId: clash.id,
                clashItemId,
            });
        }
    };

    // real-time update to everyone
    useEffect(() => {
        socket.on(`clash-${clash?.id}`, (data) => {
            updateVoteCounter(data?.clashItemId);
        });

        socket.on(`comments-clash-${clash?.id}`, (data) => {
            setComments((prev) => [data, ...prev]);
        });
    }, [socket]);

    const handleAddComment = async (e: React.FormEvent) => {
        e.preventDefault();

        if (commentText?.length > 0) {
            const comment = {
                id: uuidv4(),
                title: commentText,
                clashId: clash?.id,
                created_at: new Date().toDateString(),
            };

            // notify socket to create comment in database
            socket.emit(`comments-clash-${clash?.id}`, comment);
            setComments((prev) => [
                {
                    id: comment.id,
                    title: comment.title,
                    created_at: comment.created_at,
                },
                ...prev,
            ]);
            setCommentText("");
        } else {
            toast.error(
                "Please write something to add a comment on this clash"
            );
        }
    };

    return (
        <>
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

                        {hideVote ? (
                            <CountUp
                                start={0}
                                end={clashItems?.at(0)?.count as number}
                                className="text-xl font-bold"
                            />
                        ) : (
                            <Button
                                onClick={() =>
                                    handleVoteCountChange(
                                        clashItems?.at(0)?.id as string
                                    )
                                }>
                                <span className="mr-2 text-lg">Vote</span>
                                <ThumbsUp />
                            </Button>
                        )}
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
                        {hideVote ? (
                            <CountUp
                                start={0}
                                end={clashItems?.at(1)?.count as number}
                                className="text-xl font-bold"
                            />
                        ) : (
                            <Button
                                onClick={() =>
                                    handleVoteCountChange(
                                        clashItems?.at(1)?.id as string
                                    )
                                }>
                                <span className="mr-2 text-lg">Vote</span>
                                <ThumbsUp />
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            <div className="w-full p-5">
                <form onSubmit={handleAddComment}>
                    <div className="mt-4">
                        <Input
                            id="comment"
                            name="comment"
                            type="text"
                            placeholder="Type your suggestion..."
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                        />
                    </div>

                    <div className="mt-4">
                        <SubmitButton pending={false} text="Submit Comment" />
                    </div>
                </form>
            </div>

            {/* Show All Comments */}
            <div className="max-h-80 overflow-y-auto flex flex-col mx-10 my-2 border-2 border-blue-500 p-3 rounded-md">
                <h1 className="font-bold text-3xl">All Comments</h1>
                {comments &&
                    comments?.length > 0 &&
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

                {comments?.length === 0 && <div>No Comments</div>}
            </div>
        </>
    );
}

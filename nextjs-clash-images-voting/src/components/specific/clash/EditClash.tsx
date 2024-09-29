"use client";

import SubmitButton from "@/components/shared/SubmitButton";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format, set } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";
import axios, { AxiosResponse } from "axios";
import { Clash } from "@/app/dashboard/page";
import Image from "next/image";

export default function EditClash({
    clash,
    open,
    setOpen,
}: {
    clash: Clash;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const [clashData, setClashData] = useState({
        title: clash.title,
        description: clash.description,
    });

    const [image, setImage] = useState<File | null>();
    const [date, setDate] = useState<Date>(new Date(clash.expires_at));
    const [loading, setLoading] = useState(false);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
        }
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setLoading(true);

        const formData = new FormData();
        formData.append("title", clashData.title);
        formData.append("description", clashData.description);
        formData.append("expires_at", date.toString());

        if (image) {
            formData.append("image", image as File);
        }

        console.log(formData);

        try {
            const response: AxiosResponse = await axios.put(
                `http://localhost:5000/api/v1/clash/update/${clash.id}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    withCredentials: true,
                }
            );

            console.log(response);

            setOpen(false);

            setLoading(false);
        } catch (error) {
            console.log("Error in handleSubmit for creating clash: ", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent
                onInteractOutside={(e) => e.preventDefault()}
                aria-describedby="description">
                <DialogHeader>
                    <DialogTitle>Edit this clash</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit}>
                    <div className="mt-4">
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            name="title"
                            value={clashData?.title}
                            onChange={(e) =>
                                setClashData({
                                    ...clashData,
                                    title: e.target.value,
                                })
                            }
                        />
                    </div>

                    <div className="mt-4">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            name="description"
                            value={clashData?.description}
                            onChange={(e) =>
                                setClashData({
                                    ...clashData,
                                    description: e.target.value,
                                })
                            }
                            aria-describedby="description"
                        />
                    </div>

                    <div className="mt-4">
                        <Label htmlFor="image">Image</Label>
                        <Input
                            id="image"
                            name="image"
                            onChange={handleImageChange}
                            type="file"
                        />
                        <Image
                            src={clash.image}
                            width={50}
                            height={50}
                            alt="Clash Image preview"
                        />
                    </div>

                    <div className="mt-4">
                        <Label htmlFor="expireAt" className="block mb-2">
                            Expire At:{" "}
                        </Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-[280px] justify-start text-left font-normal",
                                        !date && "text-muted-foreground"
                                    )}>
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {date ? (
                                        format(date, "PPP")
                                    ) : (
                                        <span>Pick a date</span>
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={(date) => setDate(date!)}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    <div className="mt-4">
                        {loading ? (
                            <SubmitButton pending={true} text="Loading..." />
                        ) : (
                            <SubmitButton pending={false} text="Edit Clash" />
                        )}
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}

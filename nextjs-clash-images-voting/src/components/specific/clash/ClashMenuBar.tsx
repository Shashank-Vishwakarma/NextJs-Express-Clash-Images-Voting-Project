"use client";

import { Clash } from "@/app/dashboard/page";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import { Suspense, useState } from "react";
import dynamic from "next/dynamic";
import toast from "react-hot-toast";

const EditClashDialog = dynamic(() => import("./EditClash"));
const DeleteClashDialog = dynamic(() => import("./DeleteClashDialog"));

export default function ClashMenuBar({ clash }: { clash: Clash }) {
    const [open, setOpen] = useState(false);
    const [openClashDeleteAlert, setOpenClashDeleteAlert] = useState(false);

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <EllipsisVertical />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => setOpen(true)}>
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => {
                            navigator.clipboard.writeText(
                                `http://localhost:3000/clash/${clash.id}`
                            );
                            toast.success("Link copied to clipboard");
                        }}>
                        Copy Link
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => setOpenClashDeleteAlert(true)}>
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Edit clash dialog */}
            <Suspense fallback={<div>Loading...</div>}>
                <EditClashDialog clash={clash} open={open} setOpen={setOpen} />
            </Suspense>

            {/* Delete clash dialog */}
            <Suspense fallback={<div>Loading...</div>}>
                <DeleteClashDialog
                    clashId={clash.id}
                    open={openClashDeleteAlert}
                    setOpen={setOpenClashDeleteAlert}
                />
            </Suspense>
        </>
    );
}

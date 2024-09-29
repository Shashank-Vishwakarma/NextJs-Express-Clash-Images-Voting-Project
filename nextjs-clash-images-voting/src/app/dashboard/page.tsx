"use client";

import Navbar from "@/components/base/Navbar";
import LogoutAlertDialog from "@/components/specific/auth/LogoutAlertDialog";
import ClashCard from "@/components/specific/clash/ClashCard";
import CreateClash from "@/components/specific/clash/CreateClash";
import { authContext } from "@/context/AuthContext";
import axios, { AxiosResponse } from "axios";
import { useContext, useEffect, useState } from "react";

export type Clash = {
    id: string;
    title: string;
    description: string;
    image: string;
    expires_at: string;
};

export default function Dashboard() {
    const [open, setOpen] = useState<boolean>(false);
    const [clashes, setClashes] = useState<Clash[]>([]);

    const { user } = useContext(authContext);

    useEffect(() => {
        const getAllClash = async () => {
            try {
                const response: AxiosResponse = await axios.get(
                    "http://localhost:5000/api/v1/clash/all",
                    { withCredentials: true }
                );

                setClashes(response.data);
            } catch (error) {
                console.log("Error in getAllClash: ", error);
            }
        };

        getAllClash();
    }, []);

    return (
        <div className="container">
            <Navbar setOpen={setOpen} />
            <LogoutAlertDialog open={open} setOpen={setOpen} />

            <div className="text-end p-5">
                <CreateClash />
            </div>

            <div>
                {clashes.map((clash) => (
                    <ClashCard key={clash.id} clash={clash} />
                ))}
            </div>
        </div>
    );
}

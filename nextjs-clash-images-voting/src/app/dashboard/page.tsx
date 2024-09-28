"use client";

import Navbar from "@/components/base/Navbar";
import LogoutAlertDialog from "@/components/specific/auth/LogoutAlertDialog";
import { authContext } from "@/context/AuthContext";
import { useContext, useState } from "react";

export default function Dashboard() {
    const [open, setOpen] = useState<boolean>(false);

    const { user } = useContext(authContext);

    console.log(user);

    return (
        <div className="container">
            <Navbar setOpen={setOpen} />
            <LogoutAlertDialog open={open} setOpen={setOpen} />
        </div>
    );
}

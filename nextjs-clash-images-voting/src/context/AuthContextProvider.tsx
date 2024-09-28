"use client";

import React, { useState } from "react";
import { authContext } from "./AuthContext";

export type MyCustomUser = {
    id: string;
    name: string;
    email: string;
};

export const AuthContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [user, setUser] = useState<MyCustomUser>({} as MyCustomUser);
    return (
        <authContext.Provider value={{ user, setUser }}>
            {children}
        </authContext.Provider>
    );
};

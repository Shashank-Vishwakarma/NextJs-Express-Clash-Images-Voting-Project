import { useContext } from "react";
import { authContext } from "./AuthContext";

export const useAuthContextHook = () => {
    return useContext(authContext);
};

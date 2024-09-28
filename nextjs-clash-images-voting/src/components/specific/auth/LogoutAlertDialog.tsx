// import { logoutAction } from "@/actions/authActions";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { authContext } from "@/context/AuthContext";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { useContext } from "react";

export default function LogoutAlertDialog({
    open,
    setOpen,
}: {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    // const logout = async () => {
    //     logoutAction();
    //     redirect("/login");
    // };

    const { setUser } = useContext(authContext);
    const router = useRouter();

    const logout = async () => {
        try {
            const response: AxiosResponse = await axios.get(
                `http://localhost:5000/api/v1/auth/logout`,
                { withCredentials: true }
            );

            if (response.data?.error) {
                console.log("error in logout frontend");
            } else {
                setUser(null);
                router.replace("/login");
            }
        } catch (error) {
            console.log(
                "Error in logout: ",
                (error as AxiosError).response?.data || error
            );
        }
    };

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger></AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure to logout?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This will delete your current session, and you will need
                        to login again.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setOpen(false)}>
                        No
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={logout}>Yes</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

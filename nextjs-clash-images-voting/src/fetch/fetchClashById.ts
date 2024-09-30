import { Clash } from "@/app/dashboard/page";
import axios, { AxiosResponse } from "axios";

export async function fetchClashById(id: string): Promise<{
    clash: Clash | null;
    error?: string;
}> {
    try {
        const response: AxiosResponse = await axios.get(
            `http://localhost:5000/api/v1/clash/${id}`,
            { withCredentials: true }
        );

        if (response.data?.error) {
            return { clash: null, error: response.data?.error };
        }

        return { clash: response.data, error: "" };
    } catch (error) {
        console.log("Error in fetchClashById: ", error);
    }

    return { clash: null, error: "" };
}

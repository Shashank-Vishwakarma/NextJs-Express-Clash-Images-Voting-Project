import axios, { AxiosError, AxiosResponse } from "axios";

export async function deleteClashAction(id: string) {
    try {
        const response: AxiosResponse = await axios.delete(
            `http://localhost:5000/api/v1/clash/${id}`,
            {
                withCredentials: true,
            }
        );

        if (response.data?.error) {
            throw new Error(response.data?.error);
        }
    } catch (error) {
        console.log("Error in handleSubmit for creating clash: ", error);
        throw new Error((error as AxiosError).response?.data?.error);
    }
}

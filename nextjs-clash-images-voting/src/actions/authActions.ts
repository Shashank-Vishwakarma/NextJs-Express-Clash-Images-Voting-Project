"use server";

import axios, { AxiosResponse } from "axios";

export async function loginAction(
    prevState: { message: string },
    formData: FormData
) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
        const response: AxiosResponse = await axios.post(
            `${process.env.EXPRESS_SERVER_URL}${process.env.EXPRESS_SERVER_LOGIN_ENDPOINT}`,
            {
                email,
                password,
            }
        );

        if (response.data?.error) {
            prevState.message = response.data?.error;
        } else {
            prevState.message = response.data?.message;
        }

        return response.data;
    } catch (error) {
        console.log("Error in signupAction: ", error);
        return { error: "Internal server error" };
    }
}

export async function signupAction(
    prevState: { message: string },
    formData: FormData
) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    try {
        const response: AxiosResponse = await axios.post(
            `${process.env.EXPRESS_SERVER_URL}${process.env.EXPRESS_SERVER_SIGNUP_ENDPOINT}`,
            {
                name,
                email,
                password,
                confirmPassword,
            }
        );

        if (response.data?.error) {
            prevState.message = response.data?.error;
        } else {
            prevState.message = response.data?.message;
        }

        return response.data;
    } catch (error) {
        console.log("Error in signupAction: ", error);
        return { error: "Internal server error" };
    }
}

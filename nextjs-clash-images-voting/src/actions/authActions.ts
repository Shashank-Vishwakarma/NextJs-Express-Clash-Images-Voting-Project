"use server";

import axios, { AxiosError, AxiosResponse } from "axios";

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
        console.log(
            "Error in loginAction: ",
            (error as AxiosError).response?.data?.error || error
        );
        return { error: (error as AxiosError).response?.data?.error };
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
        console.log(
            "Error in signupAction: ",
            (error as AxiosError).response?.data?.error || error
        );
        return { error: (error as AxiosError).response?.data?.error };
    }
}

export async function generateResetTokenAction(
    prevState: { message: string },
    formData: FormData
) {
    const email = formData.get("email") as string;

    try {
        const response: AxiosResponse = await axios.post(
            `${process.env.EXPRESS_SERVER_URL}${process.env.EXPRESS_SERVER_GENERATE_PASSWORD_RESET_TOKEN_ENDPOINT}`,
            {
                email,
            }
        );

        if (response.data?.error) {
            prevState.message = response.data?.error;
        } else {
            prevState.message = response.data?.message;
        }

        return response.data;
    } catch (error) {
        console.log(
            "Error in generateResetTokenAction: ",
            (error as AxiosError).response?.data?.error
        );
        return { error: (error as AxiosError).response?.data?.error };
    }
}

export async function resetPasswordAction(
    prevState: { message: string },
    formData: FormData
) {
    const resetToken = formData.get("resetToken") as string;
    const email = formData.get("email") as string;
    const newPassword = formData.get("newPassword") as string;
    const confirmNewPassword = formData.get("confirmNewPassword") as string;

    if (!resetToken || !email || !newPassword || !confirmNewPassword) {
        return {
            error: "All the fields are required",
        };
    }

    try {
        const response: AxiosResponse = await axios.post(
            `${process.env.EXPRESS_SERVER_URL}${process.env.EXPRESS_SERVER_RESET_PASSWORD_ENDPOINT}`,
            {
                resetToken,
                email,
                newPassword,
                confirmNewPassword,
            }
        );

        if (response.data?.error) {
            prevState.message = response.data?.error;
        } else {
            prevState.message = response.data?.message;
        }

        return response.data;
    } catch (error) {
        console.log(
            "Error in resetPasswordAction: ",
            (error as AxiosError).response?.data?.error
        );
        return { error: (error as AxiosError).response?.data?.error };
    }
}

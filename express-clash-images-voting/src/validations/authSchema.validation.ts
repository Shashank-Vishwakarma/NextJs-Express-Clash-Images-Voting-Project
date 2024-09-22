import { z } from "zod";

export const signUpSchemaValidation = z
    .object({
        name: z
            .string({ message: "Name is required" })
            .min(3, { message: "Name must be of atleast 3 characters" }),
        email: z
            .string({ message: "Email is required" })
            .email({ message: "Invalid email address" }),
        password: z
            .string({ message: "Password is required" })
            .min(6, { message: "Password should be atleast 6 characters" }),
        confirmPassword: z
            .string({ message: "Confirm Password is required" })
            .min(6, {
                message: "Confirm Password should be atleast 6 characters",
            }),
    })
    .superRefine(({ password, confirmPassword }, ctx) => {
        if (password !== confirmPassword) {
            ctx.addIssue({
                code: "custom",
                message: "Passwords do not match",
            });
            ctx.path.push("confirmPassword");
        }
    });

export const loginSchemaValidation = z.object({
    email: z
        .string({ message: "Email is required" })
        .email({ message: "Invalid email address" }),
    password: z.string({ message: "Password is required" }),
});

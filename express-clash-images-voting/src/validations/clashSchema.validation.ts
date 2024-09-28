import { z } from "zod";

export const clashSchemaValidation = z.object({
    title: z
        .string({ message: "Title is required" })
        .min(3, { message: "Title must be of atleast 3 characters" })
        .max(50, { message: "Title must be of atmost 50 characters" }),
    description: z
        .string({ message: "Description is required" })
        .min(3, { message: "Description must be of atleast 3 characters" })
        .max(1000, {
            message: "Description must be of atmost 1000 characters",
        }),
});

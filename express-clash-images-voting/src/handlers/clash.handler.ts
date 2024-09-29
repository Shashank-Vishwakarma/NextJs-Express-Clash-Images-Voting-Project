import { Response } from "express";
import { clashSchemaValidation } from "../validations/clashSchema.validation.js";
import prisma from "../database/prisma.js";
import moment from "moment";
import { UserRequestInterface } from "../middlewares/verifyToken.middleware.js";
import { validateImage } from "../utils/validateImage.js";
import { UploadedFile } from "express-fileupload";
import { removeImage } from "../utils/removeImage.js";
import { uploadImage } from "../utils/uploadImage.js";

class ClashHandler {
    static async createClash(
        request: UserRequestInterface,
        response: Response
    ) {
        try {
            const body = request.body;
            const payload = clashSchemaValidation.safeParse(body);
            if (payload.error) {
                return response.status(422).json({
                    error: payload.error.message,
                });
            }

            if (!body?.expires_at) {
                return response.status(404).json({
                    error: "Please provide an expiry date",
                });
            }

            if (!request.files || Object.keys(request.files).length === 0) {
                return response.status(400).json({
                    error: "Image is required",
                });
            }

            const image: UploadedFile = request.files.image as UploadedFile;
            const isImageValid = validateImage(image.size, image.mimetype);
            if (!isImageValid) {
                return response.status(422).json({
                    error: "Image size is too large. Max size is 5MB, or incorrect image type.",
                });
            }

            const fileName = uploadImage(image);

            // create clash
            await prisma.clash.create({
                data: {
                    title: payload.data.title,
                    description: payload.data.description,
                    image: `http://localhost:5000/uploads/${fileName}`,
                    expires_at: body.expires_at,
                    userId: request.user.id,
                },
            });

            return response.json({
                success: true,
                message: "Clash created successfully",
            });
        } catch (error) {
            console.log("Error in createClash: ", error.message);
            return response.status(500).json({
                error: "Internal server error",
            });
        }
    }

    static async getAllClash(
        request: UserRequestInterface,
        response: Response
    ) {
        try {
            const allClash = await prisma.clash.findMany({
                where: {
                    userId: request.user.id,
                },
            });
            return response.json(allClash);
        } catch (error) {
            console.log("Error in getAllClash: ", error.message);
            return response.status(500).json({
                error: "Internal server error",
            });
        }
    }

    static async getClashById(
        request: UserRequestInterface,
        response: Response
    ) {
        try {
            const { id } = request.params;
            const clash = await prisma.clash.findUnique({
                where: {
                    id,
                },
                include: {
                    comments: {
                        select: {
                            id: true,
                            title: true,
                            created_at: true,
                        },
                        orderBy: {
                            created_at: "desc",
                        },
                    },
                },
            });
            return response.json(clash);
        } catch (error) {
            console.log("Error in getClashById: ", error.message);
            return response.status(500).json({
                error: "Internal server error",
            });
        }
    }

    static async updateClash(
        request: UserRequestInterface,
        response: Response
    ) {
        try {
            const { id } = request.params;
            const clash = await prisma.clash.findUnique({
                where: {
                    id,
                },
                select: {
                    id: true,
                    image: true,
                    userId: true,
                    title: true,
                    description: true,
                },
            });
            if (!clash) {
                return response.status(404).json({
                    error: "Clash not found",
                });
            }

            // user authorized for access or not
            const isUserAuthorized = clash.userId === request.user.id;
            if (!isUserAuthorized) {
                return response.status(401).json({
                    error: "You are Unauthorized to update this Clash",
                });
            }

            const image: UploadedFile = request.files.image as UploadedFile;
            let imageUrl = "";
            if (image) {
                const isImageValid = validateImage(image.size, image.mimetype);
                if (!isImageValid) {
                    return response.status(422).json({
                        error: "Image size is too large. Max size is 5MB, or incorrect image type.",
                    });
                }

                // delete the old image
                const oldFileName = clash.image.split("/")[-1];
                removeImage(oldFileName);

                const fileName = uploadImage(image);
                imageUrl = `http://localhost:5000/uploads/${fileName}`;
            }

            await prisma.clash.update({
                data: {
                    image: imageUrl || clash.image,
                    title: request.body.title || clash.title,
                    description: request.body.description || clash.description,
                },
                where: {
                    id: clash.id,
                },
            });

            return response.json({
                success: true,
                message: "Clash updated successfully",
            });
        } catch (error) {
            console.log("Error in updateClash: ", error.message);
            return response.status(500).json({
                error: "Internal server error",
            });
        }
    }

    static async deleteClash(
        request: UserRequestInterface,
        response: Response
    ) {
        try {
            const { id } = request.params;
            const clash = await prisma.clash.findUnique({
                where: {
                    id,
                },
                select: {
                    id: true,
                    userId: true,
                },
            });
            if (!clash) {
                return response.status(404).json({
                    error: "Clash not found",
                });
            }

            // user authorized for access or not
            const isUserAuthorized = clash.userId === request.user.id;
            if (!isUserAuthorized) {
                return response.status(401).json({
                    error: "You are Unauthorized to delete this Clash",
                });
            }

            await prisma.clash.delete({
                where: {
                    id: id,
                },
            });

            return response.json({
                success: true,
                message: "Clash deleted successfully",
            });
        } catch (error) {
            console.log("Error in updateClash: ", error.message);
            return response.status(500).json({
                error: "Internal server error",
            });
        }
    }
}

export default ClashHandler;

import { UploadedFile } from "express-fileupload";
import { createFileName } from "./createFileName.js";

export function uploadImage(image: UploadedFile) {
    const fileName = createFileName(image.name);
    const uploadPath = process.cwd() + "/public/uploads/" + fileName;

    console.log(uploadPath);

    image.mv(uploadPath, (error) => {
        console.log("Error in image upload: ", error);
        // throw error;
    });

    return fileName;
}

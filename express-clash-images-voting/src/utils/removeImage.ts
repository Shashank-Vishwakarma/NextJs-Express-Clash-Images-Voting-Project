import fs from "fs";

export function removeImage(filename: string) {
    const imagePath = process.cwd() + "/public/uploads/" + filename;
    if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
    }
}

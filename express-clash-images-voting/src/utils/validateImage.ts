const supportedMimetypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/webp",
];

export function validateImage(size: number, mimetype: string) {
    if (!supportedMimetypes.includes(mimetype)) return false;
    return size < 5 * 1024 * 1024;
}

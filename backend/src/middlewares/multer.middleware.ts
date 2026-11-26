
import multer from "multer";
import path from "path";
import fs from "fs";
import { randomUUID } from "crypto";

const createUpload = (folder: "profile" | "transaction") => {
    return multer({
        storage: multer.diskStorage({
            destination(req, file, callback) {
                const uploadPath = path.resolve(
                    process.cwd(),
                    "uploads",
                    folder
                );

                if (!fs.existsSync(uploadPath)) {
                    fs.mkdirSync(uploadPath, {
                        recursive: true,
                    });
                }

                callback(null, uploadPath);
            },

            filename(req, file, callback) {
                const ext = path.extname(file.originalname).toLowerCase();
                callback(null, `${randomUUID()}${ext}`);
            },
        }),

        fileFilter(req, file, callback) {
            const allowedTypes = [
                "image/jpeg",
                "image/png",
                "image/webp",
                "image/avif",
            ];

            const allowedExtensions = [
                ".jpg",
                ".jpeg",
                ".png",
                ".webp",
                ".avif",
            ];

            const isAllowed =
                allowedTypes.includes(file.mimetype) &&
                allowedExtensions.includes(
                    path.extname(file.originalname).toLowerCase()
                );

            if (!isAllowed) {
                return callback(
                    new Error("Only JPG, PNG, WebP, and AVIF  images are allowed.")
                );
            }

            callback(null, true);
        },

        limits: {
            fileSize:
                folder === "profile"
                    ? 2 * 1024 * 1024
                    : 5 * 1024 * 1024,
        },
    });
};

export const uploadProfile = createUpload("profile");
export const uploadTransaction = createUpload("transaction");

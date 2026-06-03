import multer from "multer";
import path from "path";
import fs from "fs";

const createUpload = (folder: "profile" | "transaction") => {
  return multer({
    storage: multer.diskStorage({
      destination(req, file, callback) {
        const uploadPath = `uploads/${folder}/`;

        if (!fs.existsSync(uploadPath)) {
          fs.mkdirSync(uploadPath, {
            recursive: true,
          });
        }

        callback(null, uploadPath);
      },

      filename(req, file, callback) {
        const ext = path.extname(file.originalname);
        const uniqueName =
          Date.now() + "-" + Math.round(Math.random() * 1e9) + ext;

        callback(null, uniqueName);
      },
    }),

    fileFilter(req, file, callback) {
      const allowedTypes = /jpeg|jpg|png|webp/;
      const isAllowed = allowedTypes.test(
        path.extname(file.originalname).toLowerCase()
      );

      if (isAllowed) {
        callback(null, true);
      } else {
        callback({
          message: "Image format not supported",
          name: "Invalid file format",
        } as any);
      }
    },

    limits: {
      fileSize: 5 * 1024 * 1024,
    },
  });
};

export const uploadProfile = createUpload("profile");
export const uploadTransaction = createUpload("transaction");
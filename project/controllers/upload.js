const fs = require("fs");
const path = require("path");
const successResponse = require("../lib/responses/success");
const errorResponse = require("../lib/responses/error");

module.exports = {
    upload: (req, res) => {
        try {
            const allowedTypes = ["image/jpeg", "image/gif", "image/png"];
            const maxFileSize = 5 * 1024 * 1024; // 5 MB

            // da go zememe file-ot od request-ot
            const file = req.files.image;

            if (!allowedTypes.includes(file.mimetype)) {
                return errorResponse(
                    res,
                    400,
                    new Error("Bad request. File type is not allowed.")
                );
            }

            if (file.size > maxFileSize) {
                return errorResponse(
                    res,
                    400,
                    new Error(
                        "Bad request. File size exceeds the allowed limit."
                    )
                );
            }

            const uploadDirectory = path.join(
                __dirname,
                "..",
                "uploads",
                req.user.email
            );
            const uploadsRootDirectory = path.join(__dirname, "..", "uploads");

            if (!fs.existsSync(uploadsRootDirectory)) {
                fs.mkdirSync(uploadsRootDirectory);
            }

            if (!fs.existsSync(uploadDirectory)) {
                fs.mkdirSync(uploadDirectory);
            }

            const fileName = `${req.user.id}_${file.name}`;
            file.mv(`${uploadDirectory}/${fileName}`);

            successResponse(
                res,
                `File with name ${fileName} with size ${file.size} is uploaded successfully`
            );
        } catch (error) {
            errorResponse(res, 400, error);
        }
    },
    fetch: (req, res) => {
        try {
            const uploadDirectory = path.join(
                __dirname,
                "..",
                "uploads",
                req.user.email
            );
            const file = `${uploadDirectory}/${req.params.filename}`;
            res.download(file);
        } catch (error) {
            errorResponse(res, 400, error);
        }
    },
    delete: (req, res) => {
        try {
            const uploadDirectory = path.join(
                __dirname,
                "..",
                "uploads",
                req.user.email
            );
            const file = `${uploadDirectory}/${req.params.filename}`;
            fs.unlinkSync(file);
            successResponse(
                res,
                `File with name ${req.params.filename} is deleted successfully`
            );
        } catch (error) {
            errorResponse(res, 400, error);
        }
    },
};

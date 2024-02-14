import path from "node:path";
import crypto from "node:crypto";
import multer, { StorageEngine } from "multer";

// Make it easier to know what is inside the object
type UploadConfig = {
   directory: string;
   storage: StorageEngine;
};

// Resolve the upload folder path
const uploadFolder = path.resolve(__dirname, "..", "..", "uploads");

// Export the upload configuration object
export default {
   // Specify the directory for uploads
   directory: uploadFolder,
   // Specify the storage engine using multer.diskStorage
   storage: multer.diskStorage({
      // Specify the destination where files will be saved
      destination: uploadFolder,
      // Define the filename for each uploaded file
      filename(req, file, callback) {
         // Generate a file hash using crypto.randomBytes
         const fileHash = crypto.randomBytes(10).toString("hex");
         // Create a filename by combining the hash and the original filename
         const fileName = `${fileHash}_ ${file.originalname}`;
         // Call the callback with null as the error parameter and the generated filename
         callback(null, fileName);
      },
   }),
} as UploadConfig;

import multer from 'multer';
//beacuse we are storing image in cloudinary so we can use memory storage
const storage = multer.memoryStorage();
const upload=multer({storage}).single("file");
export default upload;

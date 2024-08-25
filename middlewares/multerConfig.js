import multer from 'multer';
import fs from 'fs';

// Multer Configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = 'uploads/';
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // prefixing the filename with the date to avoid conflicts
  },
});

const upload = multer({ storage });

export default upload;

import multer from 'multer';
import path from 'path';

// Define storage location
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
});

const uploadPhoto = multer({ storage: storage });
export default uploadPhoto


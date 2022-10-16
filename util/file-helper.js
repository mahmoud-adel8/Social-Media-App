import multer from 'multer';
import * as dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

export function upload() {
  const fileStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './images');
    },
    filename: function (req, file, cb) {
      const date = Date.now();
      const fileName = date + '-' + file.originalname;
      cb(null, fileName);
    },
  });
  const fileFilter = (req, file, cb) => {
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  return multer({ storage: fileStorage, fileFilter: fileFilter });
}

export function imagePathToUrl(imagePath) {
  return process.env.DOMAIN + imagePath;
}

export function imageUrlToPath(imageUrl) {
  return imageUrl.substring(process.env.DOMAIN.length);
}

export function clearImage(imagePath) {
  const imagePathAbs = path.join(__dirname, '..', imagePath);
  fs.unlink(imagePathAbs, err => {
    if (err) {
      throw err;
    }
  });
}

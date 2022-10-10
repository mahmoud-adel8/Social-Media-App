import multer from 'multer';

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

const fileUpload = multer({ storage: fileStorage, fileFilter: fileFilter });

export { fileUpload as upload };

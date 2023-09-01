import multer from 'multer';

const storage = multer.diskStorage({
   filename(req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`);
   },
   destination(req, file, cb) {
      let folder = '';
      if (file.originalname.includes('profile') || file.mimetype.startsWith('image')) {
         folder = 'profiles';
      } else if (file.mimetype === 'application/pdf') {
         folder = 'documents';
      } else if (file.originalname.includes('product') || file.mimetype.startsWith('image')) {
         folder = 'products';
      }
      cb(null, `${__dirname}/public/uploads`);
   }
});

const upload = multer({
   storage
});

export default upload;
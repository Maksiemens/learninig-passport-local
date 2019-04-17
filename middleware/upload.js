const multer = require('multer');
const moment = require('moment');

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, 'uploads/');
  },
  filename(req, file, callback) {
    const date = moment().format('DDMMYYYY-HHmmss_SSS');
    callback(null, `${date}-${file.originalname}`);
  }
});

const fileFilter = (req, file, callback) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

const limits = { fileSize: 1024 * 1024 * 5 };

module.exports = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: limits
});



//
// export const uploadImage = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
//  ) => {
//   try {
//    if (!req.file) throw { error: 'File Not Upload' };

//    if (req.file.mimetype === 'image/webp') {
//     // TODO: Исключение под WEBP, надо сделать по уму
//     const new_image: any = {
//      mimetype: req.file.mimetype,
//      destination: destination,
//      filename: req.file.filename,
//      author: req.user ? req.user._id : undefined,
//      sizes: []
//     };

//     new_image.sizes.push({
//      size: 'original',
//      path: ${destination}/${req.file.filename}
//     });

//     const save_image = await Image.create(new_image);

//     return res.json({
//      success: true,
//      response: save_image
//     });
//    }

//    const file = await jimp.read(req.file.path);

//    const c_size =
//     file.bitmap.width > file.bitmap.height
//      ? file.bitmap.height
//      : file.bitmap.width;
//    const h_center =
//     file.bitmap.width - c_size > 0
//      ? Math.round((file.bitmap.width - c_size) / 2)
//      : 0;
//    const v_center =
//     file.bitmap.height - c_size > 0
//      ? Math.round((file.bitmap.height - c_size) / 2)
//      : 0;

//    let image = file.quality(65);

//    const new_image: any = {
//     mimetype: req.file.mimetype,
//     destination: destination,
//     filename: req.file.filename,
//     author: req.user ? req.user._id : undefined,
//     sizes: []
//    };

//    new_image.sizes.push({
//     size: 'original',
//     path: ${destination}/original_${req.file.filename},
//     width: image.bitmap.width,
//     height: image.bitmap.height
//    });

//    image.write(path.resolve(`${destination}/original_${req.file.filename}`));

//    image = image.crop(h_center, v_center, c_size, c_size);

//    const sizes = [
//     {
//      w: 1000,
//      h: 1000
//     },
//     {
//      w: 500,
//      h: 500
//     },
//     {
//      w: 100,
//      h: 100
//     }
//    ];

//    sizes.forEach(async (size) => {
//     if (size.w > image.bitmap.width) return false;

//     const img_path = `${destination}/${size.w}x${size.h}_${
//      req.file.filename
//     }`;

//     new_image.sizes.push({
//      size: ${size.w}x${size.h},
//      path: img_path,
//      width: size.w,
//      height: size.h
//     });

//     image.resize(size.w, size.h).write(path.resolve(img_path));
//    });

//    const save_image = await Image.create(new_image);

//    res.json({
//     success: true,
//     response: save_image
//    });
//   } catch (err) {
//    next(err);
//   }
//  };

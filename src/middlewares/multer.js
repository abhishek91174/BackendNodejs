const multer=require("multer");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../../public/temp'); // Set the destination folder for the uploaded files
    },
    filename: function (req, file, cb) {
      
      cb(null, file.originalname);
    }
  });

  const upload=multer({storage:storage});
  module.exports={upload};


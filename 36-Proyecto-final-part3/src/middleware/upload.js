const multer = require('multer');
path = require('path');

const storage = multer.diskStorage({
    //destination for files
    
    destination: function (request, file, callback) {
      console.log('soy el')
      callback(null, path.join('public/'));
    }, 
    //add back the extension
    filename: function (request, file, callback) {
      callback(null,'avatar.png');
    },    
  });
  
  //upload parameters for multer
  const upload = multer({
    storage: storage,
    limits: {
      fieldSize: 1024 * 1024 * 3,
    },
  });

module.exports =upload;
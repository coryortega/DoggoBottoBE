const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

aws.config.update({
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    accessKeyId: process.env.ACCESS_KEY_ID,
    region: 'us-west-1'
});

const s3 = new aws.S3();

function afterUpload(req, res, next) {
  console.log('Uploade Successful');
}
 
const upload = multer({
  storage: multerS3({
    s3: s3,
    // ContentType: multerS3.AUTO_CONTENT_TYPE,
    ContentType: 'image/jpeg',
    acl: 'public-read',
    bucket: 'doggobotto',
    metadata: function (req, file, cb) {
      cb(null, {filename: 'TESTING_META_DATA'});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString()+'.jpg')
    }
  })
})

module.exports = upload;
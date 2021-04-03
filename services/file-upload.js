const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-sharp-s3");

aws.config.update({
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  accessKeyId: process.env.ACCESS_KEY_ID,
  region: "us-west-1",
});

const s3 = new aws.S3();

function afterUpload(req, res, next) {
  console.log("Uploade Successful");
}

const upload = multer({
  storage: multerS3({
    s3: s3,
    ACL: "public-read",
    Bucket: process.env.AWS_BUCKET,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    Key: (req, file, cb) => {
      cb(null, Date.now().toString() + ".jpg");
    },
    toFormat: {
      type: "jpeg",
      options: {
        progressive: true,
        quality: 80,
      },
    },
  }),
});

module.exports = upload;
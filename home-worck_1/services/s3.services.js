const AWS_S3 = require('aws-sdk/clients/s3');
const { v4 } = require('uuid');
const path = require('path');

const { S3_ACCESS_KEY, S3_SECRET_KEY, S3_REGION, S3_BUCKET } = require('../config/config');

const s3 = new AWS_S3({
  accessKeyId: S3_ACCESS_KEY,
  secretAccessKey: S3_SECRET_KEY,
  signatureVersion: 'v4',
  region: S3_REGION
});

const ulpoudFile = async (fileToUpload, itemType, itemId) => {
  const Key = buildFilePath(itemType, itemId, fileToUpload.name);

  const uploadParams = {
    Bucket: S3_BUCKET,
    Body: fileToUpload.data,
    // ACL: 'public-read',
    Key
  }

  const uploadData = await s3.upload(uploadParams).promise();

  return uploadData.Location;
};

function buildFilePath(itemType, itemId, fileName = '') {
  const extension = fileName.split('.').pop();

  return path.normalize(`${itemType}/${itemId}/${v4()}.${extension}`);
}

module.exports = {
  ulpoudFile
}
// Err: This XML file does not appear to have any style information associated with it

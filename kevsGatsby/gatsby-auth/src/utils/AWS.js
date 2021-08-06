import AWS from 'aws-sdk';
import { BUCKET_NAME, REGION_NAME, ACCESS_KEY, SECRET_KEY } from "/home/pat/Desktop/kevs_pic_app/kevs_pic_app/kevsGatsby/gatsby-auth/env/development.js"

const S3_BUCKET =BUCKET_NAME;
const REGION = REGION_NAME;

AWS.config.update({
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_KEY,
})

const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET},
    region: REGION,
})

const takePause = (setProgress) => {
    const pause = setTimeout(() => {
        setProgress(0)
      }, 2000);
    return () => clearTimeout(pause);
}

export const sendToS3 = async (name, fileType, resizedFile, setProgress) => {
    const params = {
        ACL: 'public-read',
        Body: resizedFile,
        Bucket: S3_BUCKET,
        Key: `${name}.${fileType}`
    };
    myBucket.putObject(params)
        .on('httpUploadProgress', (evt) => {
            setProgress(Math.round((evt.loaded / evt.total) * 100));
            if (evt.loaded === evt.total) {
                takePause(setProgress)
                return true;
            }
        })
        .send((err) => {
            if (err) {
                console.log(err);
                return false;
            }
        })
    
}

export const deleteFromS3 = async (picName) => {
    console.log('s3 pic', picName)
    var params = {
        Bucket: S3_BUCKET,
        Key: picName
        /* 
           where value for 'Key' equals 'pathName1/pathName2/.../pathNameN/fileName.ext'
           - full path name to your file without '/' at the beginning
        */
    };
      
    let success = await myBucket.deleteObject(params, function (err, data) {
        if (err) {
            console.log(err);
            return false
        }
        else {
            console.log(data);
            return true;
        }
    }).promise();
    return success
}

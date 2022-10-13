const AWS = require('aws-sdk');
const S3 = new AWS.S3();

exports.handler = async (event) => {

    let bucketName = event.Records[0].s3.bucket.name;
    let jsonKey = 'dsfreyImageMetadata.json';
    
    let key = event.Records[0].s3.object.key;
    let fileExtension = key.split('.').slice(-1)[0];
    let fileSize = event.Records[0].s3.object.size;
    
    let parsedMetadata = []
    try{
        let jsonIndex = await S3.getObject({Bucket: bucketName, Key: jsonKey}).promise();
        let metadataString = jsonIndex.Body.toString();
        parsedMetadata = JSON.parse(metadataString);
    } catch (error) {
        console.log(error);
    }
    let constructedMetadata = {
        name: key,
        metadata: {
            fileExtension,
            fileSize
        }
    };
    
    let imageIndex = -1
    try {
        imageIndex = parsedMetadata.findIndex((element) => element.name === constructedMetadata.name);
    } catch (error) {
        console.log(error);
    }
    
    if (imageIndex === -1) {
        parsedMetadata.push(constructedMetadata);
    } else {
        parsedMetadata[imageIndex] = constructedMetadata;
    }
    console.log(parsedMetadata);
    await S3.putObject({
        Bucket: bucketName,
        Key: jsonKey,
        Body: Buffer.from(JSON.stringify(parsedMetadata))
    }).promise();

    const response = {
        statusCode: 200,
        body: JSON.stringify(parsedMetadata),
    };
    return response;
};

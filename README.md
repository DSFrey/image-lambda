# image-lambda

A simple function using AWS Lambda and integrating it with S3. When a file is added to the `images/` folder in the S# bucket, it pulls the `dsfreyImageMetadata.json` file from the same bucket and adds or updates the array of metadata objects before sending the updated file back to the bucket.

## Links

[`dsfreyImageMetadata.json` in the S3 bucket](https://dsfrey-images-lab.s3.us-east-2.amazonaws.com/dsfreyImageMetadata.json)

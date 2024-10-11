async function S3UploadFile(
    s3Client,
    buffer,
    bucketName,
    key
) {
    try {
        const uploadParams = {
            Bucket: bucketName,
            Key: key,
            Body: buffer,
            ContentType: 'application/octet-stream'
        };

        const command = new PutObjectCommand(uploadParams);
        const response = await s3Client.send(command);

        console.log('File uploaded successfully:', response);
        return `https://${bucketName}.s3.sa-east-1.amazonaws.com/${encodeURIComponent(key)}`;
    } catch (error) {
        console.error('Error uploading file:', error);
    }
}
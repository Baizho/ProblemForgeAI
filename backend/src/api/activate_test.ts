import { spawn, SpawnOptionsWithoutStdio } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import * as AWS from 'aws-sdk';

// Configure AWS SDK
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();
const bucketName = process.env.S3_BUCKET_NAME;
const scriptPath = path.join(process.cwd(), '/src/api/generate_test.py');
const outputDirectory = path.join(process.cwd());

async function uploadFile(fileName: string) {
    const filePath = path.join(outputDirectory, fileName);

    // Read file content
    const fileContent = fs.readFileSync(filePath);
    if(!bucketName) {
        return "invalid bucket name";
    }
    // Set up S3 upload parameters
    const params = {
        Bucket: bucketName,
        Key: fileName,
        Body: fileContent
    };

    // Upload file to S3
    try {
        await s3.upload(params).promise();
        console.log(`File uploaded successfully: ${fileName}`);

        // Delete the file from local server after upload
        fs.unlinkSync(filePath);
        console.log(`File deleted successfully: ${fileName}`);
    } catch (error) {
        console.error(`Error uploading file: ${fileName}`, error);
    }
}

async function uploadFiles() {
    for (const fileName of fileNames) {
        await uploadFile(fileName);
    }
}

uploadFiles().catch(console.error);


export default async function activate_test(number: string) {
    try {
        // Promisify the spawn function
        const spawnPromise = (command: string, args: string[]) =>
            new Promise((resolve, reject) => {
                const process = spawn(command, args);

                let stdout = '';
                let stderr = '';

                process.stdout.on('data', (data) => {
                    stdout += data.toString();
                });

                process.stderr.on('data', (data) => {
                    stderr += data.toString();
                });

                process.on('close', (code) => {
                    if (code !== 0) {
                        reject(stderr);
                    } else {
                        resolve(stdout);
                    }
                });
            });

        // Run the Python script
        const file_names = await spawnPromise('python', [scriptPath, number]);

        // Return the result and the generated files
        return { result: file_names};
        // return NextResponse.json({message: "it worked!", res: stdout});

    } catch (error: any) {
        // Handle any errors that occur
        return { error: error };
    }
}

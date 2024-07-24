import { spawn, SpawnOptionsWithoutStdio } from 'child_process';
import * as fs from 'fs';
import * as pfs from 'fs/promises';
import * as path from 'path';
import GeminiService from '../gemini/gemini-service';
import { PythonShell } from 'python-shell';
import { v4 as uuid4 } from "uuid";

const geminiService = new GeminiService;

// // Configure AWS SDK
// AWS.config.update({
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//     region: process.env.AWS_REGION,
// });

// const s3 = new AWS.S3();
// const bucketName = process.env.S3_BUCKET_NAME;
// const outputDirectory = path.join(process.cwd());

// async function uploadFile(fileName: string): Promise<string> {
//     // console.log(fileName);
//     const filePath = outputDirectory + "/" + fileName;

//     // Read file content
//     const fileContent = fs.readFileSync(filePath);
//     if (!bucketName) {
//         return "invalid bucket name";
//     }
//     // Set up S3 upload parameters
//     const params = {
//         Bucket: bucketName,
//         Key: fileName,
//         Body: fileContent
//     };

//     // Upload file to S3
//     try {
//         const data = await s3.upload(params).promise();
//         // console.log(`File uploaded successfully: ${fileName}`);

//         // Delete the file from local server after upload
//         fs.unlinkSync(filePath);
//         // console.log(`File deleted successfully: ${fileName}`);
//         return data.Key;
//     } catch (error) {
//         console.error(`Error uploading file: ${fileName}`, error);
//         return "";
//     }
// }

// interface fileProp {
//     content: string,
// }

// async function uploadFiles(fileNames: string[]) {
//     const file_links: string[] = [];
//     for await (const fileName of fileNames) {
//         const filePath = outputDirectory + "/" + fileName;
//         const fileContent = (await pfs.readFile(filePath)).toString();
//         fs.unlinkSync(filePath);
//         // const key = await uploadFile(fileName);
//         // console.log(link);
//         file_links.push(fileContent);
//     }
//     return file_links;
// }


// async function getFileFromS3(key: string): Promise<string> {
//     if (!bucketName || !key) return "";
//     const params = {
//         Bucket: bucketName,
//         Key: key
//     };


//     try {
//         const data = await s3.getObject(params).promise();
//         if (data.Body) {
//             return data.Body.toString('utf-8');
//         } else {
//             throw new Error('File has no content');
//         }
//     } catch (error) {
//         console.error('Error retrieving file from S3', error);
//         throw error;
//     }
// }

// Usage example
// (async () => {
//     try {
//         const fileContent = await getFileFromS3(bucketName, fileName);
//         console.log('File content:', fileContent);

//         // Optional: Save the content to a local file
//         fs.writeFileSync('downloaded-file.txt', fileContent);
//         console.log('File saved locally as downloaded-file.txt');
//     } catch (error) {
//         console.error('Error:', error);
//     }
// })();

//this is a change

async function activate_test(number: string, input: string, output: string, testInput: string, testOutput: string) {
    // The new code to be written into generate_test.py
    const generate_code = await geminiService.generateTestGenerater(input, output, testInput, testOutput);
    // console.log(generate_code);

    const res = await PythonShell.runString(generate_code, { args: [number.toString()] });
    // console.log(res[0]);
    // return [generate_code];
    const tests = JSON.parse(res[0].replace(/'/g, '"'))
    // console.log(tests);
    return tests;
}

export { activate_test };
import fs from 'fs'
import path from 'path';

import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import uploadConfig from '@config/upload';
import IStorageProvider from "../models/IStorageProvider";

class S3StorageProvider implements IStorageProvider {
  private client: S3Client

  constructor () {
    this.client = new S3Client({
      region: 'us-east-1',
    });
  }

  public async saveFile(file: string): Promise<string> {
    const originalPath = path.resolve(uploadConfig.tmpFolder, file)

    const mime = await import('mime')

    const ContentType = mime.default.getType(originalPath)

    if(!ContentType) {
      throw new Error('File not found')
    }

    const fileContent = await fs.promises.readFile(originalPath)

    const command = new PutObjectCommand({
      Bucket: uploadConfig.config.aws.bucket,
      Key: file,
      ACL: 'public-read',
      Body: fileContent,
      ContentType,
    })

    await this.client.send(command);

    await fs.promises.unlink(originalPath)

    return file
  }

  public async deleteFile(file: string): Promise<void> {
    const command = new DeleteObjectCommand({
      Bucket: uploadConfig.config.aws.bucket,
      Key: file,
    })

    await this.client.send(command);
  }
}

export default S3StorageProvider

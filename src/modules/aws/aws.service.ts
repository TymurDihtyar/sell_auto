import * as path from 'node:path';

import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AWSConfig, ConfigType } from '../../configs/config.type';
import { EFileType } from './enums/file-type.enum';

@Injectable()
export class AwsService {
  private readonly awsConfig: AWSConfig;
  private readonly s3Client: S3Client;

  constructor(private readonly configService: ConfigService<ConfigType>) {
    this.awsConfig = this.configService.get<AWSConfig>('aws');
    this.s3Client = new S3Client({
      forcePathStyle: true,
      endpoint: this.awsConfig.awsS3Endpoint,
      region: this.awsConfig.awsS3Region,
      credentials: {
        accessKeyId: this.awsConfig.awsAccessKeyId,
        secretAccessKey: this.awsConfig.awsSecretAccessKey,
      },
    });
  }

  public async uploadFile(
    file: Express.Multer.File,
    itemId: string,
    itemType: EFileType,
  ): Promise<string> {
    const pathFile = this.buildPath(file.originalname, itemId, itemType);

    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: this.awsConfig.awsS3BucketName,
        Key: pathFile,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: 'public-read',
      }) as any,
    );
    return pathFile;
  }

  public async uploadFiles(
    files: Express.Multer.File[],
    itemId: string,
    itemType: EFileType,
  ): Promise<string[]> {
    const uploadedFilePaths: string[] = [];
    for (const file of files) {
      const pathFile = this.buildPath(file.originalname, itemId, itemType);
      await this.s3Client.send(
        new PutObjectCommand({
          Bucket: this.awsConfig.awsS3BucketName,
          Key: pathFile,
          Body: file.buffer,
          ContentType: file.mimetype,
          ACL: 'public-read',
        }) as any,
      );
      uploadedFilePaths.push(pathFile);
    }

    return uploadedFilePaths;
  }

  public async deleteFile(pathFile: string): Promise<void> {
    await this.s3Client.send(
      new DeleteObjectCommand({
        Bucket: this.awsConfig.awsS3BucketName,
        Key: pathFile,
      }) as any,
    );
  }

  private buildPath(
    fileName: string,
    itemId: string,
    itemType: string,
  ): string {
    return `${itemType}/${itemId}/${crypto.randomUUID()}${path.extname(fileName)}`;
  }
}

import { Module } from '@nestjs/common';

import { AwsModule } from '../aws/aws.module';
import { UserService } from './services/user.service';
import { UserController } from './user.controller';

@Module({
  imports: [AwsModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}

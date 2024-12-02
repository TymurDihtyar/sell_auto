import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../users/user.module';
import { AdminController } from './admin.controller';
import { AdminService } from './service/admin.service';

@Module({
  imports: [UserModule, AuthModule],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [],
})
export class AdminModule {}

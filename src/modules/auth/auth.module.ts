import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';

import { UserModule } from '../users/user.module';
import { AuthController } from './auth.controller';
import { JwtAccessGuard } from './guards/jwt-access.guard';
import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';

@Module({
  imports: [UserModule, JwtModule],
  controllers: [AuthController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAccessGuard,
    },
    AuthService,
    TokenService,
  ],
  exports: [AuthService],
})
export class AuthModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import configuration from '../configs/config';
import { AuthModule } from './auth/auth.module';
import { HealthModule } from './health/health.module';
import { UserModule } from './users/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    UserModule,
    HealthModule,
    AuthModule,
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import configuration from '../configs/config';
import { AuthModule } from './auth/auth.module';
import { AwsModule } from './aws/aws.module';
import { BrandModule } from './brand/brand.module';
import { HealthModule } from './health/health.module';
import { ListingModule } from './listings/listing.module';
import { ModelsModule } from './models/models.module';
import { PostgresModule } from './postgres/postgres.module';
import { RepositoryModule } from './repository/repository.module';
import { UserModule } from './users/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    HealthModule,
    AuthModule,
    UserModule,
    ListingModule,
    BrandModule,
    ModelsModule,
    PostgresModule,
    RepositoryModule,
    AwsModule,
  ],
})
export class AppModule {}

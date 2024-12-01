import { Module } from '@nestjs/common';

import { AwsService } from '../aws/aws.service';
import { UserModule } from '../users/user.module';
import { ListingController } from './listing.controller';
import { ListingsService } from './services/listings.service';

@Module({
  imports: [UserModule],
  controllers: [ListingController],
  providers: [ListingsService, AwsService],
})
export class ListingModule {}

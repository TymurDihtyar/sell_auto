import { Module } from '@nestjs/common';

import { HealthController } from './healt.controller';

@Module({
  controllers: [HealthController],
  providers: [],
})
export class HealthModule {}

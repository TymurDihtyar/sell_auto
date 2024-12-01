import { Global, Module } from '@nestjs/common';

import { BrandRepository } from './services/brand.repository';
import { CurrencyRepository } from './services/currency.repository';
import { ImagesRepository } from './services/images.repository';
import { ListingsRepository } from './services/listins.repository';
import { ModelRepository } from './services/model.repository';
import { UserRepository } from './services/user.repository';

const repositories = [
  UserRepository,
  BrandRepository,
  ImagesRepository,
  ModelRepository,
  ListingsRepository,
  CurrencyRepository,
];
@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [...repositories],
  exports: [...repositories],
})
export class RepositoryModule {}

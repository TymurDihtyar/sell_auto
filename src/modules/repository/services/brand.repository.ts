import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { BrandsEntity } from '../../../database/entities/brands.entity';

@Injectable()
export class BrandRepository extends Repository<BrandsEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(BrandsEntity, dataSource.manager);
  }
}

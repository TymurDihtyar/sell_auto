import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { ModelsEntity } from '../../../database/entities/models.entity';

@Injectable()
export class ModelRepository extends Repository<ModelsEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(ModelsEntity, dataSource.manager);
  }
}

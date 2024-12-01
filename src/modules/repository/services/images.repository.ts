import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { ListingImagesEntity } from '../../../database/entities/listing_images.entity';

@Injectable()
export class ImagesRepository extends Repository<ListingImagesEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(ListingImagesEntity, dataSource.manager);
  }
}

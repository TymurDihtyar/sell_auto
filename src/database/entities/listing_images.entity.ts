import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { ListingsEntity } from './listings.entity';
import { BaseEntity } from './models/base.entity';

@Entity('listing_images')
export class ListingImagesEntity extends BaseEntity {
  @Column({ type: 'text' })
  image_url: string;

  @Column()
  listings_id: string;
  @ManyToOne(() => ListingsEntity, (entity) => entity.image_url)
  @JoinColumn({ name: 'listings_id' })
  listings?: ListingsEntity;
}

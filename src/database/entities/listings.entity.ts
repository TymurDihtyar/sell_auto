import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { ECurrency } from '../../modules/listings/enums/currency.enum';
import { EStatus } from '../../modules/listings/enums/status.enum';
import { ListingImagesEntity } from './listing_images.entity';
import { ListingsViewEntity } from './listing_views.entity';
import { BaseEntity } from './models/base.entity';
import { RegionEntity } from './region.entity';
import { UserEntity } from './user.entity';

@Entity('listings')
export class ListingsEntity extends BaseEntity {
  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'text' })
  brand: string;

  @Column({ type: 'text' })
  model: string;

  @Column({ type: 'int' })
  year: number;

  @Column({ type: 'enum', enum: EStatus, default: EStatus.INACTIVE })
  status: EStatus;

  @Column({ type: 'enum', enum: ECurrency, default: ECurrency.UAH })
  currency: ECurrency;

  @Column()
  user_id: string;
  @ManyToOne(() => UserEntity, (entity) => entity.listings)
  @JoinColumn({ name: 'user_id' })
  user?: UserEntity;

  @OneToMany(() => ListingsViewEntity, (entity) => entity.listings)
  views_count?: ListingsViewEntity[];

  @OneToMany(() => ListingImagesEntity, (entity) => entity.listings)
  image_url?: ListingImagesEntity[];

  @Column()
  region_id: string;
  @ManyToOne(() => RegionEntity, (entity) => entity.listings)
  @JoinColumn({ name: 'region_id' })
  region?: RegionEntity;
}

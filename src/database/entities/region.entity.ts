import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { ERegion } from '../../modules/listings/enums/region.enum';
import { ListingsEntity } from './listings.entity';

@Entity('regions')
export class RegionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: ERegion, default: ERegion.CENTRAL })
  name: ERegion;

  @OneToMany(() => ListingsEntity, (entity) => entity.region)
  listings?: ListingsEntity[];
}

import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { BrandsEntity } from './brands.entity';

@Entity('models')
export class ModelsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: true })
  name?: string;

  @Column()
  brand_id: string;
  @ManyToOne(() => BrandsEntity, (entity) => entity.models)
  @JoinColumn({ name: 'brand_id' })
  brands?: BrandsEntity;
}

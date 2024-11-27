import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ListingsEntity } from './listings.entity';

@Entity('listing_views')
export class ListingsViewEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  view_date: Date;

  @Column()
  listings_id: string;
  @ManyToOne(() => ListingsEntity, (entity) => entity.views_count)
  @JoinColumn({ name: 'listings_id' })
  listings?: ListingsEntity;
}

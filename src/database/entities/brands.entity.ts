import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { ModelsEntity } from './models.entity';

@Entity('brands')
export class BrandsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: true })
  name: string;

  @OneToMany(() => ModelsEntity, (entity) => entity.brands)
  models?: ModelsEntity[];
}

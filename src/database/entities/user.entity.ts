import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { AccountTypesEntity } from './account_types.entity';
import { ListingsEntity } from './listings.entity';
import { BaseEntity } from './models/base.entity';
import { RolesEntity } from './roles.entity';

@Entity('user')
export class UserEntity extends BaseEntity {
  @Column({ type: 'text', nullable: true })
  name?: string;

  @Column({ type: 'text', unique: true })
  email: string;

  @Column({ type: 'text', select: false })
  password: string;

  @Column({ type: 'boolean', default: false })
  blocked: boolean;

  @Column({ type: 'text', nullable: true })
  image?: string;

  @OneToMany(() => ListingsEntity, (entity) => entity.user)
  listings?: ListingsEntity[];

  @Column()
  role_id: string;
  @ManyToOne(() => RolesEntity, (entity) => entity.user)
  @JoinColumn({ name: 'role_id' })
  roles?: RolesEntity;

  @Column()
  account_type_id: string;
  @ManyToOne(() => AccountTypesEntity, (entity) => entity.user)
  @JoinColumn({ name: 'account_type_id' })
  account_type?: AccountTypesEntity;
}

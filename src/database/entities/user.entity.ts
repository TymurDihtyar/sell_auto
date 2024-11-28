import { Column, Entity, OneToMany } from 'typeorm';

import { Role } from '../../common/guards/enums/role.enum';
import { EAccountTypes } from '../../modules/users/enums/account-type.enum';
import { ListingsEntity } from './listings.entity';
import { BaseEntity } from './models/base.entity';

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

  @Column({ type: 'enum', enum: Role, default: Role.User })
  role?: Role;

  @Column({ type: 'enum', enum: EAccountTypes, default: EAccountTypes.BASIC })
  account_type?: EAccountTypes;

  @OneToMany(() => ListingsEntity, (entity) => entity.user)
  listings?: ListingsEntity[];
}

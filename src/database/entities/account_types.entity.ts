import { Column, Entity, OneToMany } from 'typeorm';

import { EAccountTypes } from '../../modules/users/enums/account-type.enum';
import { BaseEntity } from './models/base.entity';
import { UserEntity } from './user.entity';

@Entity('account_type')
export class AccountTypesEntity extends BaseEntity {
  @Column({ type: 'enum', enum: EAccountTypes, default: EAccountTypes.BASIC })
  name: EAccountTypes;

  @OneToMany(() => UserEntity, (entity) => entity.account_type)
  user?: UserEntity[];
}

import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Role } from '../../common/guards/enums/role.enum';
import { UserEntity } from './user.entity';

@Entity('roles')
export class RolesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: Role, default: Role.User })
  name: Role;

  @OneToMany(() => UserEntity, (entity) => entity.roles)
  user?: UserEntity[];
}

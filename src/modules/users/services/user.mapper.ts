import { UserEntity } from '../../../database/entities/user.entity';
import { UserResponseDto } from '../dto/resonse/user.res.dto';

export class UserMapper {
  public static toResponseDto(userEntity: UserEntity): UserResponseDto {
    return {
      id: userEntity.id,
      name: userEntity.name,
      email: userEntity.email,
      account_type: userEntity.account_type,
      role: userEntity.role,
      image: userEntity.image,
    };
  }
}

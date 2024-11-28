import { UserEntity } from '../../../database/entities/user.entity';
import { UserResponseDto } from '../../users/dto/resonse/user.res.dto';
import { AuthResponseDto } from '../dto/response/auth.res.dto';
import { IToken } from '../interfaces/token.interface';

export class AuthMapper {
  public static toResponseDto(
    userEntity: UserEntity,
    token: IToken,
  ): AuthResponseDto {
    return {
      user: this.toUserResponseDto(userEntity),
      token,
    };
  }

  private static toUserResponseDto(userEntity: UserEntity): UserResponseDto {
    return {
      id: userEntity.id,
      name: userEntity.name,
      email: userEntity.email,
      role: userEntity.role,
      account_type: userEntity.account_type,
      blocked: userEntity.blocked,
      image: userEntity.image,
    };
  }
}

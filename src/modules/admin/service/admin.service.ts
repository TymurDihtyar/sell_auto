import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { Role } from '../../../common/guards/enums/role.enum';
import { UserEntity } from '../../../database/entities/user.entity';
import { IUserData } from '../../auth/interfaces/user-data.interface';
import { AuthService } from '../../auth/services/auth.service';
import { UserRepository } from '../../repository/services/user.repository';
import { BaseUserRequestDto } from '../../users/dto/request/base-user.req.dto';
import { UserResponseDto } from '../../users/dto/resonse/user.res.dto';
import { UserMapper } from '../../users/services/user.mapper';
import { UserService } from '../../users/services/user.service';
import { SignUpAdminRequestDto } from '../dto/request/sign-up-admin.req.dto';

@Injectable()
export class AdminService {
  constructor(
    private readonly userService: UserService,
    private readonly userRepository: UserRepository,
    private readonly authRepository: AuthService,
  ) {}

  public async isAdminAllreadyExist(email: string): Promise<UserEntity> {
    return await this.userRepository.findOneBy({ email });
  }

  public async createAdmin(dto: SignUpAdminRequestDto): Promise<UserEntity> {
    const password = await bcrypt.hash(dto.password, 10);
    return await this.userRepository.save(
      this.userRepository.create({ ...dto, password }),
    );
  }

  public async createUserByAdmin(
    dto: SignUpAdminRequestDto,
  ): Promise<BaseUserRequestDto> {
    await this.authRepository.isEmailUnique(dto.email);
    const password = await bcrypt.hash(dto.password, 10);

    return await this.userRepository.save(
      this.userRepository.create({ ...dto, password }),
    );
  }

  public async changeToSealer(userData: IUserData): Promise<UserResponseDto> {
    const userEntity = await this.userRepository.findOneBy({
      id: userData.userId,
    });
    if (userEntity.role === Role.User) {
      userEntity.role = Role.Seller;
    } else if (userEntity.role === Role.Seller) {
      userEntity.role = Role.User;
    }
    const user = await this.userRepository.save({ ...userEntity });
    return UserMapper.toResponseDto(user);
  }
}

import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { Role } from '../../../common/guards/enums/role.enum';
import { UserEntity } from '../../../database/entities/user.entity';
import { UserRepository } from '../../repository/services/user.repository';
import { BaseUserRequestDto } from '../../users/dto/request/base-user.req.dto';
import { UserResponseDto } from '../../users/dto/resonse/user.res.dto';
import { UserMapper } from '../../users/services/user.mapper';
import { UserService } from '../../users/services/user.service';
import { SignInRequestDto } from '../dto/request/sign-in.req.dto';
import { SignUpRequestDto } from '../dto/request/sign-up.req.dto';
import { SignUpAdminRequestDto } from '../dto/request/sign-up-admin.req.dto';
import { AuthResponseDto } from '../dto/response/auth.res.dto';
import { IUserData } from '../interfaces/user-data.interface';
import { AuthMapper } from './auth.mapper';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
    private readonly userRepository: UserRepository,
  ) {}

  public async signUp(dto: SignUpRequestDto): Promise<AuthResponseDto> {
    await this.isEmailUnique(dto.email);
    const password = await bcrypt.hash(dto.password, 10);
    const user = await this.userRepository.save(
      this.userRepository.create({ ...dto, password }),
    );
    const token = await this.tokenService.generateAuthTokens({
      userId: user.id,
    });
    return AuthMapper.toResponseDto(user, token);
  }

  public async signIn(dto: SignInRequestDto): Promise<AuthResponseDto> {
    const userEntity = await this.userRepository.findOne({
      where: { email: dto.email },
      select: { id: true, password: true },
    });
    if (!userEntity) {
      throw new UnauthorizedException();
    }
    const isPasswordsMatch = await bcrypt.compare(
      dto.password,
      userEntity.password,
    );
    if (!isPasswordsMatch) {
      throw new UnauthorizedException();
    }
    const user = await this.userRepository.findOneBy({ id: userEntity.id });
    const token = await this.tokenService.generateAuthTokens({
      userId: user.id,
    });
    return AuthMapper.toResponseDto(user, token);
  }

  public async isEmailUnique(email: string): Promise<void> {
    const user = await this.userRepository.findOneBy({ email });
    if (user) {
      throw new ConflictException();
    }
  }

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
    await this.isEmailUnique(dto.email);
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

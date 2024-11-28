import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UserRepository } from '../../repository/services/user.repository';
import { UserService } from '../../users/services/user.service';
import { SignInRequestDto } from '../dto/request/sign-in.req.dto';
import { SignUpRequestDto } from '../dto/request/sign-up.req.dto';
import { AuthResponseDto } from '../dto/response/auth.res.dto';
import { AuthMapper } from './auth.mapper';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
    private readonly userRepository: UserRepository,
    // private readonly refreshRepository: RefreshTokenRepository,
  ) {}
  // public async findAll(): Promise<string> {
  //   return `This action returns all user`;
  // }
  // public async isAdmin(email: string): Promise<UserEntity> {
  //   return await this.userRepository.findOneBy({ email });
  // }
  //
  // public async createAdmin(dto: SignUpRequestDto): Promise<UserEntity> {
  //   const password = await bcrypt.hash(dto.password, 10);
  //   const admin = await this.userRepository.save(
  //     this.userRepository.create({ ...dto, password }),
  //   );
  //   return admin;
  // }

  // public async changeToSealer(userData: IUserData): Promise<UserResponseDto> {
  //   const userEntity = await this.userRepository.findOneBy({
  //     id: userData.userId,
  //   });
  //
  //   if (userEntity.roles === Role.User) {
  //     userEntity.roles = Role.Seller;
  //   } else if (userEntity.roles === Role.Seller) {
  //     userEntity.roles = Role.User;
  //   }
  //
  //   const user = await this.userRepository.save({ ...userEntity });
  //   return UserMapper.toResponseDto(user);
  // }

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

  // public async logout(userData: IUserData): Promise<void> {
  //   await Promise.all([
  //     this.refreshRepository.delete({
  //       user_id: userData.userId,
  //     }),
  //     this.authCacheService.removeToken(userData.userId, userData.deviceId),
  //   ]);
  // }

  public async isEmailUnique(email: string): Promise<void> {
    const user = await this.userRepository.findOneBy({ email });
    if (user) {
      throw new ConflictException();
    }
  }
}

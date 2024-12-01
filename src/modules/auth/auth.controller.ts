import { Body, Controller, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/guards/enums/role.enum';
import { BaseUserRequestDto } from '../users/dto/request/base-user.req.dto';
import { UserResponseDto } from '../users/dto/resonse/user.res.dto';
import { CurrentUser } from './decorators/current-user.decorator';
import { SkipAuth } from './decorators/skip-auth.decorator';
import { SignInRequestDto } from './dto/request/sign-in.req.dto';
import { SignUpRequestDto } from './dto/request/sign-up.req.dto';
import { SignUpAdminRequestDto } from './dto/request/sign-up-admin.req.dto';
import { AuthResponseDto } from './dto/response/auth.res.dto';
import { IUserData } from './interfaces/user-data.interface';
import { AuthService } from './services/auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @SkipAuth()
  @ApiOperation({ summary: 'Registration' })
  @Post('sign-up')
  public async signUp(@Body() dto: SignUpRequestDto): Promise<AuthResponseDto> {
    return await this.authService.signUp(dto);
  }

  @SkipAuth()
  @ApiOperation({ summary: 'Login' })
  @Post('sign-in')
  public async signIn(@Body() dto: SignInRequestDto): Promise<AuthResponseDto> {
    return await this.authService.signIn(dto);
  }

  @Roles(Role.Seller, Role.User)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Change to Seller or User' })
  @Put('seller')
  public async changeToSealer(
    @CurrentUser() userData: IUserData,
  ): Promise<UserResponseDto> {
    return await this.authService.changeToSealer(userData);
  }

  @Roles(Role.Admin)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Creat other type of User by Admin' })
  @Post('create-user')
  public async createUser(
    @Body() dto: SignUpAdminRequestDto,
  ): Promise<BaseUserRequestDto> {
    return await this.authService.createUserByAdmin(dto);
  }
}

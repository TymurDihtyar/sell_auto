import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { SignInRequestDto } from './dto/request/sign-in.req.dto';
import { SignUpRequestDto } from './dto/request/sign-up.req.dto';
import { AuthResponseDto } from './dto/response/auth.res.dto';
import { AuthService } from './services/auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @SkipAuth()
  @ApiOperation({ summary: 'Registration' })
  @Post('sign-up')
  public async signUp(@Body() dto: SignUpRequestDto): Promise<AuthResponseDto> {
    return await this.authService.signUp(dto);
  }

  // @SkipAuth()
  @ApiOperation({ summary: 'Login' })
  @Post('sign-in')
  public async signIn(@Body() dto: SignInRequestDto): Promise<AuthResponseDto> {
    return await this.authService.signIn(dto);
  }
  // @Roles(Role.Seller, Role.User)
  // @ApiBearerAuth()
  // @ApiOperation({ summary: 'Change to Seller or user' })
  // @Put('seller')
  // public async changeToSealer(
  //   @CurrentUser() userData: IUserData,
  //   // @Body() dto: UpdateUserToSallerRequestDto,
  // ): Promise<UserResponseDto> {
  //   return await this.authService.changeToSealer(userData);
  // }
  //
  // @ApiBearerAuth()
  // @ApiOperation({ summary: 'Logout' })
  // @Post('logout')
  // public async logout(@CurrentUser() userData: IUserData): Promise<void> {
  //   await this.authService.logout(userData);
  // }
  //
  // @SkipAuth()
  // @ApiBearerAuth()
  // @UseGuards(JwtRefreshGuard)
  // @ApiOperation({ summary: 'Update token pair' })
  // @Post('refresh')
  // public async updateRefreshToken(
  //   @CurrentUser() userData: IUserData,
  // ): Promise<TokenResDto> {
  //   return await this.authService.refreshToken(userData);
  // }
  // @Roles(Role.Admin)
  // @ApiBearerAuth()
  // @ApiOperation({ summary: 'Creat manager or other type of user' })
  // @Post('create')
  // public async createUser(
  //   @Body() dto: SignUpAdminRequestDto,
  // ): Promise<BaseUserRequestDto> {
  //   return await this.authService.createUser(dto);
  // }
}

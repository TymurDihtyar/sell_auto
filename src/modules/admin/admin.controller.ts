import { Body, Controller, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/guards/enums/role.enum';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { IUserData } from '../auth/interfaces/user-data.interface';
import { BaseUserRequestDto } from '../users/dto/request/base-user.req.dto';
import { UserResponseDto } from '../users/dto/resonse/user.res.dto';
import { SignUpAdminRequestDto } from './dto/request/sign-up-admin.req.dto';
import { AdminService } from './service/admin.service';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Roles(Role.Seller, Role.Admin)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Change to Seller or User' })
  @Put('сhange-to-seller')
  public async changeToSealer(
    @CurrentUser() userData: IUserData,
  ): Promise<UserResponseDto> {
    return await this.adminService.changeToSealer(userData);
  }

  @Roles(Role.Admin)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Creat other type of User by Admin' })
  @Post('create-user')
  public async createUser(
    @Body() dto: SignUpAdminRequestDto,
  ): Promise<BaseUserRequestDto> {
    return await this.adminService.createUserByAdmin(dto);
  }
}

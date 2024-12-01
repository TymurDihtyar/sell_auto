import {
  Body,
  Controller,
  Get,
  NestInterceptor,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { IUserData } from '../auth/interfaces/user-data.interface';
import { FileUploadDto } from '../aws/dto/file-upload.dto';
import { FileSizeValidationPipe } from '../aws/validator/fileSizeValidationPipe';
import { UpdateUserRequestDto } from './dto/request/update-user.req.dto';
import { UserResponseDto } from './dto/resonse/user.res.dto';
import { UserService } from './services/user.service';

@ApiBearerAuth()
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get information about me' })
  @Get('me')
  public async findMe(
    @CurrentUser() userData: IUserData,
  ): Promise<UserResponseDto> {
    return await this.userService.findMe(userData);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Change information about me' })
  @Put('me')
  public async updateMe(
    @CurrentUser() userData: IUserData,
    @Body() dto: UpdateUserRequestDto,
  ): Promise<UserResponseDto> {
    return await this.userService.updateMe(userData, dto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Upload photo' })
  @Post('me/avatar')
  @UseInterceptors(FileInterceptor('avatar') as unknown as NestInterceptor)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'user avatar',
    type: FileUploadDto,
  })
  public async uploadAvatar(
    @CurrentUser() userData: IUserData,
    @UploadedFile(new FileSizeValidationPipe()) file: Express.Multer.File,
  ): Promise<UserResponseDto> {
    return await this.userService.uploadAvatar(file, userData);
  }
}

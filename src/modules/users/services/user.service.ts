import { Injectable } from '@nestjs/common';

import { IUserData } from '../../auth/interfaces/user-data.interface';
import { UserRepository } from '../../repository/services/user.repository';
import { UpdateUserRequestDto } from '../dto/request/update-user.req.dto';
import { UserResponseDto } from '../dto/resonse/user.res.dto';
import { UserMapper } from './user.mapper';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    // private readonly awsService: AwsService,
  ) {}

  public async findMe(userData: IUserData): Promise<UserResponseDto> {
    const entity = await this.userRepository.findOneBy({ id: userData.userId });
    return UserMapper.toResponseDto(entity);
  }

  public async updateMe(
    userData: IUserData,
    dto: UpdateUserRequestDto,
  ): Promise<UserResponseDto> {
    const entity = await this.userRepository.findOneBy({ id: userData.userId });
    const user = await this.userRepository.save({ ...entity, ...dto });
    return UserMapper.toResponseDto(user);
  }

  // public async remove(id: number): Promise<string> {
  //   return `This action removes a #${id} user`;
  // }

  // public async uploadAvatar(
  //   file: Express.Multer.File,
  //   userData: IUserData,
  // ): Promise<UserResponseDto> {
  //   const userEntity = await this.userRepository.findOneBy({
  //     id: userData.userId,
  //   });
  //
  //   if (userEntity.image) {
  //     await this.awsService.deleteFile(userEntity.image);
  //   }
  //
  //   const pathFile = await this.awsService.uploadFile(
  //     file,
  //     userData.userId,
  //     EFileType.USER,
  //   );
  //
  //   await this.userRepository.save({ ...userEntity, image: pathFile });
  //   return UserMapper.toResponseDto(userEntity);
  // }
}

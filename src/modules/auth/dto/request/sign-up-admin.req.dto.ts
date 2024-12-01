import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

import { Role } from '../../../../common/guards/enums/role.enum';
import { EAccountTypes } from '../../../users/enums/account-type.enum';

export class SignUpAdminRequestDto {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  password: string;

  @ApiProperty({ enum: Role })
  @IsString()
  role?: Role;

  @ApiProperty({ enum: EAccountTypes })
  @IsString()
  account_type?: EAccountTypes;
}

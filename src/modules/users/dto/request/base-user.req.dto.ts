import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsOptional, IsString, Length, Matches } from 'class-validator';
import { TransformHelper } from 'src/common/helpers/transform.helper';

import { Role } from '../../../../common/guards/enums/role.enum';
import { EAccountTypes } from '../../enums/account-type.enum';

export class BaseUserRequestDto {
  @IsOptional()
  @IsString()
  @Length(3, 50)
  @Transform(TransformHelper.trim)
  @Type(() => String)
  name?: string;

  @ApiProperty({ example: 'test@example.com' })
  @IsString()
  @Length(1, 300)
  @Matches(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/, {
    message: 'Invalid email format',
  })
  email: string;

  @ApiProperty({ example: '123qwe!@#QWE' })
  @IsString()
  @Length(1, 300)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%_*#?&])[A-Za-z\d@$_!%*#?&]{8,}$/, {
    message:
      'Password must be at least 8 characters long and include letters, numbers, and special characters',
  })
  password: string;

  @ApiProperty({ enum: Role })
  @IsString()
  role?: Role;

  @ApiProperty({ enum: EAccountTypes })
  @IsString()
  account_type?: EAccountTypes;

  @IsOptional()
  @IsString()
  @Length(0, 3000)
  image?: string;
}

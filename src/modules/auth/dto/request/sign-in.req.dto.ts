import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SignInRequestDto {
  @ApiProperty({ example: 'test@example.com' })
  @IsString()
  email: string;

  @ApiProperty({ example: '123qwe!@#QWE' })
  @IsString()
  password: string;
}

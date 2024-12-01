import { IsString } from 'class-validator';

export class SignUpRequestDto {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  password: string;
}

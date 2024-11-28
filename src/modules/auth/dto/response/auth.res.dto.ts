import { Exclude } from 'class-transformer';

import { UserResponseDto } from '../../../users/dto/resonse/user.res.dto';
import { IToken } from '../../interfaces/token.interface';

@Exclude()
export class AuthResponseDto {
  token: IToken;
  user: UserResponseDto;
}

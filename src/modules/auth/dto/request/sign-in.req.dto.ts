import { PickType } from '@nestjs/swagger';

import { BaseUserRequestDto } from '../../../users/dto/request/base-user.req.dto';

export class SignInRequestDto extends PickType(BaseUserRequestDto, [
  'email',
  'password',
]) {}
